"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

/** 메인 히어로 — 노란 빛이 글라스 뒤에서 천천히 움직이고, 마우스를 따라 살짝 기웁니다. */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const on = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.querySelectorAll<HTMLElement>(".blob").forEach((b, i) => {
          const k = [38, -26, 20][i] ?? 20;
          b.style.setProperty("--px", String(x * k));
          b.style.setProperty("--py", String(y * k));
        });
      });
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => {
      window.removeEventListener("pointermove", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div ref={ref} className="hero-bg" aria-hidden>
        <span className="blob blob-1" />
        <span className="blob blob-2" />
        <span className="blob blob-3" />
        <span className="glass" />
      </div>

      <div className="wrap relative pb-24 pt-32 md:pt-36">
        <p className="eyebrow animate-[fadeUp_.8s_cubic-bezier(.2,.7,.2,1)_both]">AX Agency · Star of AI</p>
        <h1 className="glow-text mt-6 max-w-4xl font-kserif text-[40px] font-bold leading-[1.15] tracking-[-0.02em] animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.1s_both] md:text-[76px]">
          AI 얼리어답터가
          <br />
          되는 지름길
        </h1>
        <p className="mt-7 max-w-2xl text-[17px] leading-[1.7] text-brown/85 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.25s_both] md:text-[20px]">
          나의 업무가 자동으로 굴러갈 수 있도록,
          <br className="hidden md:block" />
          시간과 돈이 벌리는 시스템을 설계해드립니다.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.4s_both]">
          <Link href="#coffee-chat" className="btn-primary">무료 커피챗 예약</Link>
          <Link href="#services" className="btn-ghost !bg-white/40 backdrop-blur-sm">서비스 보기</Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.3em] text-brown/50">
        Scroll
      </div>
    </section>
  );
}
