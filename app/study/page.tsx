import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductHero from "@/components/ProductHero";
import SectionHead from "@/components/SectionHead";
import Reveal from "@/components/Reveal";
import ReviewMarquee from "@/components/ReviewMarquee";
import LeadMagnet from "@/components/LeadMagnet";
import StudyPricing from "@/components/StudyPricing";
import FAQ from "@/components/FAQ";
import StickyBar from "@/components/StickyBar";
import CountUp from "@/components/CountUp";
import { SURVEY } from "@/lib/proof";

export const metadata: Metadata = {
  title: "클로드 코드 설치 & 스터디 과외",
  description: "4회 총 4시간, 설치부터 내 업무 자동화 1개 완성까지. 1:1·소그룹 클로드 코드 과외. 1화 강의 교안 PDF 무료.",
};

const CURRICULUM = [
  {
    no: "01",
    title: "클로드 코드 세팅과 첫 자동화",
    desc: "설치에서 가장 많이 막혀요. 화면을 같이 보면서 설치·로그인·권한 설정을 끝내고, 이력서 파일로 첫 자동화를 돌려봅니다.",
    out: "내 컴퓨터에서 돌아가는 클로드 코드 + 첫 결과물",
  },
  {
    no: "02",
    title: "매일 돌아가는 루틴 자동화",
    desc: "아침 뉴스레터 메일, 주 2회 카드뉴스처럼 ‘알아서 돌아가는’ 루틴을 만듭니다. 스킬·MCP·커넥터(Zapier·Canva) 연결을 실습해요.",
    out: "스케줄로 자동 실행되는 루틴 1개",
  },
  {
    no: "03",
    title: "내 업무 자동화 기획 1:1 피드백",
    desc: "자동화하고 싶은 실제 업무를 플로우 도표로 그리고, 병목과 필요한 커넥터를 함께 정리합니다. 여기서 방향이 확정돼요.",
    out: "내 업무 자동화 설계도",
  },
  {
    no: "04",
    title: "최종 자동화 완성 & 핸드오프",
    desc: "설계도대로 자동화를 완성하고, 혼자서도 고치고 늘릴 수 있도록 유지보수 방법까지 정리해 드립니다.",
    out: "실무에 쓰는 내 업무 자동화 1개",
  },
];

const FAQS = [
  { q: "코딩을 전혀 몰라도 되나요?", a: "네. 수강생의 64%가 클로드 코드를 처음 접한 분들이었어요. 터미널 설치부터 화면을 같이 보며 진행하고, 막히는 부분은 그 자리에서 해결합니다." },
  { q: "준비물이 있나요?", a: "클로드 Pro 이상 구독과 개인 노트북이 필요해요. 회사 노트북은 설치·터미널 권한이 막혀 있는 경우가 많아 개인 노트북을 권장합니다." },
  { q: "온라인으로도 가능한가요?", a: "가능해요. 1회차(설치)는 오프라인(강남)을 권장하지만, 줌 화면공유로도 충분히 진행할 수 있습니다." },
  { q: "단체로 들으면 얼마인가요?", a: "2~3인은 1인당 18만원(10% 할인), 4인 이상은 1인당 16만원(20% 할인)이에요. 팀 단위라면 기업 AX 문의로 커리큘럼을 맞춤 설계해 드려요." },
  { q: "일정은 어떻게 정하나요?", a: "결제 후 24시간 안에 메일로 가능한 일정을 보내드려요. 보통 2~3주 안에 4회를 마칩니다." },
  { q: "환불 규정이 궁금해요.", a: "1회차 시작 전에는 전액 환불, 진행 후에는 남은 회차만큼 환불해 드립니다." },
];

export default function StudyPage() {
  return (
    <>
      <ProductHero
        index="01"
        en="Claude Code Study"
        title={
          <>
            클로드 코드,
            <br />
            4번 만나면 내 업무에 붙습니다
          </>
        }
        desc="혼자 유튜브 보다가 설치에서 멈추셨나요? 1:1 과외로 설치부터 내 업무 자동화 1개 완성까지, 4회 4시간이면 충분해요."
        chips={["4회 · 총 4시간", "1:1 또는 소그룹", "온라인 · 오프라인", "1인 200,000원", "단체 할인"]}
      >
        <Link href="#pricing" className="btn-primary">가격 보고 신청하기</Link>
        <Link href="#free-pdf" className="btn-ghost">1화 교안 무료로 받기</Link>
      </ProductHero>

      {/* PROOF NUMBERS */}
      <section className="border-y border-brown/10 bg-white/60">
        <div className="wrap grid grid-cols-2 md:grid-cols-4">
          {[
            { v: SURVEY.overall, d: 2, s: "/5", l: "전체 만족도" },
            { v: SURVEY.theory, d: 2, s: "/5", l: "이론 만족도" },
            { v: SURVEY.beginners, d: 0, s: "%", l: "입문자 비율" },
            { v: SURVEY.completion, d: 0, s: "%", l: "실습 완주율" },
          ].map((x, i) => (
            <Reveal key={x.l} delay={i * 90} className="py-9 text-center">
              <p className="font-serif text-[42px] font-semibold leading-none text-brown md:text-[52px]">
                <CountUp value={x.v} decimals={x.d} />
                <span className="text-[22px]">{x.s}</span>
              </p>
              <p className="mt-2 text-[13px] text-brown/60">{x.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PAIN → PROMISE */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="eyebrow">Why</p>
            <h2 className="h-display mt-4 text-[30px] md:text-[42px]">혼자 하면 왜 멈출까요?</h2>
            <ul className="mt-8 space-y-4">
              {[
                "설치하다 빨간 에러가 뜨면 거기서 끝",
                "영상은 다 봤는데 내 업무에 어떻게 쓸지 모르겠음",
                "한 번 만들어도 고칠 줄 몰라서 결국 안 씀",
              ].map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl border border-brown/10 bg-white px-5 py-4 text-[15.5px] text-brown/80">
                  <span className="text-brown/40">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">How</p>
            <h2 className="h-display mt-4 text-[30px] md:text-[42px]">그래서 옆에 붙어서 끝까지</h2>
            <ul className="mt-8 space-y-4">
              {[
                "설치는 화면을 같이 보며 그 자리에서 해결",
                "예제가 아니라 ‘내 업무’로 자동화를 만듦",
                "유지보수 방법까지 알려드려서 혼자서도 확장",
              ].map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl bg-butter-pale px-5 py-4 text-[15.5px] font-medium text-brown-dark">
                  <span className="text-[#D9A800]">✦</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="bg-paper py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Curriculum" title="4회 커리큘럼" desc="스터디 1기에서 실제로 진행한 순서를 1:1 과외에 맞게 압축했어요. 회차마다 손에 남는 결과물이 있습니다." />
          <div className="grid gap-4 md:grid-cols-2">
            {CURRICULUM.map((c, i) => (
              <Reveal key={c.no} delay={i * 90}>
                <div className="group h-full rounded-[28px] border border-brown/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-35px_rgba(97,66,21,.55)] md:p-9">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-[48px] font-semibold italic leading-none text-butter-deep [-webkit-text-stroke:1px_#614215]">{c.no}</span>
                    <h3 className="text-[19px] font-bold text-brown-dark">{c.title}</h3>
                  </div>
                  <p className="mt-5 text-[15px] leading-relaxed text-brown/75">{c.desc}</p>
                  <p className="mt-6 inline-flex rounded-full bg-butter-pale px-4 py-2 text-[13px] font-semibold text-brown">결과물 · {c.out}</p>
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
            desc="스터디 1기 1회차 ‘설치부터 첫 배포까지’ 교안 36페이지 전체를 드려요. 이름과 메일만 남기면 바로 다운로드됩니다."
            cover={
              <div className="relative">
                <div className="absolute inset-4 translate-x-4 translate-y-4 rotate-3 rounded-2xl bg-brown/20" />
                <Image src="/images/study-ep1-cover.jpg" alt="1화 강의 교안 표지" width={1600} height={900} className="relative rounded-2xl border-4 border-white shadow-2xl transition-transform duration-700 hover:-rotate-1 hover:scale-[1.02]" />
              </div>
            }
          />
        </Reveal>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-20 bg-paper py-24 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <SectionHead eyebrow="Pricing" title={<>혼자보다<br />같이가 저렴해요</>} desc="동료와 함께 신청하면 1인당 금액이 내려가요. 인원을 조절해 보세요." />
            <Reveal>
              <ul className="space-y-3 text-[15px] text-brown/80">
                {["4회 · 회당 1시간 1:1/소그룹 과외", "설치 · 세팅 동행", "회차별 교안 PDF", "스킬 모음집 (클로드 코드 스킬 가이드)", "수료 후 2주 질문 응답"].map((t) => (
                  <li key={t} className="flex gap-2.5"><span className="text-[#D9A800]">✦</span>{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <StudyPricing />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap py-24 md:py-32">
        <SectionHead eyebrow="FAQ" title="자주 묻는 질문" />
        <FAQ items={FAQS} />
      </section>

      <StickyBar title="클로드 코드 스터디 과외 · 4회 4시간" price="200,000원" href="#pricing" cta="신청하기" />
    </>
  );
}
