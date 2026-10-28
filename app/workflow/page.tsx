import type { Metadata } from "next";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import LeadMagnet from "@/components/LeadMagnet";
import FAQ from "@/components/FAQ";
import StickyBar from "@/components/StickyBar";
import WorkflowPricing from "@/components/WorkflowPricing";
import Sparkle from "@/components/Sparkle";
import { AUTOMATIONS } from "@/lib/proof";

export const metadata: Metadata = {
  title: "개인 자동화 워크플로우 셋팅 대행",
  description: "미팅 3회 총 3시간, 자동화 시스템 개발·셋팅을 직접 대행합니다. 워크플로우 1개당 30만원. 셋팅 가이드 PDF 무료.",
};

const STEPS = [
  {
    no: "01",
    en: "Kick-off",
    title: "니즈 킥오프",
    time: "1시간",
    desc: "지금 업무를 화면으로 보여주세요. 어디서 시간이 새는지, 무엇을 자동화하면 가장 효과가 큰지 같이 고르고 완성 기준을 정합니다.",
    items: ["현재 업무 흐름 인터뷰", "자동화 범위·완성 기준 합의", "필요한 계정·권한 체크"],
  },
  {
    no: "02",
    en: "Build & Review",
    title: "중간 결과 셋팅",
    time: "1시간",
    desc: "킥오프 후 제가 자동화를 개발해 고객님 환경에 1차 셋팅합니다. 실제 데이터로 돌려보며 수정할 부분을 짚어요.",
    items: ["자동화 시스템 개발 (대행)", "고객 환경에 1차 셋팅", "실데이터 테스트 & 수정 요청"],
  },
  {
    no: "03",
    en: "Hand-off",
    title: "최종 피드백 & 핸드오프",
    time: "1시간",
    desc: "피드백을 반영해 최종 셋팅하고, 혼자서도 돌리고 고칠 수 있도록 사용 가이드와 함께 넘겨드립니다.",
    items: ["최종 셋팅 & 검수", "사용·수정 가이드 문서", "핸드오프 후 2주 무상 수정"],
  },
];

const FAQS = [
  { q: "어떤 업무까지 자동화할 수 있나요?", a: "엑셀·구글시트 집계, 보고서 작성, 메일·슬랙 알림, 노션 정리, 콘텐츠 제작, 웹 리서치처럼 규칙이 있는 반복 업무라면 대부분 가능해요. 킥오프 전 커피챗에서 가능 여부를 먼저 알려드립니다." },
  { q: "‘워크플로우 1개’의 기준이 뭔가요?", a: "하나의 입력에서 하나의 결과물까지 이어지는 흐름 1개예요. 예) ‘매주 엑셀 3개 → 주간 보고서 PDF → 팀 슬랙 공유’가 1개입니다." },
  { q: "제 컴퓨터나 계정이 필요한가요?", a: "네, 자동화는 고객님 환경에서 돌아가야 해요. 셋팅 미팅에서 화면공유로 같이 설치하고, 비밀번호는 직접 입력하시도록 진행합니다." },
  { q: "추가 비용이 드나요?", a: "클로드 Pro 구독, Zapier 같은 외부 도구 비용은 고객님 계정으로 결제돼요. 대부분 무료 플랜이나 월 2~3만원 안에서 해결되도록 설계합니다." },
  { q: "회사 업무도 맡길 수 있나요?", a: "개인 단위는 이 상품으로, 팀·부서 단위라면 기업 AX 문의로 보안·권한까지 고려해 설계해 드려요." },
];

export default function WorkflowPage() {
  return (
    <>
      <ProductHero
        index="02"
        en="Workflow Setup"
        title={
          <>
            배우는 대신 맡기세요.
            <br />
            자동화는 제가 만들어 드릴게요
          </>
        }
        desc="미팅 3번이면 끝나요. 킥오프에서 원하는 걸 듣고, 제가 직접 개발·셋팅한 뒤, 혼자서도 쓸 수 있게 넘겨드립니다."
        chips={["미팅 3회 · 총 3시간", "개발·셋팅 직접 대행", "워크플로우 1개당 300,000원", "2주 무상 수정"]}
      >
        <Link href="#pricing" className="btn-primary">결제하고 킥오프 잡기</Link>
        <Link href="#free-pdf" className="btn-ghost">셋팅 가이드 PDF 받기</Link>
      </ProductHero>

      {/* PROCESS */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="Process" title="킥오프에서 핸드오프까지, 3단계" desc="고객님이 쓰는 시간은 미팅 3시간뿐이에요. 그 사이 개발과 셋팅은 제가 합니다." />
        <div className="relative grid gap-5 md:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-brown/25 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 140}>
              <div className="group relative h-full rounded-[28px] border border-brown/10 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-35px_rgba(97,66,21,.55)] md:p-8">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-butter font-serif text-[22px] font-semibold italic text-brown transition-transform duration-500 group-hover:scale-110">
                    {s.no}
                  </span>
                  <span className="chip">미팅 {s.time}</span>
                </div>
                <p className="mt-7 font-serif text-[16px] italic text-olive">{s.en}</p>
                <h3 className="mt-1 text-[21px] font-bold text-brown-dark">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-brown/75">{s.desc}</p>
                <ul className="mt-6 space-y-2 border-t border-brown/10 pt-5 text-[14px] text-brown/80">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2"><span className="text-[#D9A800]">✦</span>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXAMPLES */}
      <section className="bg-brown-dark py-24 text-butter-pale md:py-32">
        <div className="wrap">
          <Reveal className="mb-12 md:mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-butter/80">Examples</p>
            <h2 className="mt-4 font-kserif text-[30px] font-bold leading-tight text-butter md:text-[44px]">이런 워크플로우를 만들었어요</h2>
            <p className="mt-5 max-w-2xl text-[16px] text-butter-pale/70">실제 기업·개인 프로젝트에서 만든 자동화예요. 비슷한 업무가 있다면 그대로 가져가실 수 있어요.</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUTOMATIONS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 90}>
                <div className="group h-full rounded-[24px] border border-butter/15 bg-white/[.04] p-7 transition-all duration-500 hover:border-butter/50 hover:bg-white/[.08]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold uppercase tracking-wider text-butter/60">{a.tag}</span>
                    <Sparkle className="h-4 w-4 text-butter/60 transition-transform duration-700 group-hover:rotate-180 group-hover:text-butter" />
                  </div>
                  <p className="mt-5 text-[18px] font-bold text-butter">{a.title}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-butter-pale/65">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section id="free-pdf" className="wrap scroll-mt-24 py-24 md:py-32">
        <Reveal>
          <LeadMagnet
            product="workflow"
            file="/downloads/starofai-automation-setup-guide.pdf"
            fileName="StarofAI_자동화셋팅가이드_커리큘럼.pdf"
            title="자동화 셋팅 가이드 & 커리큘럼"
            desc="내 업무 중 무엇을 자동화할지 고르는 체크리스트, 3단계 셋팅 과정, 킥오프 전에 준비할 것까지 한 번에 정리했어요."
            cover={<GuideCover />}
          />
        </Reveal>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <SectionHead eyebrow="Pricing" title={<>워크플로우 1개,<br />30만원</>} desc="여러 개를 맡기시면 개수만큼 결제하시면 돼요. 범위가 크면 커피챗에서 먼저 견적을 잡아드려요." />
            <Reveal>
              <ul className="space-y-3 text-[15px] text-brown/80">
                {["미팅 3회 · 총 3시간 (킥오프 · 중간 · 최종)", "자동화 시스템 개발 · 셋팅 대행", "사용 · 수정 가이드 문서", "핸드오프 후 2주 무상 수정"].map((t) => (
                  <li key={t} className="flex gap-2.5"><span className="text-[#D9A800]">✦</span>{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <WorkflowPricing />
          </Reveal>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={FAQS} />
      </section>

      <StickyBar title="자동화 워크플로우 셋팅 대행 · 미팅 3회" price="300,000원 / 1개" href="#pricing" cta="신청하기" />
    </>
  );
}

function GuideCover() {
  return (
    <div className="relative mx-auto aspect-[1/1.3] w-[260px] md:w-[300px]">
      <div className="absolute inset-0 translate-x-5 translate-y-5 rotate-6 rounded-2xl bg-brown/25" />
      <div className="relative flex h-full flex-col justify-between rounded-2xl border-4 border-white bg-cream p-7 shadow-2xl transition-transform duration-700 hover:-rotate-2">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">Star of AI · Guide</p>
          <p className="mt-4 font-kserif text-[24px] font-bold leading-tight text-brown-dark">자동화 셋팅<br />가이드 &<br />커리큘럼</p>
        </div>
        <Sparkle className="h-10 w-10 text-[#E8C300]" />
        <p className="font-serif text-[15px] italic text-brown">Kick-off → Build → Hand-off</p>
      </div>
    </div>
  );
}
