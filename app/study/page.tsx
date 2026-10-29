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
import { STUDY, LECTURE_PHOTOS, STUDENT_PROJECTS, STUDY_MATERIALS, FIT_FOR, NOT_FOR, INCLUDED, GALLERY, MESSAGES, LETTER } from "@/lib/study";
import { Voices } from "@/components/Deliverables";
import Hl from "@/components/Hl";
import { won } from "@/lib/products";

export const metadata: Metadata = {
  title: "자동화 기초 강의 · 클로드 코드 스터디",
  description: "클로드 코드로 내 업무를 직접 자동화해보는 3주 4회 스터디. 설치와 셋팅을 같이 하고, 마지막엔 본인 업무 자동화를 만들어 발표합니다. 1화 교안 PDF 무료.",
};

const FAQS = [
  { q: "코딩을 전혀 몰라도 되나요?", a: "네. 1기 수강생의 64%가 클로드 코드를 처음 접한 분들이었어요. 터미널 설치부터 화면을 같이 보며 진행하고, 막히는 부분은 그 자리에서 해결합니다." },
  { q: "무엇을 배우나요?", a: "클로드 코드 설치·셋팅, 스킬·커넥터·토큰 개념, 실무 자동화 사례 해부, 그리고 내 업무 하나를 직접 자동화해서 발표하는 것까지예요. 이론보다 실습 비중이 큽니다." },
  { q: "유튜브나 온라인 강의와 뭐가 다른가요?", a: "에러에서 멈추지 않는다는 점이에요. 소수 정원이라 막힌 화면을 한 명씩 같이 보고, 내 업무에 맞춰 기획안 피드백까지 받습니다." },
  { q: "수업은 어디서 하나요?", a: `오프라인 2회(1·4회차)는 ${STUDY.place.offline}, 온라인 2회(2·3회차)는 ${STUDY.place.online}에서 진행해요.` },
  { q: "준비물이 있나요?", a: "클로드 Pro 구독과 개인 노트북이 필요해요. 회사 노트북은 설치·터미널 권한이 막혀 있는 경우가 많아 개인 노트북을 권장합니다. 윈도우·맥 모두 가능해요." },
  { q: "자동화할 주제가 아직 없어요.", a: "매주 반복하는 일 중 ‘입력이 있고 결과물이 있는 일’ 하나면 충분해요. 신청서에 적어주시면 1회차 전에 같이 다듬어 드립니다." },
  { q: "수업에 빠지면 어떻게 하나요?", a: "교안과 실습 파일은 드리지만, 한 번이라도 빠지면 3만원 환급 대상에서는 제외돼요. 4회 일정을 꼭 확인하고 신청해 주세요." },
  { q: "수료증을 받을 수 있나요?", a: "네. 4회 전부 참석하시면 4회차 당일 수료증을 드리고, 3만원 환급도 같은 날 계좌이체로 보내드려요." },
  { q: "결제와 환불은 어떻게 되나요?", a: `신청서를 보내면 바로 결제할 수 있고, ${STUDY.resultDate} 선정 안내를 받은 뒤 결제하셔도 돼요. 선정 안내 및 입금 후에는 환불이 불가합니다.` },
  { q: "일정이 안 맞거나, 회사 단위로 듣고 싶어요.", a: "일정이 안 맞으면 1:1 AX 컨설팅으로 내 업무 자동화를 같이 만들 수 있고, 팀·회사 단위는 기업 AX 강의로 진행해요. 무료 커피챗에서 어떤 쪽이 맞는지 같이 정해드립니다." },
];

export default function StudyPage() {
  return (
    <>
      <ProductHero
        tone="starters"
        en="Claude Code Study"
        title={
          <>
            클로드 코드로 내 업무를
            <br className="hidden md:block" />
            직접 자동화해보는 3주
          </>
        }
        desc={<>설치와 셋팅을 같이 해보고, 마지막엔 본인 업무 자동화를 실제로 만들어 발표합니다. <b className="font-semibold text-brown-dark">{STUDY.people} 소수 정원</b>으로 한 분씩 막히는 곳을 바로 풀어드려요.</>}
        chips={["강남 오프라인 2회 + 줌 2회", STUDY.weeks, `${STUDY.people} 소수 정원`, won(STUDY.price), `신청 마감 ${STUDY.deadline}`]}
        aside={
          <div className="grid grid-cols-[1.25fr_1fr] gap-3">
            {LECTURE_PHOTOS.slice(0, 2).map((ph, i) => (
              <div key={ph.src} className={`overflow-hidden rounded-2xl border border-white/70 shadow-[0_30px_60px_-40px_rgba(97,66,21,.6)] ${i === 1 ? "mt-10" : ""}`}>
                <Image src={ph.src} alt={ph.alt} width={ph.w} height={ph.h} className="h-full w-full object-cover" priority={i === 0} />
              </div>
            ))}
          </div>
        }
      >
        <Link href="#apply" className="btn-primary">스터디 신청하기</Link>
        <Link href="#free-pdf" className="btn-ghost">1화 교안 무료로 받기</Link>
      </ProductHero>

      {/* ANCHOR NAV */}
      {/* 히어로가 relative 라 위로 겹쳐 오르면 가려지므로 z-10 — 모바일에서 칩 윗줄이 잘리던 문제 */}
      <div className="wrap relative z-10 -mt-6 mb-10 flex flex-wrap items-center gap-2 md:-mt-10">
        {[["일정", "#schedule"], ["결과물", "#results"], ["현장", "#gallery"], ["커리큘럼", "#curriculum"], ["포함 사항", "#included"], ["강사", "#host"], ["후기", "#reviews"], ["신청", "#apply"], ["질문", "#faq"]].map(([t, h]) => (
          <a key={h} href={h} className="rounded-full border border-brown/20 bg-white px-4 py-2 text-[13px] font-bold text-brown-dark transition hover:border-brown-dark hover:bg-brown-dark hover:text-butter">{t}</a>
        ))}
        <span className="ml-auto rounded-full bg-brown-dark px-4 py-2 text-[13px] font-bold text-butter">4회 전부 참석하면 {won(STUDY.refund)} 환급</span>
      </div>

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
              <p className="mt-2 text-[13px] font-semibold text-brown">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="wrap scroll-mt-20 py-24 md:py-32">
        <SectionHead eyebrow="Schedule" title={<>{STUDY.cohort}<br />수강 일정</>} desc={<>오프라인 2회는 {STUDY.place.offline}, 온라인 2회는 {STUDY.place.online}. <b className="font-bold text-brown-dark">신청 마감 {STUDY.deadline}, 선정 안내 {STUDY.resultDate}.</b></>} />
        <div className="grid gap-3 md:grid-cols-4">
          {STUDY.sessions.map((x, i) => {
            const dark = x.mode === "오프라인";
            return (
              <Reveal key={x.no} delay={i * 70}>
                <div className={`h-full rounded-2xl border p-6 ${dark ? "border-brown-dark bg-brown-dark text-butter-pale" : "border-brown/20 bg-white"}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[13px] font-extrabold ${dark ? "text-butter" : "text-brown"}`}>{x.no}</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${dark ? "bg-butter text-brown-dark" : "bg-sage-pale text-brown-dark"}`}>{x.mode}</span>
                  </div>
                  <p className={`mt-5 font-serif text-[24px] font-bold leading-tight ${dark ? "text-butter" : "text-brown-dark"}`}>{x.date.split(" ")[0]}</p>
                  <p className={`mt-1 text-[15px] font-semibold ${dark ? "text-butter-pale" : "text-brown-dark"}`}>{x.date.split(" ").slice(1).join(" ")}</p>
                  <p className={`mt-4 text-[14px] leading-relaxed ${dark ? "text-butter-pale/80" : "text-brown/85"}`}>{x.title}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brown/20 bg-white p-6 md:flex-row md:items-center">
            <p className="text-[16px] text-brown-dark"><b className="font-extrabold">참가비 {won(STUDY.price)}</b> · 4회 전부 참석하면 {won(STUDY.refund)} 환급 · {STUDY.people} 소수 정원</p>
            <Link href="#apply" className="btn-primary shrink-0">신청하기</Link>
          </div>
        </Reveal>
      </section>

      {/* 1기 결과물 */}
      <section id="results" className="wrap scroll-mt-20 py-24 md:py-32">
        <SectionHead eyebrow="3주 뒤 내 모습" title={<>3주 뒤, <Hl>이런 자동화</Hl>를 직접 만들 수 있어요</>} desc="코딩 경험 없이 시작한 1기 수강생들이 4회차에 실제로 발표한 자동화예요. 비슷한 업무가 있다면 같은 방식으로 만들 수 있어요." />
        <div className="grid gap-4 md:grid-cols-2">
          {STUDENT_PROJECTS.map((pr, i) => (
            <Reveal key={pr.title} delay={i * 80}>
              <div className="card h-full overflow-hidden">
                <div className="relative aspect-[16/9] border-b border-brown/10 bg-paper">
                  <Image src={pr.image} alt={pr.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-brown-dark px-3 py-1 text-[12px] font-bold text-butter">{pr.role}</span>
                    <span className="text-[12px] font-semibold text-brown/70">0{i + 1} · 1기 발표 자료</span>
                  </div>
                  <p className="mt-4 text-[20px] font-extrabold leading-snug text-brown-dark">{pr.can}</p>
                  <h3 className="mt-2 text-[15px] font-bold text-brown">{pr.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-brown/85">{pr.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="강의 현장" title={<>1기 <Hl>현장 사진</Hl></>} desc="1회차 설치 수업부터 4회차 발표까지, 1기 수업 현장이에요. 수강생 얼굴과 이름은 가렸습니다." />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px] md:gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 70} className={`${g.span} min-h-[160px]`}>
                <figure className="relative h-full overflow-hidden rounded-2xl border border-brown/20 bg-white">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 50vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/85 to-transparent px-4 pb-3 pt-10 text-[12.5px] font-bold text-butter-pale">{g.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-14 mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-brown">수강생이 보낸 메시지</p>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-[1fr_1.6fr] md:gap-4">
            <Reveal>
              <figure className="h-full overflow-hidden rounded-2xl border border-brown/20 bg-white">
                <div className="relative aspect-[4/5] md:aspect-auto md:h-[calc(100%-42px)]">
                  <Image src={LETTER.src} alt={LETTER.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="px-4 py-2.5 text-[12.5px] font-semibold text-brown-dark">{LETTER.caption}</figcaption>
              </figure>
            </Reveal>
            <div className="grid gap-3 md:gap-4">
              {MESSAGES.map((m, i) => (
                <Reveal key={m.src} delay={i * 90}>
                  <figure className="grid overflow-hidden rounded-2xl border border-brown/20 bg-[#1a1a1a] md:grid-cols-[1fr_150px]">
                    <div className="relative aspect-[16/5]">
                      <Image src={m.src} alt={m.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-contain p-3" />
                    </div>
                    <figcaption className="flex items-center bg-white px-4 py-2.5 text-[12.5px] font-semibold text-brown-dark">{m.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-butter-deep bg-butter p-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brown">이런 분에게 추천해요</p>
              <ul className="mt-6 space-y-4">
                {FIT_FOR.map((t) => (
                  <li key={t} className="flex gap-3 text-[16px] font-bold leading-snug text-brown-dark"><span className="text-brown">✓</span>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-brown/20 bg-white p-8">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brown/70">이 수업과 맞지 않는 분</p>
              <ul className="mt-6 space-y-4">
                {NOT_FOR.map((t) => (
                  <li key={t} className="flex gap-3 text-[16px] font-medium leading-snug text-brown/85"><span className="text-brown/50">✕</span>{t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="curriculum" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Curriculum" title={`${STUDY.weeks} 커리큘럼`} desc="회차마다 ‘끝나면 손에 남는 것’이 분명해요. 1회차에 설치, 2회차에 샘플 실습, 3회차에 내 기획안 피드백, 4회차에 발표." />
          <div className="grid gap-4 md:grid-cols-2">
            {STUDY.sessions.map((s, i) => (
              <Reveal key={s.no} delay={i * 80}>
                <div className={`h-full overflow-hidden rounded-2xl border ${i % 2 === 0 ? "border-brown/20 bg-white" : "border-brown-dark bg-brown-dark text-butter-pale"}`}>
                  {s.image && (
                    <div className="relative aspect-[21/9] border-b border-brown/10 bg-paper">
                      <Image src={s.image} alt={s.imageAlt ?? s.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover object-top" />
                      <span className="absolute left-4 top-4 rounded-full bg-brown-dark px-3 py-1 text-[12px] font-bold text-butter">{s.no} 교안</span>
                    </div>
                  )}
                  <div className="p-7 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[13px]">
                      <span className={`font-bold ${i % 2 === 0 ? "text-brown" : "text-butter"}`}>{s.no}</span>
                      <span className={i % 2 === 0 ? "chip" : "rounded-full border border-butter/40 px-3 py-1 text-[12px] font-semibold text-butter"}>{s.mode}</span>
                    </div>
                    <p className={`mt-4 font-serif text-[21px] font-bold ${i % 2 === 0 ? "text-brown-dark" : "text-butter"}`}>{s.date}</p>
                    <h3 className={`mt-2 text-[18px] font-extrabold ${i % 2 === 0 ? "text-brown-dark" : "text-white"}`}>{s.title}</h3>
                    <ul className={`mt-5 space-y-2 border-t pt-5 text-[14.5px] ${i % 2 === 0 ? "border-brown/15 text-brown/90" : "border-butter/20 text-butter-pale/85"}`}>
                      {s.items.map((it) => (
                        <li key={it} className="flex gap-2.5">
                          <span className={i % 2 === 0 ? "font-bold text-brown" : "font-bold text-butter"}>·</span>
                          {it}
                        </li>
                      ))}
                    </ul>
                    {s.outcome && (
                      <div className={`mt-5 rounded-xl px-4 py-3 text-[14px] leading-relaxed ${i % 2 === 0 ? "bg-butter text-brown-dark" : "bg-butter text-brown-dark"}`}>
                        <b className="font-extrabold">회차가 끝나면</b> · {s.outcome}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 교안 · 실습 결과물 */}
      <section className="wrap pt-24 md:pt-32">
        <Reveal>
          <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-brown">교안 · 실습 결과물</p>
        </Reveal>
        {/* 모든 카드가 같은 4:3 박스 — 비율이 다른 이미지는 잘리지 않게 안쪽에 맞춰 넣어요 */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STUDY_MATERIALS.map((im, i) => (
            <Reveal key={im.src} delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-brown/20 bg-white">
                <div className="relative aspect-[4/3] bg-paper p-2">
                  <Image src={im.src} alt={im.alt} fill sizes="(min-width:768px) 25vw, 50vw" className="object-contain p-2" />
                </div>
                <figcaption className="flex min-h-[44px] items-center border-t border-brown/10 px-3 py-2.5 text-[12.5px] font-semibold text-brown-dark">{im.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] text-brown/75">실제 수업에서 쓰는 교안과 수강생이 실습 시간에 만든 결과물이에요. 교안은 매 기수 최신 버전으로 업데이트됩니다.</p>
      </section>

      {/* INCLUDED */}
      <section id="included" className="wrap scroll-mt-20 py-24 md:py-32">
        <SectionHead eyebrow="What's included" title={<>합리적인 {won(STUDY.price)}에<br /><Hl>클로드 코드 설치부터 자동화 실습까지</Hl></>} desc="강의만 듣고 끝나지 않도록, 설치 · 셋팅 · 실습 · 1:1 피드백 · 수료까지 전부 포함이에요." />
        <div className="grid gap-3 md:grid-cols-3 md:gap-4">
          {INCLUDED.map((x, i) => (
            <Reveal key={x.t} delay={i * 60}>
              <div className={`h-full rounded-2xl border p-6 ${i === 5 ? "border-brown-dark bg-brown-dark" : "border-brown/20 bg-white"}`}>
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${i === 5 ? "bg-butter text-brown-dark" : "bg-butter-pale text-brown-dark"}`}>{x.k}</span>
                  <span className={`font-serif text-[20px] font-bold ${i === 5 ? "text-butter" : "text-brown/70"}`}>0{i + 1}</span>
                </div>
                <h3 className={`mt-4 text-[17px] font-extrabold leading-snug ${i === 5 ? "text-white" : "text-brown-dark"}`}>{x.t}</h3>
                <p className={`mt-2 text-[14.5px] leading-relaxed ${i === 5 ? "text-butter-pale/85" : "text-brown/85"}`}>{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOST */}
      <section id="host" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-brown/20 shadow-[0_30px_60px_-40px_rgba(46,31,8,.6)]">
              <Image src="/images/lectures/winter-lecture.jpg" alt="강의 중인 스터디장 Winter" width={1400} height={1750} className="h-auto w-full" />
              <span className="absolute left-4 top-4 rounded-full bg-brown-dark px-3 py-1 text-[12px] font-bold text-butter">강의 현장</span>
            </div>
          </Reveal>
          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">Host</p>
              <h2 className="h-display mt-4 text-[28px] md:text-[38px]">
                기업 AI 강의 <Hl>10건+</Hl>, 현업 AX 컨설턴트가
                <br />
                매일 만드는 자동화를 그대로 가르쳐요
              </h2>
              <p className="mt-6 text-[16px] leading-[1.8] text-brown/90">
                스터디장 <b className="font-bold text-brown-dark">이경서(Winter)</b>는 지금도 기업 안에서 <b className="font-bold text-brown-dark">사내 AI 에이전트, 입찰 자동화, 영업 보고서 자동화</b>를 직접 만들고 있어요. 책으로 배운 게 아니라 <b className="font-bold text-brown-dark">이번 주에도 돌아가는 자동화</b>를 수업에 가져옵니다.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {STUDY.hostStats.map((x, i) => (
                <Reveal key={x.l} delay={i * 60}>
                  <div className={`h-full rounded-2xl border p-5 ${i === 0 ? "border-brown-dark bg-brown-dark" : "border-brown/20 bg-white"}`}>
                    <p className={`font-serif text-[34px] font-bold leading-none ${i === 0 ? "text-butter" : "text-brown-dark"}`}>{x.n}</p>
                    <p className={`mt-2 text-[15px] font-extrabold ${i === 0 ? "text-white" : "text-brown-dark"}`}>{x.l}</p>
                    <p className={`mt-1 text-[13px] ${i === 0 ? "text-butter-pale/80" : "text-brown/75"}`}>{x.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <p className="mt-8 rounded-2xl border border-butter-deep bg-butter px-6 py-4 text-[16px] font-bold text-brown-dark">함께 일잘러가 되는 3주. 자동화 스터디로 AI 노마드가 되어봐요.</p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* REVIEWS */}
      <section id="reviews" className="scroll-mt-20 overflow-hidden bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Reviews" title={<><Hl>먼저 들은 분들</Hl>의 이야기</>} desc="1기 수강생이 스터디 페이지에 직접 남긴 후기예요." />
          <Voices />
          <p className="mt-16 text-[12px] font-semibold uppercase tracking-[0.2em] text-brown/55">{SURVEY.source} · 추천 의향 평균 {SURVEY.recommend}점</p>
        </div>
        <div className="mt-6">
          <ReviewMarquee />
        </div>
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
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brown">신청 전 꼭 확인해주세요</p>
              <ol className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-brown/90">
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
      <section id="faq" className="wrap scroll-mt-20 py-24 md:py-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={FAQS} />
      </section>

      <StickyBar title={`${STUDY.cohort} · ${STUDY.weeks}`} price={won(STUDY.price)} href="#apply" cta="신청하기" />
    </>
  );
}
