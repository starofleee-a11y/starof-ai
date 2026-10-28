import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail } from "@/lib/notify";
import { PRODUCTS, type ProductId } from "@/lib/products";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * 자동화 진단. 방문자가 적은 업무를 보고
 *  - 가능 여부(가능 / 일부 가능 / 상담 필요), 어떻게 자동화할지 3단계, 맞는 플랜 1개를 답하고
 *  - 슬랙·메일로 리드를 남겨요.
 * ANTHROPIC_API_KEY 가 있으면 클로드가 답하고, 없으면 키워드 규칙으로 답합니다.
 */
export interface Diagnosis {
  feasible: "yes" | "partial" | "consult";
  headline: string;
  how: string[];
  plan: ProductId;
  reason: string;
  by: "claude" | "rules";
}

const PLAN_TEXT: Record<ProductId, string> = {
  study: "자동화 기초 강의 — 클로드 코드 설치부터 내 업무 자동화 발표까지 3주 4회, 15만원 (Starters)",
  consulting: "1:1 AX 컨설팅 — 컨설턴트가 워크플로우 1개를 대신 구축·셋팅, 컨설팅 3회, 30만원 (Workers)",
  enterprise: "기업 AX — 임직원 교육, 부서 단위 자동화 구축, 맞춤 SaaS 개발, 비용 협의 (Company)",
};

function rules(task: string): Diagnosis {
  const t = task.toLowerCase();
  const company = /(전사|조직|회사 전체|팀 전체|임직원|부서|직원들|우리 팀|전 직원|교육)/.test(t);
  const learn = /(배우|설치|처음|입문|어떻게 쓰|강의|스터디|시작)/.test(t);
  const plan: ProductId = company ? "enterprise" : learn ? "study" : "consulting";
  const hasIO = /(엑셀|시트|보고서|메일|슬랙|노션|정리|취합|리포트|견적|공고|문서|데이터|크롤|수집|게시|업로드|알림)/.test(t);
  return {
    feasible: hasIO ? "yes" : "partial",
    headline: hasIO ? "네, 입력과 결과물이 분명한 반복 업무라 자동화할 수 있어요." : "규칙을 조금 더 정하면 자동화할 수 있어요. 커피챗에서 범위를 같이 잡아드릴게요.",
    how: [
      "어디서 입력이 오고 어떤 결과물이 나가는지 한 줄로 정리해요.",
      "클로드 코드 스킬로 수집 → 정리 → 초안 작성을 묶고, 커넥터로 메일·슬랙·시트를 연결해요.",
      "루틴으로 정해진 시간에 돌리고, 사람은 예외만 확인하도록 넘겨드려요.",
    ],
    plan,
    reason: company ? "여러 사람이 같이 쓰는 흐름이라 조직 단위로 설계하는 게 빨라요." : learn ? "직접 만들어 보고 싶으신 것 같아 기초 강의부터 권해요." : "한 개 워크플로우를 빠르게 안착시키기엔 1:1 컨설팅이 가장 효율적이에요.",
    by: "rules",
  };
}

async function askClaude(task: string): Promise<Diagnosis | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const client = new Anthropic();
  const system = `너는 AX 에이전시 'Star of AI'의 자동화 진단 담당이야. 방문자가 적은 업무를 보고 한국어로, 과장 없이, 따뜻하지만 간결하게 답해.
반드시 아래 JSON 하나만 출력해 (설명·코드블록 금지):
{"feasible":"yes"|"partial"|"consult","headline":"가능 여부를 말하는 한 문장 (40자 이내)","how":["1단계","2단계","3단계"],"plan":"study"|"consulting"|"enterprise","reason":"이 플랜을 추천하는 이유 한 문장"}
플랜 기준:
- study: ${PLAN_TEXT.study}. 혼자 배워서 직접 만들고 싶거나, 설치·기초부터 막힌 개인.
- consulting: ${PLAN_TEXT.consulting}. 개인·소규모 팀이 특정 반복 업무 1개를 빨리 자동화하고 싶을 때.
- enterprise: ${PLAN_TEXT.enterprise}. 여러 부서·전 직원·조직 단위 도입, 교육, 시스템 개발.
how 는 클로드 코드(스킬·커넥터·루틴)로 실제로 어떻게 할지 구체적으로, 각 25자 안팎. 불법·위험한 요청이면 feasible을 consult로 하고 정중히 범위를 안내해.`;
  const res = await client.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 1200,
    system,
    messages: [{ role: "user", content: `자동화하고 싶은 업무:\n${task}` }],
  });
  if (res.stop_reason === "refusal") return null;
  const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  const j = JSON.parse(m[0]);
  const plan: ProductId = ["study", "consulting", "enterprise"].includes(j.plan) ? j.plan : "consulting";
  return {
    feasible: ["yes", "partial", "consult"].includes(j.feasible) ? j.feasible : "partial",
    headline: String(j.headline ?? "").slice(0, 120),
    how: Array.isArray(j.how) ? j.how.slice(0, 3).map((s: unknown) => String(s).slice(0, 120)) : [],
    plan,
    reason: String(j.reason ?? "").slice(0, 160),
    by: "claude",
  };
}

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const f = { task: clean(b.task, 1500), name: clean(b.name, 50), email: clean(b.email, 120) };
  if (f.task.length < 5 || !f.name || !isEmail(f.email)) {
    return NextResponse.json({ error: "자동화하고 싶은 업무, 성함, 메일을 확인해 주세요." }, { status: 400 });
  }
  let d: Diagnosis | null = null;
  try {
    d = await askClaude(f.task);
  } catch (e) {
    console.error("[diagnose] claude failed, fallback to rules", e);
  }
  if (!d || !d.how.length) d = rules(f.task);
  const product = PRODUCTS[d.plan];

  const notice = {
    emoji: "🔎",
    title: "자동화 진단 요청",
    fields: [
      ["이름", f.name],
      ["메일", f.email],
      ["업무", f.task],
      ["진단", `${d.feasible} · ${d.headline}`],
      ["추천 플랜", `${product.name} (${d.by})`],
    ] as [string, string][],
  };
  await Promise.allSettled([
    notifySlack(notice),
    sendMail({ to: OWNER_EMAIL(), subject: `[진단] ${f.name} · ${product.name} 추천`, html: noticeToHtml(notice), replyTo: f.email }),
  ]);

  return NextResponse.json({ ...d, product: { name: product.name, href: product.href, cta: product.cta, priceLabel: product.priceLabel, audience: product.audience } });
}
