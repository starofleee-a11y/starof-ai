import Reveal from "./Reveal";
import CountUp from "./CountUp";
import Hl from "./Hl";
import { RESULTS, REVIEWS, SURVEY, LECTURES } from "@/lib/proof";

const PICKED = [REVIEWS[0], REVIEWS[2], REVIEWS[6]];

/** 이력을 나열하는 대신, 스크롤하며 설득되는 성과 섹션 */
export default function Proof() {
  const orgs = Array.from(new Set(LECTURES.map((l) => l.org)));
  return (
    <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
      <div className="md:sticky md:top-28 md:self-start">
        <Reveal>
          <p className="eyebrow">Results</p>
          <h2 className="h-display mt-4 text-[30px] md:text-[44px]">
            자동화 구축도 <Hl>전문가에게 맡겨야</Hl>
            <br />
            <Hl delay={350}>진정한 성과</Hl>를 이룰 수 있습니다
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-brown/85">
            말보다 <b className="font-bold text-brown-dark">숫자로 먼저</b> 보여드릴게요. 기업 AX 컨설팅에서 실제로 줄어든 시간과, 강의를 들은 분들이 남긴 점수예요.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-10 hidden md:block">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-brown/55">함께한 곳</p>
          <ul className="mt-3 space-y-1.5 text-[14px] text-brown/85">
            {orgs.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="space-y-4">
        {RESULTS.map((r, i) => (
          <Reveal key={r.title} delay={i * 120}>
            <article
              className={`fillcard rounded-2xl border p-7 md:p-9 ${i === 0 ? "border-brown-dark bg-brown-dark text-butter-pale" : "border-white/80 bg-white/70"}`}
              style={{
                ["--fd" as string]: `${i * 120 + 150}ms`,
                ["--f1" as string]: i === 0 ? "rgba(122,74,20,.95)" : ["rgba(255,235,81,.7)", "rgba(255,176,80,.5)", "rgba(214,178,128,.6)"][(i - 1) % 3],
                ["--f2" as string]: i === 0 ? "rgba(97,66,21,.6)" : "rgba(255,255,255,.3)",
              }}
            >
              <div className="flex items-center justify-between text-[12px]">
                <span className={`font-semibold uppercase tracking-[0.18em] ${i === 0 ? "text-butter/80" : "text-olive"}`}>{r.kind}</span>
                <span className={i === 0 ? "text-butter-pale/75" : "text-brown/65"}>{r.org}</span>
              </div>
              <p className={`mt-6 font-serif text-[42px] font-bold leading-none tracking-[-0.03em] md:text-[58px] ${i === 0 ? "text-butter" : "text-brown"}`}>{r.big}</p>
              <p className={`mt-4 text-[18px] font-bold ${i === 0 ? "text-butter" : "text-brown-dark"}`}>{r.title}</p>
              <p className={`mt-2 text-[15px] leading-relaxed ${i === 0 ? "text-butter-pale/85" : "text-brown/85"}`}>{r.desc}</p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={100}>
          <div className="rounded-2xl bg-paper p-7 md:p-9">
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { v: SURVEY.overall, d: 2, s: "/5", l: "전체 만족도" },
                { v: SURVEY.completion, d: 0, s: "%", l: "실습 완주율" },
                { v: SURVEY.recommend, d: 2, s: "/10", l: "추천 의향" },
              ].map((x) => (
                <div key={x.l}>
                  <p className="font-serif text-[34px] font-semibold leading-none text-brown md:text-[44px]">
                    <CountUp value={x.v} decimals={x.d} />
                    <span className="text-[16px]">{x.s}</span>
                  </p>
                  <p className="mt-2 text-[12px] text-brown/75 md:text-[13px]">{x.l}</p>
                </div>
              ))}
            </div>
            <ul className="mt-8 space-y-5 border-t border-brown/10 pt-7">
              {PICKED.map((r) => (
                <li key={r.quote}>
                  <p className="text-[16px] font-medium leading-relaxed text-brown-dark md:text-[17px]">“{r.quote}”</p>
                  <p className="mt-1.5 text-[12.5px] text-brown/65">{r.who}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[12px] text-brown/60">출처: {SURVEY.source}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
