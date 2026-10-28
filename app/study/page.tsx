import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import ReviewMarquee from "@/components/ReviewMarquee";
import LeadMagnet from "@/components/LeadMagnet";
import StudyApply from "@/components/StudyApply";
import FAQ from "@/components/FAQ";
import StickyBar from "@/components/StickyBar";
import CountUp from "@/components/CountUp";
import { SURVEY } from "@/lib/proof";
import { STUDY } from "@/lib/study";
import { won } from "@/lib/products";

export const metadata: Metadata = {
  title: "자동화 기초 강의 · 클로드 코드 스터디",
  description: "클로드 코드로 내 업무를 직접 자동화해보는 3주 4회 스터디. 설치와 셋팅을 같이 하고, 마지막엔 본인 업무 자동화를 만들어 발표합니다. 1화 교안 PDF 무료.",
};

const FAQS = [
  { q: "코딩을 전혀 몰라도 되나요?", a: "네. 수강생의 64%가 클로드 코드를 처음 접한 분들이었어요. 터미널 설치부터 화면을 같이 보며 진행하고, 막히는 부분은 그 자리에서 해결합니다." },
  { q: "준비물이 있나요?", a: "클로드 Pro 구독과 개인 노트북이 필요해요. 회사 노트북은 설치·터미널 권한이 막혀 있는 경우가 많아 개인 노트북을 권장합니다." },
  { q: "자동화할 주제가 아직 없어요.", a: "매주 반복하는 일 중 ‘입력이 있고 결과물이 있는 일’ 하나면 충분해요. 신청서에 적어주시면 1회차 전에 같이 다듬어 드립니다." },
  { q: "환급은 어떻게 받나요?", a: `4회 전부 참석하시면 ${won(STUDY.refund)}을 4회차 당일 계좌이체로 보내드려요. 한 번이라도 빠지면 환급 대상에서 제외됩니다.` },
  { q: "결제는 언제 하나요?", a: `신청서를 보내면 바로 결제할 수 있고, ${STUDY.resultDate} 선정 안내를 받은 뒤 결제하셔도 돼요. 1회차 시작 전에는 전액 환불됩니다.` },
];

export default function StudyPage() {
  return (
    <>
      <ProductHero
        audience="Starters"
        en="Claude Code Study"
        title={
          <>
            클로드 코드로 내 업무를
            <br />
            직접 자동화해보는 3주
          </>
        }
        desc="설치와 셋팅을 같이 해보고, 마지막엔 본인 업무 자동화를 실제로 만들어 발표합니다. 함께 일잘러가 되는 자동화 스터디예요."
        chips={[STUDY.weeks, "회당 2~2.5시간", `모집 ${STUDY.people}`, won(STUDY.price), `신청 마감 ${STUDY.deadline}`]}
      >
        <Link href="#apply" className="btn-primary">스터디 신청하기</Link>
        <Link href="#free-pdf" className="btn-ghost">1화 교안 무료로 받기</Link>
      </ProductHero>

      {/* PROOF NUMBERS */}
      <section className="border-y border-brown/10">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {[
            { v: SURVEY.overall, d: 2, s: "/5", l: "전체 만족도" },
            { v: SURVEY.theory, d: 2, s: "/5", l: "이론 만족도" },
            { v: SURVEY.beginners, d: 0, s: "%", l: "입문자 비율" },
            { v: SURVEY.completion, d: 0, s: "%", l: "실습 완주율" },
          ].map((x, i) => (
            <Reveal key={x.l} delay={i * 80} className="py-9 text-center">
              <p className="font-serif text-[40px] font-semibold leading-none text-brown md:text-[50px]">
                <CountUp value={x.v} decimals={x.d} />
                <span className="text-[20px]">{x.s}</span>
              </p>
              <p className="mt-2 text-[13px] text-brown/60">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOST */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <Reveal>
            <p className="eyebrow">Host</p>
            <h2 className="h-display mt-4 text-[28px] md:text-[38px]">현업에서 매일 자동화를 만드는 사람이 가르쳐요</h2>
            <p className="mt-6 text-[16px] leading-[1.8] text-brown/80">
              스터디장은 현재 기업에서 <b className="font-semibold text-brown-dark">AX 실무와 AI 컨설팅</b>을 진행하고 있으며, 업무 관리 자동화, 업계 리서치 자동화, 바이브 코딩 대시보드 개발, 마케팅 릴스 제작 자동화 등{" "}
              <b className="font-semibold text-brown-dark">실제 기업 전사 자동화 경험</b>이 있습니다.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-brown/10 border-y border-brown/10">
              {STUDY.hostCareer.map((c) => (
                <li key={c} className="py-3.5 text-[15px] text-brown/85">{c}</li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] text-brown/70">함께 일잘러가 될 수 있는 자동화 스터디하면서 AI 노마드가 되어봐요.</p>
          </Reveal>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Curriculum" title={`${STUDY.weeks} 커리큘럼`} desc={`오프라인 2회는 ${STUDY.place.offline}, 온라인 2회는 ${STUDY.place.online}.`} />
          <div className="grid gap-4 md:grid-cols-2">
            {STUDY.sessions.map((s, i) => (
              <Reveal key={s.no} delay={i * 80}>
                <div className="h-full rounded-2xl border border-brown/10 bg-white p-7 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
                    <span className="font-semibold text-olive">{s.no}</span>
                    <span className="chip">{s.mode}</span>
                  </div>
                  <p className="mt-4 font-serif text-[20px] font-semibold text-brown">{s.date}</p>
                  <h3 className="mt-2 text-[18px] font-bold text-brown-dark">{s.title}</h3>
                  <ul className="mt-5 space-y-2 border-t border-brown/10 pt-5 text-[14.5px] text-brown/75">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-2.5">
                        <span className="text-olive">·</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="overflow-hidden py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Reviews" title="먼저 들은 분들의 이야기" desc={`${SURVEY.source}. 추천 의향 평균 ${SURVEY.recommend}점.`} />
        </div>
        <ReviewMarquee />
      </section>

      {/* LEAD MAGNET */}
      <section id="free-pdf" className="wrap scroll-mt-24 pb-24 md:pb-32">
        <Reveal>
          <LeadMagnet
            product="study"
            file="/downloads/starofai-claude-code-study-ep1.pdf"
            fileName="StarofAI_클로드코드스터디_1화교안.pdf"
            title="1화 강의 교안, 무료로 먼저 보세요"
            desc="1회차 ‘설치부터 첫 배포까지’ 교안 36페이지 전체를 드려요. 이름과 메일만 남기면 바로 다운로드됩니다."
            cover={<Image src="/images/study-ep1-cover.jpg" alt="1화 강의 교안 표지" width={1600} height={900} className="rounded-xl" />}
          />
        </Reveal>
      </section>

      {/* APPLY */}
      <section id="apply" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <SectionHead eyebrow="Apply" title={<>참가비 {won(STUDY.price)}<br />4회 전부 참석하면 {won(STUDY.refund)} 환급</>} desc={`환급은 4회차 당일 계좌이체로 보내드려요. 모집 인원 ${STUDY.people}, 선정 결과는 ${STUDY.resultDate} 카카오톡으로 안내합니다.`} />
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-brown/40">신청 전 꼭 확인해주세요</p>
              <ol className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-brown/80">
                {STUDY.checks.map((c, i) => (
                  <li key={c} className="flex gap-3">
                    <span className="font-serif italic text-olive">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <StudyApply />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={FAQS} />
      </section>

      <StickyBar title={`${STUDY.cohort} · ${STUDY.weeks}`} price={won(STUDY.price)} href="#apply" cta="신청하기" />
    </>
  );
}
