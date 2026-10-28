import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import CaseStudies from "@/components/CaseStudies";
import ProjectGrid from "@/components/ProjectGrid";
import ImageBand from "@/components/ImageBand";
import Hl from "@/components/Hl";
import FAQ from "@/components/FAQ";
import StickyBar from "@/components/StickyBar";
import CountUp from "@/components/CountUp";
import { STATS, LECTURES } from "@/lib/proof";

export const metadata: Metadata = {
  title: "기업 AX 강의 · 컨설팅",
  description: "기업 AI 원데이 강의, 기업 AX 컨설팅, 기업 맞춤 SaaS 개발. 성균관대 GSB·기업 출강, 사내 AX 현업 사례로 조직 전사의 일하는 방식을 바꿉니다. 비용 협의.",
};

const PROGRAMS = [
  {
    name: "기업 AI 원데이 강의",
    en: "One-day Lecture",
    target: "전 직원 · 실무자 10~70명",
    desc: "클로드 코드 설치부터 부서 업무 자동화 1개 완성까지, 하루에 끝내는 실습형 교육. 사전 설문으로 예제를 우리 회사 업무로 바꿉니다.",
    items: ["사전 진단 설문 · 직무별 실습 예제", "조교 동행 설치 지원", "교안 PDF · 사후 만족도 리포트"],
  },
  {
    name: "기업 AX 컨설팅",
    en: "AX Consulting",
    target: "팀 · 부서 단위",
    desc: "업무 진단 → 자동화 우선순위 → 구축 → 운영 이관. 교육이 끝난 뒤에도 내부에서 계속 굴러가도록 설계합니다.",
    items: ["부서별 업무 흐름 진단", "자동화 스킬·에이전트 구축", "운영 가이드 · 담당자 핸드오프"],
  },
  {
    name: "기업 맞춤 SaaS 개발",
    en: "Custom SaaS",
    target: "전사 시스템",
    desc: "입찰 시뮬레이터, 사내 대시보드처럼 우리 회사만의 도구가 필요할 때. 기획부터 개발·배포까지 한 팀이 맡습니다.",
    items: ["요구사항 정의 · 기획", "클로드 코드 기반 개발·배포", "유지보수 · 기능 확장"],
  },
];

const FAQS = [
  { q: "비용은 어떻게 정해지나요?", a: "인원·시간·실습 여부·컨설팅 범위·개발 규모에 따라 견적을 드려요. 문의 주시면 1영업일 안에 제안서를 보내드립니다." },
  { q: "보안이 걱정돼요.", a: "사내 데이터는 고객사 계정과 환경 안에서만 다루고, 필요하면 비식별 샘플 데이터로 실습을 설계합니다. NDA 체결도 가능해요." },
  { q: "강의 자료와 녹화본을 받을 수 있나요?", a: "교안 PDF는 기본으로 제공하고, 녹화는 협의 후 내부 공유용으로 허용해 드려요." },
  { q: "지방 출강도 가능한가요?", a: "네. 강릉·구미 등 지역 기업 출강 경험이 있어요. 교통·숙박비는 별도로 협의합니다." },
];

export default function EnterprisePage() {
  return (
    <>
      <ProductHero
        tone="company"
        en="Enterprise AX"
        title={
          <>
            조직 전사의 일하는 방식을
            <br className="hidden md:block" />
            AX로 바꿉니다
          </>
        }
        desc="임직원 AI 교육부터 부서 단위 자동화 구축, 기업 맞춤 도구 개발까지. 260명 넘게 들은 커리큘럼과 사내 반복 업무를 6시간에서 1시간으로 줄인 현업 AX 경험으로 설계합니다."
        chips={["기업 AI 원데이 강의", "기업 AX 컨설팅", "기업 맞춤 SaaS 개발", "비용 협의"]}
      >
        <Link href="#inquiry" className="btn-primary">기업 문의하기</Link>
        <Link href="#cases" className="btn-ghost">AX 사례 보기</Link>
      </ProductHero>

      <section className="border-y border-brown/10">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="py-9 text-center">
              <p className="font-serif text-[40px] font-semibold leading-none text-brown md:text-[50px]">
                <CountUp value={s.value} decimals={s.decimals} />
                <span className="text-[20px]">{s.suffix}</span>
              </p>
              <p className="mt-2 text-[13px] text-brown/75">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="Programs" title={<>조직에 맞춰 고르는 <Hl>세 가지 방식</Hl></>} desc="강의로 분위기를 만들고, 컨설팅으로 일하는 방식을 바꾸고, 필요하면 우리 회사만의 도구를 만듭니다. 묶어서 진행하면 더 효과적이에요." />
        <div className="grid gap-4 md:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className={`flex h-full flex-col rounded-2xl border p-8 ${i === 1 ? "border-brown bg-brown text-butter-pale" : "border-brown/10 bg-white"}`}>
                <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${i === 1 ? "text-butter/80" : "text-olive"}`}>{p.en}</p>
                <h3 className={`mt-4 font-kserif text-[24px] font-bold ${i === 1 ? "text-butter" : "text-brown-dark"}`}>{p.name}</h3>
                <p className={`mt-1 text-[13px] ${i === 1 ? "text-butter-pale/75" : "text-brown/65"}`}>{p.target}</p>
                <p className={`mt-5 text-[15px] leading-relaxed ${i === 1 ? "text-butter-pale/90" : "text-brown/85"}`}>{p.desc}</p>
                <ul className={`mt-6 space-y-2 border-t pt-5 text-[14px] ${i === 1 ? "border-butter/15 text-butter-pale/90" : "border-brown/10 text-brown/90"}`}>
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span className={i === 1 ? "text-butter" : "text-olive"}>·</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <p className={`mt-auto pt-8 font-serif text-[26px] font-semibold ${i === 1 ? "text-butter" : "text-brown"}`}>비용 협의</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASES */}
      {/* 중간 자료 — 교육·구축 현장 */}
      <section className="wrap pb-24 md:pb-32">
        <ImageBand
          eyebrow="교육과 구축 현장"
          images={[
            { src: "/images/lectures/gsb-2026-09.jpg", alt: "클로드 코드 워크샵 강의 현장", caption: "클로드 코드 워크샵 현장" },
            { src: "/images/projects/edu.jpg", alt: "임직원 AI 전환 교육 설계서", caption: "부서별 시나리오가 담긴 교육 설계서" },
            { src: "/images/projects/sales.jpg", alt: "영업 보고서 자동 생성 화면", caption: "영업팀이 쓰는 보고서·스크립트 생성" },
            { src: "/images/projects/agent.jpg", alt: "사내 AI 에이전트 실행 화면", caption: "매주 자동 실행되는 사내 AI 에이전트" },
          ]}
        />
      </section>

      <section id="cases" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="AX Projects" title={<>기업에서 <Hl>실제로 일어난 변화</Hl></>} desc="사내 AX팀과 컨설팅 고객사에서 직접 만든 자동화예요. 큰 글씨는 어떻게 그 숫자를 만들었는지의 핵심이에요. 교육실시확인서 등 증빙 자료는 요청 시 제공해 드려요." />
          <ProjectGrid companyOnly />
          <div className="mt-16">
            <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-brown/65">Case study · 네 건을 자세히</p>
            <CaseStudies />
          </div>
        </div>
      </section>

      {/* LECTURES + SCENE */}
      <section className="wrap py-24 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <Image src="/images/lecture-gsb.jpg" alt="워크샵 현장" width={900} height={1200} className="h-[440px] w-full object-cover object-[50%_65%]" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Lectures</p>
            <h2 className="h-display mt-4 text-[28px] md:text-[38px]">70명이 동시에 설치해도<br />아무도 놓치지 않게</h2>
            <ul className="mt-8 divide-y divide-brown/10 border-y border-brown/10">
              {LECTURES.map((l) => (
                <li key={l.org + l.date} className="grid grid-cols-[64px_1fr_auto] gap-3 py-3 text-[14px]">
                  <span className="text-brown/65">{l.date}</span>
                  <span>
                    <b className="font-semibold text-brown-dark">{l.org}</b>
                    <span className="block text-[13px] text-brown/75">{l.title}</span>
                  </span>
                  <span className="text-brown/65">{l.people}명</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* INQUIRY */}
      <section id="inquiry" className="scroll-mt-20 bg-brown-dark py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-butter/80">Contact</p>
            <h2 className="mt-4 font-kserif text-[32px] font-bold leading-tight text-butter md:text-[44px]">기업 강의 · 컨설팅<br />문의하기</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-butter-pale/85">남겨주신 내용은 바로 대표 메일과 슬랙으로 전달돼요. 1영업일 안에 맞춤 제안서로 회신드립니다.</p>
            <div className="mt-10 space-y-2 text-[14px] text-butter-pale/75">
              <p>메일 · starofleee@gmail.com</p>
              <p>전화 · +82 10-3732-8091</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="text-brown-dark">
            <InquiryForm defaultType="기업 AI 원데이 강의" />
          </Reveal>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={FAQS} />
      </section>

      <StickyBar title="기업 AX 강의 · 컨설팅 · SaaS 개발" price="비용 협의" href="#inquiry" cta="문의하기" />
    </>
  );
}
