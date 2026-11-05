"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * "이런 분께 딱 맞아요" — 타깃이 하나씩 켜지며 강조돼요.
 * 2.6초마다 자동으로 다음 타깃으로 넘어가고, 마우스를 올리거나 탭하면 그 타깃에 멈춰요.
 */
export default function FitSpotlight({ items }: { items: { who: string; why: string }[] }) {
  const [on, setOn] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold) return;
    const t = setInterval(() => setOn((v) => (v + 1) % items.length), 2600);
    return () => clearInterval(t);
  }, [hold, items.length]);

  return (
    <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
      {/* 왼쪽: 지금 켜진 타깃을 크게 */}
      <div className="relative overflow-hidden rounded-3xl bg-brown-dark p-7 text-butter-pale md:p-9">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-butter/70">Who is this for</p>
        {/* 모든 항목을 같은 칸에 겹쳐 두고(높이 = 가장 긴 항목) 켜진 것만 보여요 */}
        {/* 타깃별 일러스트 — 켜진 항목의 그림만 보여요 */}
        <div className="mt-6 grid md:mt-8">
          {items.map((it, i) => (
            <div key={it.who} className={`mx-auto aspect-square h-[220px] [grid-area:1/1] transition-all duration-500 md:h-[260px] ${i === on ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`} aria-hidden={i !== on}>
              <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
                <Image src={`/images/oneday/fit-0${i + 1}.jpg`} alt="" width={640} height={640} className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid md:mt-6">
        {items.map((it, i) => (
          <div key={it.who} className={`[grid-area:1/1] transition-all duration-500 ${i === on ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`} aria-hidden={i !== on}>
            <p className="font-serif text-[15px] italic text-butter/70">0{i + 1} / 0{items.length}</p>
            <p className="mt-2 break-keep font-kserif text-[26px] font-bold leading-tight text-butter md:text-[34px]">
              <span className="bg-[linear-gradient(transparent_62%,rgba(255,235,81,.35)_62%)]">{it.who}</span>
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-butter-pale/85">{it.why}</p>
          </div>
        ))}
        </div>
        <div className="absolute right-7 top-7 flex gap-1.5 md:right-9 md:top-9">
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === on ? "w-6 bg-butter" : "w-1.5 bg-butter/30"}`} />
          ))}
        </div>
      </div>
      {/* 오른쪽: 목록 — 켜진 항목이 강조되고 나머지는 흐려져요 */}
      <ul className="grid gap-3" onMouseLeave={() => setHold(false)}>
        {items.map((it, i) => {
          const active = i === on;
          return (
            <li key={it.who}>
              <button
                type="button"
                onMouseEnter={() => { setOn(i); setHold(true); }}
                onClick={() => { setOn(i); setHold(true); }}
                className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-500 ${active ? "scale-[1.02] border-brown bg-butter shadow-[0_18px_40px_-24px_rgba(97,66,21,.6)]" : "border-brown/15 bg-white opacity-55 hover:opacity-90"}`}
              >
                <span className={`font-serif text-[22px] italic leading-none ${active ? "text-brown-dark" : "text-olive"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`block text-[16px] font-bold leading-snug ${active ? "text-brown-dark" : "text-brown-dark/90"}`}>{it.who}</span>
                  <span className={`mt-1 block overflow-hidden text-[13.5px] leading-relaxed text-brown/85 transition-all duration-500 ${active ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}>{it.why}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
