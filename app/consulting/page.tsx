import type { Metadata } from "next";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import LeadMagnet from "@/components/LeadMagnet";
import CoffeeBanner from "@/components/CoffeeBanner";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import StickyBar from "@/components/StickyBar";
import { PRODUCTS } from "@/lib/products";
import { DeliverableGallery, Voices } from "@/components/Deliverables";
import Quote from "@/components/Quote";
import { EDGE } from "@/lib/proof";
import ProjectMarquee from "@/components/ProjectMarquee";
import ImageBand from "@/components/ImageBand";
import Hl from "@/components/Hl";

export const metadata: Metadata = {
  title: "1:1 AX 컨설팅",
  description: "자동화 가능한 범위 상담부터 최적화된 AI 워크플로우 구축·셋팅까지. 컨설팅 3회, 워크플로우 1개당 30만원. 무료 커피챗으로 시작하세요.",
};

const STEPS = [
  {
    no: "00",
    title: "무료 커피챗",
    time: "온라인 30분",
    desc: "지금 업무를 듣고 자동화 가능한 범위와 기대 효과를 같이 봅니다. 맞지 않으면 솔직하게 말씀드려요.",
  },
  {
    no: "01",
    title: "1회차 컨설팅",
    time: "오프라인 1시간",
    desc: "클로드 코드 셋팅과 작업 범위 산정. 필요한 계정·권한을 정리하고 완성 기준을 합의합니다.",
  },
  {
    no: "02",
    title: "2회차 컨설팅",
    time: "오프라인 2시간",
    desc: "미팅 사이에 컨설턴트가 개발한 스킬과 시스템을 고객 환경에 안착시킵니다. 실제 데이터로 같이 돌려봐요.",
  },
  {
    no: "03",
    title: "3회차 컨설팅",
    time: "온라인 1시간",
    desc: "써보면서 생긴 수정 사항과 오류를 해결하고 보완합니다. 혼자서도 운영할 수 있게 넘겨드려요.",
  },
];

const FAQS = [
  { q: "어떤 업무까지 자동화할 수 있나요?", a: "엑셀·구글시트 집계, 보고서 작성, 메일·슬랙 알림, 노션 정리, 콘텐츠 제작, 웹 리서치처럼 규칙이 있는 반복 업무라면 대부분 가능해요. 커피챗에서 가능 여부를 먼저 알려드립니다." },
  { q: "‘워크플로우 1개’의 기준이 뭔가요?", a: "하나의 입력에서 하나의 결과물까지 이어지는 흐름 1개예요. 예) ‘매주 엑셀 3개 → 주간 보고서 PDF → 팀 슬랙 공유’가 1개입니다." },
  { q: "제가 할 일은 뭔가요?", a: "컨설팅 3회에 참석해서 셋팅을 따라가는 것뿐이에요. 미팅 전후의 자동화 개발은 AX 컨설턴트가 대행합니다. 비밀번호 같은 민감 정보는 직접 입력하시도록 진행해요." },
  { q: "추가 비용이 드나요?", a: "클로드 Pro 구독, Zapier 같은 외부 도구 비용은 고객님 계정으로 결제돼요. 대부분 무료 플랜이나 월 2~3만원 안에서 해결되도록 설계합니다." },
  { q: "결제는 언제 하나요?", a: "커피챗에서 범위를 확정한 뒤 1회차 전에 결제해요. 워크플로우가 여러 개면 개수만큼 안내드립니다." },
];

export default function ConsultingPage() {
  const p = PRODUCTS.consulting;
  return (
    <>
      <ProductHero
        tone="workers"
        en="1:1 AX Consulting"
        title={
          <>
            자동화 가능한 범위 상담부터
            <br className="hidden md:block" />
            최적화된 AI 워크플로우 구축까지
          </>
        }
        desc={<><b className="font-bold text-brown-dark">컨설턴트가 자동화 작업과 개발을 대행</b>하고, 고객은 컨설팅에서 셋팅을 따라가기만 하면 됩니다. 복잡한 업무의 병목 하나를 <b className="font-bold text-brown-dark">3번의 만남</b>으로 없애요.</>}
        chips={["무료 커피챗으로 시작", "컨설팅 3회 (오프라인 2 · 온라인 1)", `워크플로우 1개당 ${p.priceLabel}`, "개발·셋팅 대행"]}
      >
        <Link href="/#coffee-chat" className="btn-primary">무료 커피챗 예약</Link>
        <Link href="#cases" className="btn-ghost">AX 프로젝트 사례 보기</Link>
      </ProductHero>

      {/* PROCESS */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="Process" title="커피챗에서 핸드오프까지" desc="고객님이 쓰는 시간은 미팅 4시간뿐이에요. 그 사이 개발과 셋팅은 컨설턴트가 합니다." />
        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.no} delay={i * 100}>
              <div className={`h-full rounded-2xl border p-7 ${i === 0 ? "border-dashed border-brown/30 bg-paper" : "border-brown/10 bg-white"}`}>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[22px] font-semibold italic text-brown">{s.no}</span>
                  <span className="chip">{s.time}</span>
                </div>
                <h3 className="mt-6 text-[19px] font-bold text-brown-dark">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-brown/85">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-butter-pale px-7 py-5">
            <p className="text-[15px] text-brown-dark">
              <b className="font-semibold">컨설팅 3회 · 워크플로우 1개 구축</b>
              <span className="ml-3 text-brown/75">수정·오류 보완 포함</span>
            </p>
            <p className="font-serif text-[30px] font-semibold text-brown">{p.priceLabel}</p>
          </div>
        </Reveal>
      </section>

      {/* 중간 자료 — 실제 작업 화면 */}
      <section className="wrap pb-24 md:pb-32">
        <ImageBand
          eyebrow="컨설팅에서 실제로 만드는 화면"
          images={[
            { src: "/images/projects/kpi-2.jpg", alt: "업무일지 KPI 리포트 자동 발행 화면", caption: "매주 자동 발행되는 KPI 리포트" },
            { src: "/images/projects/slack-2.jpg", alt: "슬랙 리마인드 자동화 화면", caption: "정해진 시간에 나가는 슬랙 리마인드" },
            { src: "/images/projects/research-2.jpg", alt: "리서치 자동화 스킬 실행 화면", caption: "10개 토픽을 한 번에 리서치하는 스킬" },
          ]}
          note="고객사 이름과 숫자는 블러 처리했고, 화면은 실제 구조를 바탕으로 재구성했어요."
        />
      </section>

      {/* PROJECTS */}
      <section id="cases" className="scroll-mt-20 overflow-hidden bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="AX Projects" title={<>카테고리별로 보는 <Hl>자동화 프로젝트</Hl></>} desc={<>기업 AX팀과 컨설팅, 자체 운영에서 직접 만든 자동화예요. <b className="font-bold text-brown-dark">큰 글씨는 어떻게 그 숫자를 만들었는지의 핵심</b>이에요. 비슷한 업무가 있다면 같은 방식으로 가져갈 수 있어요.</>} />
          <ProjectMarquee />
        </div>
      </section>

      {/* CASES (deep dive) */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="Case study" title={<><Hl>문제 → 해결 → 성과</Hl>, 네 건을 자세히</>} desc="위 프로젝트 중 네 건을 문제·해결·성과로 풀어 봤어요." />
        <CaseStudies />
      </section>

      {/* DELIVERABLES */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="What you get" title="컨설팅이 끝나면 손에 남는 것" desc="설계서, 설치된 스킬, 결과 확인 화면. 실제 산출물 형태 그대로 보여드려요. 고객사 이름과 숫자 같은 기밀은 블러 처리했습니다." />
        <DeliverableGallery />
      </section>

      {/* EDGE — 우리 AX 컨설팅의 차별점 3가지 */}
      <section className="bg-brown-dark py-24 text-butter-pale md:py-32">
        <div className="wrap">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-butter/80">Why Star of AI</p>
            <h2 className="mt-4 max-w-3xl break-keep font-kserif text-[30px] font-bold leading-[1.25] text-butter-pale md:text-[44px]">
              우리 AX 컨설팅의 <span className="text-butter">차별점 3가지</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-butter-pale/75">산출물 하나하나를 어떤 기준으로 만드는지, 세 가지로 정리했어요.</p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {EDGE.map((e, i) => (
              <Reveal key={e.n} delay={i * 110}>
                <div className="flex h-full flex-col rounded-2xl border border-butter/20 bg-white/[0.06] p-8 backdrop-blur-sm">
                  <p className="font-serif text-[40px] font-semibold leading-none text-butter">{e.n}</p>
                  <h3 className="mt-6 break-keep text-[19px] font-bold leading-snug text-white md:text-[21px]">{e.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-butter-pale/80">
                    <Quote text={e.desc} className="!text-butter" />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VOICES */}
      <section className="relative overflow-hidden bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Voices" title="함께 자동화를 만든 분들의 이야기" desc="같은 방식으로 진행한 클로드 코드 스터디 1기 수강생들이 직접 남긴 후기예요. 컨설팅 고객사 코멘트는 공개 확인이 끝나는 대로 추가됩니다." />
          <Voices limit={4} />
        </div>
      </section>

      {/* LEAD MAGNET + COFFEE */}
      <section id="free-pdf" className="wrap scroll-mt-24 space-y-6 py-24 md:py-32">
        <Reveal>
          <LeadMagnet
            product="consulting"
            file="/downloads/starofai-automation-setup-guide.pdf"
            fileName="StarofAI_자동화셋팅가이드_커리큘럼.pdf"
            title="자동화 셋팅 가이드 & 커리큘럼"
            desc="내 업무 중 무엇을 자동화할지 고르는 체크리스트, 3단계 셋팅 과정, 첫 컨설팅 전에 준비할 것까지 한 번에 정리했어요."
            cover={<GuideCover />}
          />
        </Reveal>
        <CoffeeBanner />
      </section>

      <section className="wrap pb-24 md:pb-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={FAQS} />
      </section>

      <StickyBar title="1:1 AX 컨설팅 · 컨설팅 3회" price={`${p.priceLabel} / 워크플로우 1개`} href="/#coffee-chat" cta="무료 커피챗" />
    </>
  );
}

function GuideCover() {
  return (
    <div className="mx-auto flex aspect-[1/1.3] w-[240px] flex-col justify-between rounded-xl border border-brown/10 bg-cream p-7 md:w-[280px]">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">Star of AI · Guide</p>
        <p className="mt-4 font-kserif text-[24px] font-bold leading-tight text-brown-dark">자동화 셋팅<br />가이드 &<br />커리큘럼</p>
      </div>
      <p className="font-serif text-[15px] italic text-brown">Coffee chat → Setup → Build → Hand-off</p>
    </div>
  );
}
