"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PAINS, SOLVE } from "@/lib/pains";
import Hl from "./Hl";

/** 고민들이 크게 보이다가 스크롤하면 하나씩 지워져 사라지고, 해결 문구가 떠올라요 */
export default function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 섹션이 화면에 고정된 채로 스크롤한 거리 → 0~1
        const t = -r.top / Math.max(1, r.height - vh);
        setP(Math.max(0, Math.min(1, t)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="solve" ref={ref} className="relative min-h-[190vh] scroll-mt-20">
      <div className="wrap sticky top-[14vh] md:top-[16vh]">
      {/* 고민들이 크게 보이다가, 스크롤하면 하나씩 취소선이 그어지고 사라져요 */}
      <ul className={`painlist mx-auto mb-10 flex max-w-3xl flex-col items-center gap-3 text-center md:mb-14 md:gap-4 ${p > 0.72 ? "painlist-gone" : ""}`}>
        {PAINS.map((t, k) => {
          const th = 0.06 + (k / PAINS.length) * 0.5;
          const strike = p > th;
          const gone = p > th + 0.07;
          return (
            <li key={t} className={`pain break-keep text-[20px] font-semibold text-brown-dark md:text-[32px] ${strike ? "pain-strike text-brown/60" : ""} ${gone ? "pain-gone" : ""}`}>
              {t}
            </li>
          );
        })}
      </ul>

      <div className={`mt-8 text-center md:mt-10 ${p > 0.78 ? "in" : ""}`} style={{ opacity: Math.max(0, Math.min(1, (p - 0.62) / 0.2)), transform: `translateY(${Math.max(0, 1 - (p - 0.62) / 0.2) * 24}px)` }}>
        <h2 className="glow-text font-kserif text-[28px] font-bold leading-[1.25] text-brown-dark md:text-[46px]">{SOLVE.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-brown/90 md:text-[19px]">
          <Hl>AI 강의부터 AX 컨설팅까지</Hl>, AI를 활용한 자동화를 <Hl delay={350}>쉽고 체계적으로</Hl> 구축해드려요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="#services" className="btn-primary">세 가지 방법 보기</Link>
          <Link href="#coffee-chat" className="btn-ghost">무료 커피챗</Link>
        </div>
      </div>
      </div>
    </section>
  );
}
