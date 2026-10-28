import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import TrackRecord from "@/components/TrackRecord";
import FAQ from "@/components/FAQ";
import StickyBar from "@/components/StickyBar";
import CountUp from "@/components/CountUp";
import { STATS } from "@/lib/proof";

export const metadata: Metadata = {
  title: "기업 AX 강의 & 컨설팅",
  description: "임직원 AI 실습 교육부터 부서 단위 업무 자동화 구축까지. 성균관대 GSB·기업 출강, AX 컨설팅 현업 사례. 50만원부터, 규모에 따라 협의.",
};

const PROGRAMS = [
  {
    name: "AX 특강",
    time: "2시간",
    target: "전 직원 · 관리자",
    desc: "AI가 우리 회사 일을 어떻게 바꾸는지, 오늘 바로 쓸 수 있는 활용법과 함께 보여드려요.",
    price: "500,000원~",
  },
  {
    name: "실습 워크샵",
    time: "3시간 ~ 1일",
    target: "실무자 20~70명",
    desc: "클로드 코드 설치부터 부서 업무 자동화 1개 완성까지. 조교와 함께 끝까지 따라오게 운영합니다.",
    price: "별도 협의",
  },
  {
    name: "AX 컨설팅",
    time: "4주 ~",
    target: "팀 · 부서 단위",
    desc: "업무 진단 → 자동화 우선순위 → 구축 → 운영 이관. 내부에서 계속 굴러가도록 설계합니다.",
    price: "별도 협의",
  },
];

const FAQS = [
  { q: "비용은 어떻게 정해지나요?", a: "2시간 특강은 50만원부터 시작하고, 인원·시간·실습 여부·컨설팅 범위에 따라 견적을 드려요. 문의 주시면 1영업일 안에 제안서를 보내드립니다." },
  { q: "보안이 걱정돼요.", a: "사내 데이터는 고객사 계정과 환경 안에서만 다루고, 필요하면 비식별 샘플 데이터로 실습을 설계합니다. NDA 체결도 가능해요." },
  { q: "강의 자료와 녹화본을 받을 수 있나요?", a: "교안 PDF는 기본으로 제공하고, 녹화는 협의 후 내부 공유용으로 허용해 드려요." },
  { q: "지방 출강도 가능한가요?", a: "네. 강릉·구미 등 지역 기업 출강 경험이 있어요. 교통·숙박비는 별도로 협의합니다." },
];

export default function EnterprisePage() {
  return (
    <>
      <ProductHero
        index="03"
        en="Enterprise AX"
        title={
          <>
            우리 회사도
            <br />
            AI로 일하게 만들고 싶다면
          </>
        }
        desc="임직원 AI 교육부터 부서 단위 업무 자동화 구축까지. 대학·기업·커뮤니티 7곳에서 검증한 커리큘럼과 현업 AX 컨설팅 경험으로 설계합니다."
        chips={["임직원 AI 실습 교육", "부서별 자동화 진단", "구축 · 운영 이관", "500,000원~ 별도 협의"]}
      >
        <Link href="#inquiry" className="btn-primary">기업 문의하기</Link>
        <Link href="#record" className="btn-ghost">강의·컨설팅 이력 보기</Link>
      </ProductHero>

      <section className="border-y border-brown/10 bg-white/60">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="py-9 text-center">
              <p className="font-serif text-[42px] font-semibold leading-none text-brown md:text-[52px]">
                <CountUp value={s.value} decimals={s.decimals} />
                <span className="text-[22px]">{s.suffix}</span>
              </p>
              <p className="mt-2 text-[13px] text-brown/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="Programs" title="조직에 맞춰 고르는 세 가지 방식" desc="특강으로 분위기를 만들고, 워크샵으로 손에 익히고, 컨설팅으로 일하는 방식을 바꿉니다. 묶어서 진행하면 더 효과적이에요." />
        <div className="grid gap-5 md:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className={`group h-full rounded-[28px] border p-8 transition-all duration-500 hover:-translate-y-2 ${i === 2 ? "border-brown bg-brown text-butter-pale" : "border-brown/10 bg-white"}`}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className={i === 2 ? "text-butter/70" : "text-olive"}>{p.time}</span>
                  <span className={`rounded-full px-3 py-1 ${i === 2 ? "bg-butter/15 text-butter" : "bg-butter-pale text-brown"}`}>{p.target}</span>
                </div>
                <h3 className={`mt-8 font-kserif text-[28px] font-bold ${i === 2 ? "text-butter" : "text-brown-dark"}`}>{p.name}</h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${i === 2 ? "text-butter-pale/75" : "text-brown/75"}`}>{p.desc}</p>
                <p className={`mt-8 font-serif text-[30px] font-semibold ${i === 2 ? "text-butter" : "text-brown"}`}>{p.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RECORD */}
      <section id="record" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Track record" title="강의 이력과 AX 컨설팅 이력" desc="출강한 곳과 진행한 프로젝트예요. 교육실시확인서 등 증빙 자료는 요청 시 제공해 드려요." />
          <TrackRecord />
        </div>
      </section>

      {/* SCENE */}
      <section className="wrap py-24 md:py-32">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[32px]">
              <Image src="/images/lecture-gsb.jpg" alt="워크샵 현장" width={900} height={1200} className="h-[460px] w-full object-cover object-[50%_65%] transition-transform duration-1000 hover:scale-105" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">How we run</p>
            <h2 className="h-display mt-4 text-[30px] md:text-[40px]">70명이 동시에 설치해도<br />아무도 놓치지 않게</h2>
            <ul className="mt-8 space-y-5 text-[15.5px] leading-relaxed text-brown/80">
              <li><b className="text-brown-dark">사전 진단 설문</b> — 직무·숙련도를 미리 받아 실습 예제를 회사 업무로 바꿉니다.</li>
              <li><b className="text-brown-dark">조교 동행</b> — 개발자 출신 조교가 자리를 돌며 설치 에러를 그 자리에서 해결해요.</li>
              <li><b className="text-brown-dark">결과물 중심</b> — 강의가 끝나면 각자 자기 업무 자동화 1개를 들고 나갑니다.</li>
              <li><b className="text-brown-dark">사후 리포트</b> — 만족도·완주율과 다음 단계 AX 제안을 담당자에게 전달합니다.</li>
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
            <p className="mt-6 text-[16px] leading-relaxed text-butter-pale/70">
              남겨주신 내용은 바로 대표 메일과 슬랙으로 전달돼요. 1영업일 안에 맞춤 제안서로 회신드립니다.
            </p>
            <div className="mt-10 space-y-2 text-[14px] text-butter-pale/60">
              <p>메일 · starofleee@gmail.com</p>
              <p>전화 · +82 10-3732-8091</p>
            </div>
          </Reveal>
          <Reveal delay={150} className="text-brown-dark">
            <InquiryForm defaultType="기업 AX 강의" />
          </Reveal>
        </div>
      </section>

      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={FAQS} />
      </section>

      <StickyBar title="기업 AX 강의 · 컨설팅" price="500,000원~" href="#inquiry" cta="문의하기" />
    </>
  );
}
