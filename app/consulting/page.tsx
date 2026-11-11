import type { Metadata } from "next";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import LeadMagnet from "@/components/LeadMagnet";
import CoffeeBanner from "@/components/CoffeeBanner";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import FloatingCTA from "@/components/FloatingCTA";
import ApplyButton from "@/components/ApplyButton";
import ApplyModalHost from "@/components/ApplyModalHost";
import { PRODUCTS } from "@/lib/products";
import { MARKETING_CASES } from "@/lib/proof";
import { DeliverableGallery, Voices } from "@/components/Deliverables";
import ProjectMarquee from "@/components/ProjectMarquee";
import EdgeDiagram from "@/components/EdgeDiagram";
import ImageBand from "@/components/ImageBand";
import Hl from "@/components/Hl";

export const metadata: Metadata = {
  title: "1:1 마케팅 자동화 컨설팅",
  description: "마케팅 담당자 혹은 1인 사업가를 위한 최적의 마케팅 자동화 프로세스 구축. 터지는 릴스 공식, 기획 > 디자인 > 업로드 자동화, 인사이트 보고서 자동 리포팅까지. 컨설팅 3회, 워크플로우 1개당 30만원. 무료 커피챗으로 시작하세요.",
};

const STEPS = [
  {
    no: "00",
    title: "무료 커피챗",
    time: "온라인 30분",
    desc: "지금 콘텐츠를 어떻게 만들고 올리는지 듣고, 자동화 가능한 범위와 기대 효과를 같이 봅니다. 맞지 않으면 솔직하게 말씀드려요.",
  },
  {
    no: "01",
    title: "1회차 컨설팅",
    time: "오프라인 1시간",
    desc: "터지는 콘텐츠 공식을 함께 학습하고, 나만의 색깔을 프로필 브랜딩에 입힙니다. 클로드 코드 셋팅과 계정·권한 정리, 완성 기준 합의까지.",
  },
  {
    no: "02",
    title: "2회차 컨설팅",
    time: "오프라인 2시간",
    desc: "컨설턴트가 개발한 릴스·카드뉴스 자동화와 인플루언서 협찬·CRM 관리 자동화를 고객 환경에 안착시킵니다. 실제 계정으로 같이 돌려봐요.",
  },
  {
    no: "03",
    title: "3회차 컨설팅",
    time: "온라인 1시간",
    desc: "콘텐츠 전환율·ROI가 자동으로 트래킹되도록 연결하고, 써보면서 생긴 수정 사항과 오류를 보완합니다. 혼자서도 운영할 수 있게 넘겨드려요.",
  },
];

const FAQS = [
  { q: "어떤 마케팅 업무까지 자동화할 수 있나요?", a: "릴스·카드뉴스 기획과 스크립트, 디자인, 업로드, 인플루언서 협찬 관리, CRM 정리, 콘텐츠 성과·인사이트 보고서처럼 규칙이 있는 마케팅 업무라면 대부분 가능해요. 커피챗에서 가능 여부를 먼저 알려드립니다." },
  { q: "‘워크플로우 1개’의 기준이 뭔가요?", a: "하나의 입력에서 하나의 결과물까지 이어지는 흐름 1개예요. 예) ‘주제·레퍼런스 입력 → 카드뉴스 디자인·캡션 → 인스타그램 업로드’가 1개입니다." },
  { q: "제가 할 일은 뭔가요?", a: "컨설팅 3회에 참석해서 셋팅을 따라가는 것뿐이에요. 미팅 전후의 자동화 개발은 AX 컨설턴트가 대행합니다. 비밀번호 같은 민감 정보는 직접 입력하시도록 진행해요." },
  { q: "추가 비용이 드나요?", a: "클로드 Pro 구독, 이미지·영상 생성 툴, Zapier 같은 외부 도구 비용은 고객님 계정으로 결제돼요. 대부분 무료 플랜이나 월 2~3만원 안에서 해결되도록 설계합니다." },
  { q: "결제는 언제 하나요?", a: "커피챗에서 범위를 확정하고 계약한 뒤 1회차 전에 정산해요. 컨설팅 상품은 홈페이지 결제창(PG)을 통한 결제가 발생하지 않으며, 계약서에 따라 별도로 정산합니다. 워크플로우가 여러 개면 개수만큼 안내드립니다." },
];

export default function ConsultingPage() {
  const p = PRODUCTS.consulting;
  return (
    <>
      <ProductHero
        tone="workers"
        en="1:1 Marketing Automation"
        title={
          <>
            마케팅 담당자 혹은{" "}
            <br className="hidden md:block" />
            1인 사업가를 위한 최적의{" "}
            <br className="hidden md:block" />
            마케팅 자동화 프로세스 구축
          </>
        }
        desc={<><b className="font-bold text-brown-dark">터지는 릴스 공식</b>부터 <b className="font-bold text-brown-dark">기획 &gt; 디자인 &gt; 업로드 100% 자동화</b>, 콘텐츠 제작부터 인사이트 보고서까지 자동 리포팅을 알려드려요. 개발은 컨설턴트가 대행하고, 고객은 <b className="font-bold text-brown-dark">3번의 만남</b>에서 셋팅을 따라가기만 하면 됩니다.</>}
        chips={["무료 커피챗으로 시작", "컨설팅 3회 (오프라인 2 · 온라인 1)", `워크플로우 1개당 ${p.priceLabel}`, "개발·셋팅 대행", "사이트 결제(PG) 없음 · 계약 후 별도 정산"]}
      >
        <ApplyButton kind="consulting" className="btn-primary">1:1 컨설팅 신청하기</ApplyButton>
        <Link href="/#coffee-chat" className="btn-ghost">무료 커피챗 예약</Link>
        <Link href="#cases" className="btn-ghost">마케팅 자동화 사례 보기</Link>
      </ProductHero>

      {/* PROCESS */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="Process" title="커피챗에서 핸드오프까지" desc={<><b className="font-bold text-brown-dark">터지는 콘텐츠 공식 학습 → 프로필 브랜딩 → 릴스·카드뉴스 자동화 → 인플루언서 협찬·CRM 자동화 → 전환율·ROI 트래킹.</b> 고객님이 쓰는 시간은 미팅 4시간뿐이고, 그 사이 개발과 셋팅은 컨설턴트가 합니다.</>} />
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
              <span className="ml-3 text-brown/75">수정·오류 보완 포함 · 홈페이지 결제창(PG)으로 결제하지 않아요</span>
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
            { src: "/images/projects/content-2.jpg", alt: "카드뉴스 제작 자동화 화면", caption: "레퍼런스만 주면 나오는 카드뉴스 디자인" },
            { src: "/images/cases/insta-2.jpg", alt: "인스타그램 콘텐츠 분석 대시보드 화면", caption: "CTA·클릭률·조회수 자동 분석 대시보드" },
            { src: "/images/cases/crm-2.jpg", alt: "마케팅 CRM 분석 리포트 화면", caption: "캠페인 전환을 정리하는 CRM 리포트" },
          ]}
          note="고객사 이름과 숫자는 블러 처리했고, 화면은 실제 구조를 바탕으로 재구성했어요."
        />
      </section>

      {/* PROJECTS */}
      <section id="cases" className="scroll-mt-20 overflow-hidden bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Marketing Automation" title={<>카테고리별로 보는 <Hl>마케팅 자동화 프로젝트</Hl></>} desc={<>컨설팅과 자체 채널 운영에서 직접 만든 콘텐츠·마케팅 자동화예요. <b className="font-bold text-brown-dark">큰 글씨는 어떻게 그 숫자를 만들었는지의 핵심</b>이에요. 비슷한 업무가 있다면 같은 방식으로 가져갈 수 있어요.</>} />
          <ProjectMarquee ids={["content", "insta", "crm", "creator", "sales", "cost", "research"]} />
        </div>
      </section>

      {/* CASES (deep dive) */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="Case study" title={<><Hl>문제 → 해결 → 성과</Hl>, 여섯 건을 자세히</>} desc="프로젝트 중 여섯 건을 문제·해결·성과로 풀어 봤어요. 화면은 실제 구조를 바탕으로 재구성했고, 고객사명과 숫자 일부는 가렸어요." />
        <CaseStudies items={MARKETING_CASES} />
      </section>

      {/* DELIVERABLES */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="What you get" title="컨설팅이 끝나면 손에 남는 것" desc="설계서, 설치된 스킬, 결과 확인 화면. 실제 산출물 형태 그대로 보여드려요. 고객사 이름과 숫자 같은 기밀은 블러 처리했습니다." />
        <DeliverableGallery />
      </section>

      {/* EDGE — 우리 마케팅 자동화 컨설팅의 차별점 3가지 */}
      <section className="bg-brown-dark py-24 text-butter-pale md:py-32">
        <div className="wrap">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-butter/80">Why Star of AI</p>
            <h2 className="mt-4 max-w-3xl break-keep font-kserif text-[30px] font-bold leading-[1.25] text-butter-pale md:text-[44px]">
              우리 마케팅 자동화 컨설팅의 <span className="text-butter">차별점 3가지</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-butter-pale/75">산출물 하나하나를 어떤 기준으로 만드는지, 세 가지로 정리했어요. 세 가지가 겹치는 자리가 저희가 만드는 결과물이에요. 원이나 항목을 눌러보세요.</p>
          </Reveal>
          <div className="mt-14">
            <EdgeDiagram />
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

      <FloatingCTA kind="consulting" primary="1:1 컨설팅 신청하기" secondary={{ label: "무료 커피챗", href: "/#coffee-chat" }} note={`${p.priceLabel} / 워크플로우 1개 · PG 결제 없음`} />
      <ApplyModalHost kind="consulting" />
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
