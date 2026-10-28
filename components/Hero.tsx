"use client";
import { useEffect, useRef } from "react";
import GlassBg from "./GlassBg";
import Diagnose from "./Diagnose";
import PainMarquee from "./PainMarquee";

/** 메인 히어로 — 중앙 정렬. 빛이 글라스 뒤에서 움직이고, 검색창처럼 생긴 진단 폼과 고민 말풍선이 있어요. */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  // 마우스를 따라 빛이 살짝 기울어요
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.querySelectorAll<HTMLElement>(".blob").forEach((b, k) => {
          const f = [38, -26, 20][k] ?? 20;
          b.style.setProperty("--px", String(x * f));
          b.style.setProperty("--py", String(y * f));
        });
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div ref={ref} className="absolute inset-0">
        <GlassBg />
      </div>

      <div className="wrap relative pb-24 pt-32 md:pt-36">
        <h1 className="glow-text max-w-4xl break-keep font-kserif text-[36px] font-bold leading-[1.15] tracking-[-0.02em] animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.1s_both] md:text-[84px]">
          AI 얼리어답터가 되는
          <br />
          <span className="catch">지름길</span>
          <span className="text-[0.55em] font-semibold text-brown/90">로 안내합니다.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[17px] leading-[1.7] text-brown/90 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.25s_both] md:text-[21px]">
          나의 업무가 자동으로 굴러갈 수 있도록,
          <br className="hidden md:block" />
          <b className="font-bold text-brown-dark">시간과 돈이 벌리는 시스템</b>을 설계해드립니다.
        </p>

        {/* 자동화 진단 — 검색창처럼. 업무·성함·메일을 적으면 가능 여부·방법·플랜을 바로 답해요 */}
        <div className="mt-12 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.4s_both]">
          <Diagnose />
        </div>

        {/* 고객의 고민 — 말풍선이 가로로 흘러요 */}
        <div className="mt-12 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.55s_both]">
          <PainMarquee />
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.3em] text-brown/65">
        Scroll
      </div>
    </section>
  );
}
