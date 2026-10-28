"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PAINS, SOLVE } from "@/lib/pains";
import Hl from "./Hl";

/** 고민들이 크게 보이고, 스크롤하면 하나씩 취소선이 그어지며 해결 문구가 떠올라요 */
export default function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0); // 취소선이 그어진 고민 개수
  const [typed, setTyped] = useState(0); // 지금까지 타이핑된 글자 수 (전체 기준)
  const total = PAINS.reduce((a, t) => a + t.length, 0);

  // 섹션이 보이기 시작하면 고민들이 한 글자씩 타이핑돼요
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(total);
      return;
    }
    let timer = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const tick = () => {
        setTyped((v) => {
          if (v >= total) return v;
          timer = window.setTimeout(tick, 28);
          return v + 1;
        });
      };
      tick();
    }, { threshold: 0.2 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [total]);

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

  // 타이핑이 다 끝난 뒤에야 취소선이 그어져요
  const typedAll = typed >= total;
  const ease = typedAll ? n / PAINS.length : 0;
  return (
    <section id="solve" ref={ref} className="wrap scroll-mt-20 py-20 md:py-28">
      {/* 고민들이 차례로 지워져요 */}
      <ul className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center text-[20px] font-semibold text-brown-dark md:gap-4 md:text-[30px]">
        {PAINS.map((t, k) => {
          const done = typedAll && k < n;
          const before = PAINS.slice(0, k).reduce((a, x) => a + x.length, 0);
          const shown = Math.max(0, Math.min(t.length, typed - before));
          const typing = typed < total && shown > 0 && shown < t.length;
          const started = shown > 0;
          return (
            <li key={t} className={`strike break-keep transition-all duration-500 ${done ? "strike-on text-brown/45" : ""} ${started ? "" : "opacity-0"}`}>
              {t.slice(0, shown)}
              {typing && <span className="caret" aria-hidden />}
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
