"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { PAINS, SOLVE } from "@/lib/pains";
import Hl from "./Hl";

/** 스크롤하면 고민들이 하나씩 지워지고, STAR OF AI 로고와 해결 문구가 떠올라요 */
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
        // 섹션 상단이 화면 아래 90%에 닿을 때 0 → 화면 30%에 올 때 1
        const t = (vh * 0.9 - r.top) / (vh * 0.6);
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

  const ease = 1 - Math.pow(1 - p, 3);
  return (
    <section id="solve" ref={ref} className="wrap scroll-mt-20 py-20 md:py-28">
      {/* 고민들이 차례로 지워져요 */}
      <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] font-medium text-brown/85 md:text-[15px]">
        {PAINS.map((t, k) => {
          const done = ease > (k + 1) / (PAINS.length + 1);
          return (
            <li key={t} className={`strike transition-all duration-500 ${done ? "strike-on text-brown/55" : ""}`}>
              {t}
            </li>
          );
        })}
      </ul>

      <div className="mt-12 will-change-transform md:mt-16" style={{ opacity: ease, transform: `translateY(${(1 - ease) * 40}px) scale(${0.94 + ease * 0.06})` }}>
        <Logo className="mx-auto h-auto w-full max-w-[220px] md:max-w-[340px]" />
      </div>
      <div className={`mt-8 text-center md:mt-10 ${ease > 0.6 ? "in" : ""}`} style={{ opacity: Math.max(0, (ease - 0.35) / 0.65), transform: `translateY(${(1 - ease) * 24}px)` }}>
        <h2 className="glow-text font-kserif text-[28px] font-bold leading-[1.25] text-brown-dark md:text-[46px]">{SOLVE.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-brown/90 md:text-[19px]">
          <Hl>AI 강의부터 AX 컨설팅까지</Hl>, AI를 활용한 자동화를 <Hl delay={350}>쉽고 체계적으로</Hl> 구축해드려요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="#services" className="btn-primary">세 가지 방법 보기</Link>
          <Link href="#coffee-chat" className="btn-ghost">무료 커피챗</Link>
        </div>
      </div>
    </section>
  );
}
