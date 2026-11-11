"use client";
import { useEffect, useRef } from "react";
import GlassBg from "./GlassBg";
import Link from "next/link";
import PainMarquee from "./PainMarquee";

/** 메인 히어로. 빛이 글라스 뒤에서 움직이고, 무료 커피챗 신청 버튼과 고민 말풍선이 있어요. */
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
        <h1 className="glow-text max-w-5xl break-keep font-kserif text-[36px] font-bold leading-[1.15] tracking-[-0.02em] animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.1s_both] md:text-[84px]">
          콘텐츠 제작
          <br />
          <span className="catch">99% 자동화</span>
          <span className="text-[0.55em] font-semibold text-brown/90">하는 법을 알려드립니다.</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[17px] leading-[1.7] text-brown/90 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.25s_both] md:text-[21px]">
          마케팅 담당자 혹은 1인 사업가를 위한{" "}
          <br className="hidden md:block" />
          <b className="font-bold text-brown-dark">최적의 마케팅 자동화 프로세스</b>를 구축해드립니다.
        </p>

        {/* 바로 무료 커피챗 신청으로 — 아래 커피챗 예약 섹션으로 이동해요 */}
        <div className="mt-12 flex flex-wrap items-center gap-4 animate-[fadeUp_.9s_cubic-bezier(.2,.7,.2,1)_.4s_both]">
          <Link href="#coffee-chat" className="btn-primary">무료 커피챗 신청</Link>
          <span className="text-[14px] text-brown/75">온라인 30분 · 무료</span>
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
