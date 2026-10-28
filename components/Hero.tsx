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

      <div className="wrap relative pb-24 pt-32 text-center md:pt-40">
        <h1 className="glow-text mx-auto max-w-5xl break-keep font-kserif text-[30px] font-bold leading-[1.25] tracking-[-0.03em] animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.1s_both] md:text-[52px] md:leading-[1.2] lg:text-[56px]">
          나의 업무가 자동으로 굴러갈 수 있도록,
          <br />
          <span className="catch">시간과 돈이 벌리는 시스템</span>을 설계해드립니다.
        </h1>

        {/* 자동화 진단 — 밑줄 한 줄과 화살표. 성함·메일은 모달에서 받고, 답변 페이지로 이동해요 */}
        <div className="mt-14 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.35s_both] md:mt-20">
          <Diagnose />
        </div>

        {/* 고객의 고민 — 말풍선이 가로로 흘러요 */}
        <div className="mt-14 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.55s_both] md:mt-20">
          <PainMarquee />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.3em] text-brown/65">
        Scroll
      </div>
    </section>
  );
}
