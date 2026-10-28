"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PAINS, SOLVE } from "@/lib/pains";
import Hl from "./Hl";

/** 고민들이 크게 보이고, 스크롤하면 하나씩 취소선이 그어지며 해결 문구가 떠올라요 */
export default function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0); // 취소선이 그어진 고민 개수

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = window.innerHeight * 0.62; // 이 선을 지나 올라오는 고민부터 하나씩 지워져요
        let c = 0;
        el.querySelectorAll("li").forEach((li) => {
          if (li.getBoundingClientRect().top < line) c += 1;
        });
        setN(c);
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

  const ease = n / PAINS.length;
  return (
    <section id="solve" ref={ref} className="wrap scroll-mt-20 py-20 md:py-28">
      {/* 고민들이 차례로 지워져요 */}
      <ul className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center text-[20px] font-semibold text-brown-dark md:gap-4 md:text-[30px]">
        {PAINS.map((t, k) => {
          const done = k < n;
          return (
            <li key={t} className={`strike break-keep transition-all duration-500 ${done ? "strike-on text-brown/45" : ""}`}>
              {t}
            </li>
          );
        })}
      </ul>

      <div className={`mt-12 text-center md:mt-16 ${ease >= 1 ? "in" : ""}`} style={{ opacity: Math.max(0.15, (ease - 0.5) / 0.5), transform: `translateY(${(1 - ease) * 24}px)`, transition: "opacity .5s, transform .5s" }}>
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
