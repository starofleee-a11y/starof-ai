"use client";
import { useEffect, useState } from "react";
import { EDGE } from "@/lib/proof";
import Quote from "./Quote";

const C = [
  { fill: "#FFEB51", cx: 150, cy: 120, label: "워크플로우" },
  { fill: "#DDE3B8", cx: 250, cy: 120, label: "스킬 + 실행" },
  { fill: "#FFC46B", cx: 200, cy: 205, label: "대시보드 · 웹" },
];

/** 차별점 3가지 — 겹치는 원 3개. 자동으로 돌아가고, 올리거나 누르면 그 항목이 커져요 */
export default function EdgeDiagram() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  useEffect(() => {
    if (hover !== null) return;
    const t = setInterval(() => setActive((a) => (a + 1) % 3), 3200);
    return () => clearInterval(t);
  }, [hover]);
  const cur = hover ?? active;
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-16">
      <svg viewBox="0 0 400 330" className="mx-auto w-full max-w-[460px]" role="img" aria-label="워크플로우, 스킬+실행, 대시보드·웹 세 원이 겹치는 다이어그램">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {C.map((c, i) => {
          const on = cur === i;
          return (
            <g
              key={c.label}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onClick={() => { setActive(i); setHover(null); }}
              className="cursor-pointer"
              style={{ transformOrigin: `${c.cx}px ${c.cy}px`, transform: on ? "scale(1.12)" : "scale(1)", transition: "transform .6s cubic-bezier(.2,.8,.2,1)" }}
            >
              <circle cx={c.cx} cy={c.cy} r="92" fill={c.fill} style={{ opacity: on ? 0.95 : 0.42, mixBlendMode: "screen", transition: "opacity .6s", filter: on ? "url(#glow)" : undefined }} />
              <circle cx={c.cx} cy={c.cy} r="92" fill="none" stroke="#FFF9E3" strokeWidth={on ? 2 : 1} style={{ opacity: on ? 0.9 : 0.35, transition: "opacity .6s" }} />
            </g>
          );
        })}
        {C.map((c, i) => {
          const on = cur === i;
          const dx = i === 0 ? -34 : i === 1 ? 34 : 0;
          const dy = i === 2 ? 46 : -42;
          return (
            <text key={c.label} x={c.cx + dx} y={c.cy + dy} textAnchor="middle" fontSize={on ? 15 : 13} fontWeight={on ? 800 : 600} fill={on ? "#2E1F08" : "#FFF9E3"} style={{ transition: "all .5s", pointerEvents: "none", fontFamily: "Pretendard, sans-serif" }}>
              {String(i + 1).padStart(2, "0")} {c.label}
            </text>
          );
        })}
        <text x="200" y="146" textAnchor="middle" fontSize="12" fontWeight="800" fill="#2E1F08" style={{ pointerEvents: "none", fontFamily: "Pretendard, sans-serif" }}>Star of AI</text>
        <text x="200" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2E1F08" style={{ pointerEvents: "none", fontFamily: "Pretendard, sans-serif" }}>AX 컨설팅</text>
      </svg>
      <ol className="space-y-3">
        {EDGE.map((e, i) => {
          const on = cur === i;
          return (
            <li key={e.n}>
              <button
                type="button"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => { setActive(i); setHover(null); }}
                aria-pressed={on}
                className={`w-full rounded-2xl border p-6 text-left transition-all duration-500 ${on ? "border-butter bg-butter text-brown-dark shadow-[0_24px_50px_-30px_rgba(255,235,81,.8)]" : "border-butter/20 bg-white/[0.05] text-butter-pale/80 hover:bg-white/[0.1]"}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-serif text-[30px] font-bold leading-none ${on ? "text-brown-dark" : "text-butter"}`}>{e.n}</span>
                  <h3 className={`break-keep text-[18px] font-extrabold leading-snug ${on ? "text-brown-dark" : "text-white"}`}>{e.title}</h3>
                </div>
                <div className={`grid transition-[grid-template-rows] duration-500 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className={`overflow-hidden text-[15px] leading-[1.8] ${on ? "mt-3 text-brown-dark/90" : "text-butter-pale/70"}`}>
                    <Quote text={e.desc} className={on ? "font-extrabold text-brown-dark" : "!text-butter"} />
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
