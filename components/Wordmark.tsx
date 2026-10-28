"use client";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

/** 스크롤에 따라 STAR OF AI 로고가 서서히 떠오르는 구간 */
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
        // 섹션 상단이 화면 아래 85%에 닿을 때 0 → 화면 중앙 35%에 올 때 1
        const t = (vh * 0.85 - r.top) / (vh * 0.5);
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
    <section ref={ref} className="wrap py-16 md:py-24">
      <div style={{ opacity: ease, transform: `translateY(${(1 - ease) * 40}px) scale(${0.94 + ease * 0.06})` }} className="will-change-transform">
        <Logo className="h-auto w-full" />
      </div>
      <p style={{ opacity: ease }} className="mt-6 flex flex-wrap justify-between gap-2 text-[12px] font-medium uppercase tracking-[0.25em] text-olive md:text-[13px]">
        <span>AX Consulting · AI Builder · AI Lecture</span>
        <span>Seoul, Korea</span>
      </p>
    </section>
  );
}
