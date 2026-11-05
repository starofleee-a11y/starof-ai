"use client";
import { useEffect, useState } from "react";

/**
 * 릴스 자동화 워크플로우 — /consulting '차별점 3가지' 다이어그램(EdgeDiagram)과 같은 문법.
 * 겹치는 반투명 원 5개가 가로로 이어지고, 단계가 차례로 켜져요. 원이나 오른쪽 항목에 올리거나 누르면 그 단계에 멈춰요.
 */
const STEPS = [
  { n: "01", t: "노션 스크립트", s: "후킹 서사·대본을 노션에서 자동 생성", fill: "#FFEB51" },
  { n: "02", t: "AI 이미지", s: "인물·제품 컷을 AI로 생성", fill: "#DDE3B8" },
  { n: "03", t: "AI 영상", s: "컷을 영상으로, 얼굴 합성까지", fill: "#FFC46B" },
  { n: "04", t: "TTS · 자막", s: "음성과 자막을 자동으로 입히기", fill: "#FFEB51" },
  { n: "05", t: "릴스 업로드", s: "썸네일·캡션까지 완성해 업로드", fill: "#DDE3B8" },
];
const CX = [70, 165, 260, 355, 450];

export default function ReelsFlow() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  useEffect(() => {
    if (hover !== null) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 2400);
    return () => clearInterval(t);
  }, [hover]);
  const cur = hover ?? active;

  return (
    <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
      <svg viewBox="0 0 520 220" className="mx-auto w-full max-w-[560px]" role="img" aria-label="노션 스크립트, AI 이미지, AI 영상, TTS·자막, 릴스 업로드로 이어지는 자동화 워크플로우">
        <defs>
          <filter id="rf-glow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {/* 연결선 + 흐르는 점 */}
        <line x1="70" y1="110" x2="450" y2="110" stroke="#FFF9E3" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 6" />
        <g className="rf-dot"><circle cx="70" cy="110" r="6" fill="#FFEB51" style={{ filter: "url(#rf-glow)" }} /></g>
        {STEPS.map((st, i) => {
          const on = cur === i;
          return (
            <g
              key={st.n}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => { setActive(i); setHover(null); }}
              className="cursor-pointer"
              style={{ transformOrigin: `${CX[i]}px 110px`, transform: on ? "scale(1.14)" : "scale(1)", transition: "transform .6s cubic-bezier(.2,.8,.2,1)" }}
            >
              <circle cx={CX[i]} cy="110" r="58" fill={st.fill} style={{ opacity: on ? 0.95 : 0.4, mixBlendMode: "screen", transition: "opacity .6s", filter: on ? "url(#rf-glow)" : undefined }} />
              <circle cx={CX[i]} cy="110" r="58" fill="none" stroke="#FFF9E3" strokeWidth={on ? 2 : 1} style={{ opacity: on ? 0.9 : 0.35, transition: "opacity .6s" }} />
              <text x={CX[i]} y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill={on ? "#2E1F08" : "#FFF9E3"} style={{ pointerEvents: "none", fontFamily: "Pretendard, sans-serif", transition: "fill .4s" }}>{st.n}</text>
              <text x={CX[i]} y="120" textAnchor="middle" fontSize={on ? 14 : 12.5} fontWeight={on ? 800 : 600} fill={on ? "#2E1F08" : "#FFF9E3"} style={{ pointerEvents: "none", fontFamily: "Pretendard, sans-serif", transition: "all .4s" }}>{st.t}</text>
            </g>
          );
        })}
        <text x="260" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFF9E3" fillOpacity="0.6" style={{ fontFamily: "Pretendard, sans-serif", letterSpacing: "0.18em" }}>REELS WORKFLOW · 한 번 셋팅하면 자동</text>
      </svg>
      <ol className="space-y-2.5">
        {STEPS.map((st, i) => {
          const on = cur === i;
          return (
            <li key={st.n}>
              <button
                type="button"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => { setActive(i); setHover(null); }}
                aria-pressed={on}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition-all duration-500 ${on ? "border-butter bg-butter text-brown-dark shadow-[0_24px_50px_-30px_rgba(255,235,81,.8)]" : "border-butter/20 bg-white/[0.05] text-butter-pale/80 hover:bg-white/[0.1]"}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-serif text-[24px] font-bold leading-none ${on ? "text-brown-dark" : "text-butter"}`}>{st.n}</span>
                  <h4 className={`break-keep text-[16px] font-extrabold leading-snug ${on ? "text-brown-dark" : "text-white"}`}>{st.t}</h4>
                </div>
                <div className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className={`overflow-hidden text-[13.5px] leading-relaxed ${on ? "mt-2 text-brown-dark/90" : "text-butter-pale/70"}`}>{st.s}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
