import type { Metadata } from "next";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import Hl from "@/components/Hl";
import CountUp from "@/components/CountUp";
import Image from "next/image";
import ReelVideo from "@/components/ReelVideo";
import ReelsFlow from "@/components/ReelsFlow";
import FitSpotlight from "@/components/FitSpotlight";
import ApplyButton from "@/components/ApplyButton";
import ApplyModalHost from "@/components/ApplyModalHost";
import FloatingCTA from "@/components/FloatingCTA";
import { ONEDAY } from "@/lib/oneday";
import { PRODUCTS, won } from "@/lib/products";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI 콘텐츠 제작 원데이 · AI로 릴스 제작 자동화 해보기",
  description: `${ONEDAY.date} 3시간 원데이 클래스. 니온앤비욘 챌린지 얼굴 합성, 촬영 없는 AI 제품 홍보 영상, 릴스 후킹 스크립트, 릴스 자동화 워크플로우 구축까지. ${won(ONEDAY.price)}.`,
};

export default function OnedayPage() {
  const p = PRODUCTS.oneday;
  return (
    <>
      <ProductHero
        tone="starters"
        en="AI Reels One-day"
        title={
          <>
            AI로 릴스 제작,
            <br className="hidden md:block" />
            3시간 안에 자동화까지
          </>
        }
        desc={
          <>
            <b className="font-semibold text-brown-dark">「{ONEDAY.title}」</b> — 얼굴 합성 챌린지 영상과 촬영 없는 제품 홍보 영상을 직접 만들고, 노션 스크립트부터 제작까지 이어지는{" "}
            <b className="font-semibold text-brown-dark">릴스 자동화 워크플로우</b>를 내 손으로 구축해요.
          </>
        }
        chips={[ONEDAY.date, `${ONEDAY.mode} · 강남`, ONEDAY.duration, won(ONEDAY.price), ONEDAY.people]}
        aside={<ChallengeCard />}
      >
        <ApplyButton kind="oneday" className="btn-primary">원데이 신청하기</ApplyButton>
        <Link href="#curriculum" className="btn-ghost">커리큘럼 보기</Link>
      </ProductHero>

      {/* ANCHOR NAV */}
      <div className="wrap relative z-10 -mt-6 mb-10 flex flex-wrap items-center gap-2 md:-mt-10">
        {[["커리큘럼", "#curriculum"], ["강사 릴스", "#host"], ["이런 분께", "#fit"], ["신청", "#apply"], ["질문", "#faq"]].map(([t, h]) => (
          <a key={h} href={h} className="rounded-full border border-brown/20 bg-white px-4 py-2 text-[13px] font-bold text-brown-dark transition hover:border-brown-dark hover:bg-brown-dark hover:text-butter">{t}</a>
        ))}
        <span className="ml-auto rounded-full bg-brown-dark px-4 py-2 text-[13px] font-bold text-butter">{ONEDAY.dateShort} {ONEDAY.time} · 단 하루</span>
      </div>

      {/* PROOF NUMBERS — 강사의 릴스 성과 */}
      <section className="border-y border-brown/10">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {[
            { v: 50, s: "만회+", l: ONEDAY.reels.totalLabel },
            { v: 16, s: "만회", l: "최고 조회 릴스" },
            { v: 15, s: "만회", l: "두 번째 히트 릴스" },
            { v: 4, s: "편", l: "3시간 뒤 완성하는 결과물" },
          ].map((x, i) => (
            <Reveal key={x.l} delay={i * 80} className="py-9 text-center">
              <p className="font-serif text-[40px] font-semibold leading-none text-brown md:text-[50px]">
                <CountUp value={x.v} decimals={0} />
                <span className="text-[20px]">{x.s}</span>
              </p>
              <p className="mt-2 text-[13px] font-semibold text-brown">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="wrap scroll-mt-20 py-24 md:py-32">
        <SectionHead eyebrow="Curriculum" title={<>{ONEDAY.date}<br /><Hl>4가지</Hl>를 직접 만들어요</>} desc={`${ONEDAY.place}. 편집 프로그램 없이 AI 툴과 자동화로 진행하고, 수업 안에서 릴스 2편과 내 워크플로우를 완성합니다.`} />
        {/* 실습 주제 4개를 세로로 하나씩 — 영상은 원래 비율(9:16 / 16:9) 그대로, 글 옆에 붙어요. 스크롤하면 하나씩 나타나요. */}
        <div className="grid gap-5">
          {ONEDAY.curriculum.map((c, i) => {
            const dark = i === 3;
            const tall = c.ref.kind === "video" && !c.ref.wide;
            return (
              <Reveal key={c.no} delay={60} className="min-w-0">
                <div className={`rounded-3xl border p-6 md:p-8 ${dark ? "border-brown-dark bg-brown-dark text-butter-pale" : "border-brown/20 bg-white"}`}>
                  <div className={`grid items-center gap-7 md:gap-10 ${c.ref.kind === "flow" ? "" : tall ? "md:grid-cols-[1fr_220px]" : "md:grid-cols-[1fr_minmax(0,520px)]"}`}>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className={`font-serif text-[34px] font-semibold leading-none ${dark ? "text-butter" : "text-olive"}`}>{c.no}</span>
                        <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${dark ? "bg-butter text-brown-dark" : "bg-butter-pale text-brown-dark"}`}>{c.tag}</span>
                      </div>
                      <p className={`mt-5 break-keep text-[22px] font-bold leading-snug md:text-[26px] ${dark ? "text-butter" : "text-brown-dark"}`}>{c.title}</p>
                      <p className={`mt-3 max-w-xl text-[15px] leading-relaxed ${dark ? "text-butter-pale/85" : "text-brown/85"}`}>{c.desc}</p>
                      <p className={`mt-5 text-[13.5px] font-semibold ${dark ? "text-butter/80" : "text-olive"}`}>결과물 · {c.out}</p>
                      {c.ref.kind !== "flow" && <p className={`mt-2 text-[11.5px] ${dark ? "text-butter-pale/60" : "text-brown/55"}`}>{c.ref.label}</p>}
                    </div>
                    {c.ref.kind === "video" && (
                      <div className={`mx-auto w-full ${tall ? "max-w-[220px]" : "max-w-[520px]"} md:mx-0 md:justify-self-end`}>
                        <div className={`relative overflow-hidden rounded-2xl border border-brown/10 bg-brown-dark ${tall ? "aspect-[9/16]" : "aspect-video"}`}>
                          <ReelVideo src={c.ref.src} poster={c.ref.poster} />
                        </div>
                      </div>
                    )}
                    {c.ref.kind === "flow" && (
                      <div>
                        <ReelsFlow />
                        <p className="mt-2 text-[11.5px] text-butter-pale/60">{c.ref.label}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brown/20 bg-white p-6 md:flex-row md:items-center">
            <p className="text-[16px] text-brown-dark"><b className="font-extrabold">참가비 {won(ONEDAY.price)}</b> · {ONEDAY.date} · {ONEDAY.people}</p>
            <ApplyButton kind="oneday" className="btn-primary shrink-0">신청하기</ApplyButton>
          </div>
        </Reveal>
      </section>

      {/* HOST */}
      <section id="host" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <Reveal className="min-w-0">
            <p className="eyebrow">Host · {SITE.instagramHandle}</p>
            <h2 className="h-display mt-4 text-[30px] md:text-[40px]">릴스 <Hl>50만회+</Hl>를 직접 터뜨리고,<br />그 과정을 전부 자동화한 사람</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-brown/90">
              15만·16만·7만회 등 도합 50만회가 넘는 릴스를 직접 만들어 터뜨렸어요. AI 인물 릴스, AI 제품 릴스, 직접 촬영 + TTS 자막 콘텐츠까지 세 가지 방식을 모두 운영해 봤고, 지금은 노션 스크립트부터 제작까지 전부 자동으로 돌아가는 워크플로우로 만들고 있어요. 이 수업에서 그 방식을 그대로 넘겨드려요.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {ONEDAY.reels.hits.map((h) => (
                <div key={h.l} className="rounded-2xl border border-brown/15 bg-white p-4 text-center">
                  <p className="font-serif text-[26px] font-semibold leading-none text-brown">{h.n}</p>
                  <p className="mt-2 text-[12px] font-semibold text-brown/70">{h.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="min-w-0">
            {/* 강사가 직접 만든 릴스 세 편이 카드 안에서 재생돼요 */}
            <div className="grid grid-cols-3 gap-3">
              {ONEDAY.reels.works.map((w) => (
                <figure key={w.name} className="min-w-0">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-brown/10 bg-brown-dark shadow-[0_24px_50px_-30px_rgba(46,31,8,.7)]">
                    <ReelVideo src={w.media.src} poster={w.media.poster} />
                  </div>
                  <figcaption className="mt-3">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-olive">{w.k}</p>
                    <p className="mt-0.5 truncate font-serif text-[19px] font-semibold leading-tight text-brown-dark">{w.name}</p>
                    <p className="mt-1 text-[12.5px] leading-snug text-brown/75">{w.desc}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-4 rounded-2xl border border-brown-dark bg-brown-dark p-5 text-butter-pale">
              <div className="min-w-0 flex-1">
                <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-butter/80">{ONEDAY.reels.workflow.k}</p>
                <p className="mt-1 font-serif text-[22px] font-semibold leading-tight text-butter">{ONEDAY.reels.workflow.name}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-butter-pale/85">{ONEDAY.reels.workflow.desc} — 04 실습에서 이 워크플로우를 같이 만들어요.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FIT */}
      <section id="fit" className="wrap scroll-mt-20 py-24 md:py-32">
        <SectionHead eyebrow="For you" title={<>이런 분께 <Hl>딱 맞아요</Hl></>} desc="마우스를 올리거나 눌러서 나와 가장 가까운 분을 골라 보세요." />
        <Reveal>
          <FitSpotlight items={ONEDAY.fit} />
        </Reveal>
      </section>

      {/* APPLY */}
      <section id="apply" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <SectionHead eyebrow="Apply" title={<>참가비 {won(ONEDAY.price)}<br />{ONEDAY.date}</>} desc={`${ONEDAY.place}. ${ONEDAY.people}으로 진행하고, 결제를 마치면 자리가 확정돼요.`} />
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brown">신청 전 꼭 확인해주세요</p>
              <ol className="mt-3 space-y-3 text-[14.5px] leading-relaxed text-brown/90">
                {ONEDAY.checks.map((c, i) => (
                  <li key={c} className="flex gap-3">
                    <span className="font-serif italic text-olive">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="card p-7 md:p-9">
              <p className="eyebrow">Apply</p>
              <p className="mt-2 text-[22px] font-bold text-brown-dark">{ONEDAY.cohort}</p>
              <p className="mt-1 text-[14px] text-brown/75">「{ONEDAY.title}」 · 신청 마감 {ONEDAY.deadline}</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-brown/10 py-5 text-[14px]">
                <dt className="text-brown/70">일정</dt>
                <dd className="text-right font-bold text-brown-dark">{ONEDAY.date}</dd>
                <dt className="text-brown/70">장소</dt>
                <dd className="text-right font-bold text-brown-dark">{ONEDAY.mode} · 강남</dd>
                <dt className="text-brown/70">참가비</dt>
                <dd className="text-right font-bold text-brown-dark">{won(ONEDAY.price)}</dd>
                <dt className="text-brown/70">준비물</dt>
                <dd className="text-right font-bold text-brown-dark">개인 노트북 · 내 사진 1장</dd>
              </dl>
              <ApplyButton kind="oneday" className="btn-primary mt-6 w-full !py-4 text-[16px]">{p.cta}</ApplyButton>
              <p className="mt-3 text-center text-[12.5px] text-brown/65">신청서는 1분이면 끝나요 · 신청 후 바로 결제할 수 있어요</p>
              <p className="mt-3 rounded-xl bg-paper px-4 py-3 text-center text-[13px] font-semibold text-brown-dark">📩 {ONEDAY.smsNotice}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="wrap scroll-mt-20 py-24 md:py-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={ONEDAY.faqs} />
      </section>

      <FloatingCTA kind="oneday" primary="원데이 신청하기" secondary={{ label: "커리큘럼 보기", href: "#curriculum" }} note={`${won(ONEDAY.price)} · ${ONEDAY.dateShort} ${ONEDAY.time}`} />
      <ApplyModalHost kind="oneday" />
    </>
  );
}

/** 히어로 오른쪽 — 니온앤비욘 챌린지 참고 이미지 (01 실습에서 내 얼굴을 넣어 만드는 영상) */
function ChallengeCard() {
  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_40px_80px_-40px_rgba(97,66,21,.6)]">
        <Image src="/images/oneday/challenge.jpg" alt="니온앤비욘 챌린지 영상 장면 — 흰 옷을 입은 두 댄서" width={831} height={556} priority className="h-auto w-full" />
      </div>
      <figcaption className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-brown-dark/90 px-3 py-1.5 text-[12px] font-bold text-butter backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-butter" />
        01 · 니온앤비욘 챌린지에 내 얼굴 넣기
      </figcaption>
      <div className="absolute -bottom-5 right-4 rounded-2xl border border-brown/10 bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(97,66,21,.5)]">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-olive">촬영 없이</p>
        <p className="text-[14px] font-bold text-brown-dark">내가 등장하는 챌린지 릴스 1편</p>
      </div>
    </figure>
  );
}
