import Image from "next/image";
import Link from "next/link";
import GlowArea from "@/components/GlowArea";
import Logo from "@/components/Logo";
import Sparkle from "@/components/Sparkle";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import SectionHead from "@/components/SectionHead";
import PriceCards from "@/components/PriceCards";
import ReviewMarquee from "@/components/ReviewMarquee";
import CoffeeChat from "@/components/CoffeeChat";
import OtherProjects from "@/components/OtherProjects";
import TrackRecord from "@/components/TrackRecord";
import { STATS, CAREER } from "@/lib/proof";

const PILLARS = [
  {
    en: "AI Lecture",
    ko: "AI 강의",
    desc: "설치에서 막히는 비개발자도 끝까지 따라오는 실습형 강의. 대학·기업·커뮤니티에서 239명이 들었습니다.",
  },
  {
    en: "AI Builder",
    ko: "자동화 구축",
    desc: "보고서·엑셀·메일·콘텐츠처럼 매주 반복되는 일을 클로드 코드 에이전트로 직접 만들어 드립니다.",
  },
  {
    en: "AX Consulting",
    ko: "AX 컨설팅",
    desc: "어떤 업무부터 자동화할지 진단하고, 구축과 운영 이관까지. 조직이 AI로 일하는 방식을 설계합니다.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — 명함 앞면 */}
      <GlowArea className="overflow-hidden">
        <section className="wrap relative flex min-h-[100svh] flex-col justify-between pb-10 pt-32 md:pt-40">
          <div className="flex items-start justify-between text-[13px] font-medium leading-relaxed text-olive md:text-[15px]">
            <Reveal>
              <p>AX Consulting</p>
              <p>AI Builder</p>
              <p>AI Lecture</p>
            </Reveal>
            <Reveal delay={150} className="text-right">
              <p className="font-semibold">AI 자동화 전문 컨설팅,</p>
              <p>Star of AI</p>
            </Reveal>
          </div>

          <div className="my-14 md:my-10">
            <Reveal delay={200}>
              <h1 className="h-display text-[40px] md:text-[72px]">
                반복 업무는 AI에게,
                <br />
                <span className="underline-hand">당신은 더 중요한 일에.</span>
              </h1>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-brown/80 md:text-[18px]">
                Star of AI는 클로드 코드로 개인과 기업의 업무를 자동화하는 AI 에이전시예요.
                배우고 싶다면 스터디로, 맡기고 싶다면 셋팅 대행으로, 조직 전체라면 AX 컨설팅으로 함께합니다.
              </p>
            </Reveal>
            <Reveal delay={500} className="mt-9 flex flex-wrap gap-3">
              <Link href="#coffee-chat" className="btn-primary">
                무료 커피챗 예약 <span aria-hidden>☕</span>
              </Link>
              <Link href="#pricing" className="btn-ghost">서비스 · 가격 보기</Link>
            </Reveal>
          </div>

          <Reveal delay={300}>
            <div className="relative">
              <Logo className="h-auto w-full" />
              <Sparkle className="absolute -top-6 right-[2%] h-8 w-8 animate-twinkle text-brown md:-top-10 md:h-12 md:w-12" />
            </div>
          </Reveal>
        </section>
      </GlowArea>

      {/* NUMBERS */}
      <section className="border-y border-brown/10 bg-white/60">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="border-brown/10 px-2 py-9 text-center md:border-l md:first:border-l-0">
              <p className="font-serif text-[44px] font-semibold leading-none text-brown md:text-[56px]">
                <CountUp value={s.value} decimals={s.decimals} />
                <span className="ml-1 text-[22px] md:text-[26px]">{s.suffix}</span>
              </p>
              <p className="mt-3 text-[13px] text-brown/60 md:text-[14px]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="wrap py-24 md:py-36">
        <SectionHead
          eyebrow="What we do"
          title={<>Star of AI는<br className="md:hidden" /> 이런 일을 합니다</>}
          desc="강의로 시작해서 구축으로, 구축에서 조직 전체의 AX로. 한 사람이 처음부터 끝까지 책임지는 작은 에이전시예요."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.en} delay={i * 120}>
              <div className="group h-full rounded-[28px] border border-brown/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-butter-pale">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[15px] italic text-olive">0{i + 1}</span>
                  <Sparkle className="h-5 w-5 text-[#E8C300] transition-transform duration-700 group-hover:rotate-180" />
                </div>
                <p className="mt-10 font-serif text-[34px] font-semibold leading-none text-brown">{p.en}</p>
                <p className="mt-2 text-[16px] font-semibold text-brown-dark">{p.ko}</p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-brown/70">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative overflow-hidden bg-paper py-24 md:py-36">
        <div className="wrap grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-[420px]">
              <div className="absolute -inset-6 rounded-[44px] bg-butter/60 blur-2xl" />
              <div className="relative overflow-hidden rounded-[36px] border-[6px] border-white shadow-[0_40px_80px_-40px_rgba(97,66,21,.6)]">
                <Image src="/images/winter-profile.jpg" alt="Star of AI 대표 이경서(Winter)" width={900} height={1020} className="h-auto w-full" priority={false} />
              </div>
              <div className="absolute -bottom-5 -right-3 rotate-[-4deg] rounded-2xl bg-brown px-5 py-3 text-butter shadow-xl md:-right-8">
                <p className="font-serif text-[22px] italic leading-none">Winter</p>
                <p className="mt-1 text-[12px] text-butter-pale/80">AX 컨설턴트 · AI 강사</p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 className="h-display mt-4 text-[30px] md:text-[42px]">
                기획자의 눈으로
                <br />
                업무를 쪼개고, AI로 다시 짭니다
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-7 space-y-4 text-[16px] leading-[1.85] text-brown/80">
                <p>
                  안녕하세요, Star of AI 대표 이경서(Winter)입니다. 디자인을 전공하고 카카오게임즈 계열사에서 서비스 기획을 하면서,
                  매주 같은 보고서를 만들고 같은 표를 옮기는 데 시간을 쓰는 동료들을 많이 봤어요.
                </p>
                <p>
                  그래서 직접 자동화를 만들기 시작했고, 지금은 기업의 AX 컨설턴트이자 AI 강사로 일합니다.
                  코드를 몰라도 괜찮아요. <b className="font-semibold text-brown-dark">“어떤 일을 줄이고 싶은지”만 말해주시면</b>, 나머지는 같이 설계합니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-9 divide-y divide-brown/10 border-y border-brown/10">
                {CAREER.map((c) => (
                  <li key={c.role} className="grid grid-cols-[110px_1fr] gap-4 py-3.5 text-[14px] md:grid-cols-[150px_1fr]">
                    <span className="text-brown/50">{c.period}</span>
                    <span>
                      <b className="font-semibold text-brown-dark">{c.role}</b>
                      <span className="ml-2 text-brown/60">{c.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="wrap py-24 md:py-36">
        <SectionHead
          eyebrow="Track record"
          title="강의, 자동화 프로젝트, AX 컨설팅"
          desc="말보다 결과로. 올해 진행한 강의와 직접 만든 자동화, 기업 컨설팅 이력을 정리했어요."
        />
        <TrackRecord />
      </section>

      {/* FUNNEL 1 — COFFEE CHAT */}
      <section id="coffee-chat" className="relative scroll-mt-20 overflow-hidden bg-brown-dark py-24 text-butter-pale md:py-36">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-butter/20 blur-[120px]" />
        <div className="wrap relative grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <div>
            <Reveal>
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-butter/80">Free coffee chat</p>
              <h2 className="mt-4 font-kserif text-[32px] font-bold leading-[1.25] text-butter md:text-[46px]">
                자동화가 어려우신가요?
                <br />
                AI 강의가 궁금하신가요?
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-butter-pale/75">
                30분 동안 지금 하고 계신 업무를 듣고, 무엇부터 자동화하면 좋을지 같이 그려드려요.
                부담 없이 커피 한 잔 하듯 이야기 나눠요.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <ol className="mt-10 space-y-5">
                {[
                  ["원하는 시간 선택", "가능한 시간대 중 편한 때를 고르세요"],
                  ["고민 · 메일 작성", "자동화하고 싶은 일을 짧게 적어주세요"],
                  ["줌 링크 자동 발송", "예약 즉시 메일로 링크가 도착해요"],
                  ["24시간 전 리마인드", "취소·변경도 메일 버튼 하나로"],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-butter/30 font-serif text-[16px] italic text-butter">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-butter">{t}</p>
                      <p className="text-[14px] text-butter-pale/60">{d}</p>
                    </div>
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
        <SectionHead
          eyebrow="Services & pricing"
          title={<>배울지, 맡길지, 함께 바꿀지.<br />세 가지 방법이 있어요</>}
          desc="모든 상품은 상세 페이지에서 커리큘럼과 후기를 확인하고 바로 결제할 수 있어요. 기업 문의는 규모에 맞춰 견적을 드립니다."
        />
        <PriceCards />
      </section>

      {/* REVIEWS */}
      <section className="overflow-hidden bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            eyebrow="Reviews"
            title={<>수강생이 남긴 말</>}
            desc="성균관대 GSB 클로드 코드 워크샵 참석자 28명의 설문 원문이에요. 64%가 클로드 코드를 처음 접한 분들이었습니다."
          />
        </div>
        <ReviewMarquee />
      </section>

      {/* OTHER PROJECTS */}
      <section className="wrap py-24 md:py-36">
        <SectionHead eyebrow="More from Star of AI" title="직접 만들어 운영하는 서비스" desc="강의와 컨설팅에서 나온 노하우를 누구나 쓸 수 있는 제품으로 만들었어요." />
        <OtherProjects />
      </section>

      {/* FINAL CTA */}
      <GlowArea className="overflow-hidden border-t border-brown/10">
        <section className="wrap relative py-28 text-center md:py-40">
          <Reveal>
            <Sparkle className="mx-auto h-10 w-10 animate-twinkle text-brown" />
            <h2 className="h-display mx-auto mt-8 max-w-3xl text-[32px] md:text-[52px]">
              이번 주에 줄이고 싶은
              <br />
              반복 업무가 있나요?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[16px] text-brown/75">무료 커피챗에서 30분 만에 자동화 지도를 같이 그려봐요.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="#coffee-chat" className="btn-primary">무료 커피챗 예약</Link>
              <Link href="/contact" className="btn-ghost">기업 문의하기</Link>
            </div>
          </Reveal>
        </section>
      </GlowArea>
    </>
  );
}
