import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail } from "@/lib/notify";
import { PRODUCTS, type ProductId } from "@/lib/products";
import { PLAN_CRITERIA, describeHow, pickPlan } from "@/lib/recommend";

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
  const { plan, reason } = pickPlan(task);
  const { hasIO, headline, how } = describeHow(task, plan);
  return {
    feasible: hasIO || plan === "study" ? "yes" : "partial",
    headline,
    how,
    plan,
    reason,
    by: "rules",
  };
}

async function askClaude(task: string): Promise<Diagnosis | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  const client = new Anthropic();
  const { plan: hint } = pickPlan(task);
  const system = `너는 AX 에이전시 'Star of AI'의 자동화 진단 담당이야. 방문자가 적은 업무를 보고 한국어로, 과장 없이, 따뜻하지만 간결하게 답해.
반드시 아래 JSON 하나만 출력해 (설명·코드블록 금지):
{"feasible":"yes"|"partial"|"consult","headline":"가능 여부를 말하는 한 문장 (40자 이내)","how":["1단계","2단계","3단계"],"plan":"study"|"consulting"|"enterprise","reason":"이 플랜을 추천하는 이유 한 문장"}
플랜 기준 (이 순서로 판단: 조직 단위 신호가 있으면 enterprise → '직접 배우고 싶다/설치부터' 신호면 study → 그 외 구체적인 업무 자동화는 consulting):
- enterprise: ${PLAN_TEXT.enterprise}. ${PLAN_CRITERIA.enterprise}
- study: ${PLAN_TEXT.study}. ${PLAN_CRITERIA.study}
- consulting: ${PLAN_TEXT.consulting}. ${PLAN_CRITERIA.consulting}
키워드 참고 추천: ${hint} (규칙 기반). 문맥상 명백히 다르면 바꿔도 되지만, 이유를 reason 에 그 사람 말에 맞춰 적어.
reason 은 방문자가 적은 업무를 그대로 받아 "~라서 ~이 맞아요" 꼴로, 추천 플랜이 그 니즈를 어떻게 해결하는지 한 문장. headline 은 가능 여부를 먼저 말하고 그 업무를 한 단어로 되짚어.
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
