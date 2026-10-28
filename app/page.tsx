import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Wordmark from "@/components/Wordmark";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SectionHead from "@/components/SectionHead";
import Hl from "@/components/Hl";
import PriceCards from "@/components/PriceCards";
import ReviewMarquee from "@/components/ReviewMarquee";
import CoffeeChat from "@/components/CoffeeChat";
import OtherProjects from "@/components/OtherProjects";
import Proof from "@/components/Proof";
import InstagramStrip from "@/components/InstagramStrip";
import { STATS, CAREER } from "@/lib/proof";
import { SITE } from "@/lib/site";
import { TONES, type Tone } from "@/lib/tones";

const PILLARS: { tone: Tone; q: string; a: string; href: string; label: string }[] = [
  {
    tone: "starters",
    q: "클로드 코드 설치부터 자동화까지, 어떻게 하는지 잘 모르신다구요?",
    a: "Starters를 위한 전문 강의를 진행해드립니다.",
    href: "/study",
    label: "자동화 기초 강의",
  },
  {
    tone: "workers",
    q: "복잡한 업무의 병목현상을 자동화하고 싶다구요?",
    a: "Workers를 위한 1:1 맞춤 AI 컨설팅을 진행해드립니다.",
    href: "/consulting",
    label: "1:1 AX 컨설팅",
  },
  {
    tone: "company",
    q: "조직 전사적으로 AX로 시스템을 혁신하고 싶다구요?",
    a: "Company를 위한 기업맞춤 자동화 시스템 개발을 진행해드립니다.",
    href: "/enterprise",
    label: "기업 AX",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Wordmark />

      {/* NUMBERS */}
      <section className="border-y border-brown/10">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="border-brown/10 px-2 py-9 text-center md:border-l md:first:border-l-0">
              <p className="font-serif text-[42px] font-semibold leading-none text-brown md:text-[54px]">
                <CountUp value={s.value} decimals={s.decimals} />
                <span className="ml-1 text-[20px] md:text-[24px]">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[13px] text-brown/75">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="services" className="wrap scroll-mt-20 py-24 md:py-36">
        <SectionHead
          eyebrow="What we do"
          title={<>Star of AI 에이전시는 AX 에이전시로,<br />개인 혹은 조직의 <Hl>AI 생산성</Hl>을 갖추도록 돕습니다</>}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => {
            const t = TONES[p.tone];
            return (
            <Reveal key={p.tone} delay={i * 100}>
              <Link href={p.href} className={`gcard g-${p.tone} group flex h-full flex-col p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(97,66,21,.5)]`}>
                <p className={`font-serif text-[30px] font-semibold leading-none ${t.text}`}>{t.label}</p>
                <p className="mt-8 text-[17px] font-bold leading-snug text-brown-dark">{p.q}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-brown/85">{p.a}</p>
                <span className={`mt-auto inline-flex items-center gap-2 pt-8 text-[14px] font-semibold ${t.text}`}>
                  {p.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </section>

      {/* PROOF */}
      <section className="bg-paper py-24 md:py-36">
        <div className="wrap">
          <Proof />
        </div>
      </section>

      {/* ABOUT */}
      <section className="wrap py-24 md:py-36">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <Image src="/images/winter-profile.jpg" alt="Star of AI 대표 이경서(Winter)" width={900} height={1020} className="h-auto w-full" />
            </div>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn-ghost mt-5 w-full !py-3 !text-[14px]">
              Instagram {SITE.instagramHandle} ↗
            </a>
          </Reveal>
          <div className="min-w-0">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="h-display mt-4 text-[30px] md:text-[40px]">
                <Hl>기획자의 눈</Hl>으로 업무를 쪼개고,
                <br />
                AI로 <Hl delay={350}>다시 짭니다</Hl>
              </h2>
              <p className="mt-7 text-[16px] leading-[1.85] text-brown/90 md:text-[17px]">
                안녕하세요, Star of AI 대표 <b className="font-semibold text-brown-dark">이경서(Winter)</b>입니다. 디자인을 전공하고 카카오게임즈 계열사에서 글로벌 서비스를 기획했고,
                지금은 <b className="font-semibold text-brown-dark">IT 기획 에이전시를 운영하며 기업 AX팀에서 실무 자동화를 직접 만들고</b> 있어요.
                기업·교육기관 <b className="font-semibold text-brown-dark">AI 강의 10회 이상, 누적 수강생 260명+</b>, 사내 AI 에이전트로{" "}
                <b className="font-semibold text-brown-dark">6시간 업무를 1시간으로</b> 줄인 경험을 그대로 나눕니다. 코드를 몰라도 괜찮아요.{" "}
                <b className="font-semibold text-brown-dark">어떤 일을 줄이고 싶은지만 말해주시면</b>, 나머지는 같이 설계합니다.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-8 divide-y divide-brown/10 border-y border-brown/10">
                {CAREER.map((c) => (
                  <li key={c.role} className="grid grid-cols-[110px_1fr] gap-4 py-3 text-[14px] md:grid-cols-[150px_1fr]">
                    <span className="text-brown/65">{c.period}</span>
                    <span>
                      <b className="font-semibold text-brown-dark">{c.role}</b>
                      <span className="ml-2 text-brown/75">{c.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={200} className="mt-10">
              <InstagramStrip />
            </Reveal>
          </div>
        </div>
      </section>

      {/* COFFEE CHAT */}
      <section id="coffee-chat" className="scroll-mt-20 bg-brown-dark py-24 text-butter-pale md:py-36">
        <div className="wrap grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-butter/80">Free coffee chat</p>
              <h2 className="mt-4 font-kserif text-[32px] font-bold leading-[1.25] text-butter md:text-[44px]">
                어떻게 AI를 도입해야 할지
                <br />
                <mark className="hl hl-butter">막막하시다구요?</mark>
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-butter-pale/85">
                <b className="font-bold text-butter">무료로 AX 자동화 범위</b>를 상담해드려요. 30분 동안 지금 하고 계신 업무를 듣고, 무엇부터 자동화하면 좋을지 같이 그립니다. 내일부터 2주 안에서 비는 시간을 바로 고르세요.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ol className="mt-10 space-y-4 text-[15px]">
                {["가능한 시간 선택", "자동화 고민 한 줄", "미팅 링크 메일 발송", "하루 전 리마인드 · 메일에서 취소"].map((t, i) => (
                  <li key={t} className="flex gap-4 border-b border-butter/10 pb-4">
                    <span className="font-serif text-[15px] italic text-butter/60">0{i + 1}</span>
                    <span className="text-butter-pale/90">{t}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
          <Reveal delay={200} className="min-w-0 text-brown-dark">
            <CoffeeChat />
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="wrap scroll-mt-20 py-24 md:py-36">
        <SectionHead eyebrow="Services & pricing" title={<>3가지 방법 중<br /><Hl>나에게 맞는 플랜</Hl>을 고를 수 있어요</>} desc={<><b className="font-bold text-brown-dark">배울지, 맡길지, 함께 바꿀지.</b> 지금 상황에 맞는 방법 하나를 고르면 돼요.</>} />
        <PriceCards />
      </section>

      {/* REVIEWS */}
      <section className="overflow-hidden bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Reviews" title="수강생이 남긴 말" desc="성균관대 GSB 클로드 코드 워크샵 참석자 28명의 설문 원문이에요." />
        </div>
        <ReviewMarquee />
      </section>

      {/* OTHER PROJECTS */}
      <section className="wrap py-24 md:py-36">
        <SectionHead eyebrow="More from Star of AI" title="직접 만들어 운영하는 서비스" />
        <OtherProjects />
      </section>

      {/* FINAL CTA */}
      <section className="glow-bg border-t border-brown/10">
        <div className="wrap py-28 text-center md:py-40">
          <Reveal>
            <h2 className="h-display mx-auto max-w-3xl text-[32px] md:text-[52px]">
              이번 주에 줄이고 싶은
              <br />
              반복 업무가 있나요?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[16px] text-brown/85">무료 커피챗에서 30분 만에 자동화 지도를 같이 그려봐요.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="#coffee-chat" className="btn-primary">무료 커피챗 예약</Link>
              <Link href="/contact" className="btn-ghost">기업 문의하기</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
