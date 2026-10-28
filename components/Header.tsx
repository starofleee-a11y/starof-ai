"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/lib/site";

export default function Header() {
  const path = usePathname();
  const home = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [past, setPast] = useState(false); // 메인에서 히어로를 지나면 로고 표시
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 12);
      setPast(window.scrollY > window.innerHeight * 0.55);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const showLogo = !home || past || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "bg-cream/75 shadow-[0_1px_0_rgba(97,66,21,.08)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className={`wrap flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <Link
          href="/"
          aria-label="Star of AI 홈"
          className={`group shrink-0 transition-all duration-700 ${showLogo ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
        >
          <Logo className={`w-auto transition-all duration-500 group-hover:opacity-80 ${scrolled ? "h-[22px]" : "h-[26px]"}`} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors ${
                  active ? "text-brown-dark" : "text-brown/70 hover:text-brown-dark"
                }`}
              >
                {active && <span className="absolute inset-0 -z-10 rounded-full bg-butter/70" />}
                {n.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-primary ml-3 !px-5 !py-2.5 !text-[14px]">
            직접 문의하기
          </Link>
        </nav>

        <button className="relative h-10 w-10 md:hidden" aria-label="메뉴 열기" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className={`absolute left-2 right-2 h-[2px] rounded bg-brown transition-all ${open ? "top-[19px] rotate-45" : "top-[14px]"}`} />
          <span className={`absolute left-2 right-2 h-[2px] rounded bg-brown transition-all ${open ? "top-[19px] -rotate-45" : "top-[24px]"}`} />
        </button>
      </div>

      <div className={`overflow-hidden transition-[max-height] duration-500 md:hidden ${open ? "max-h-96" : "max-h-0"}`}>
        <nav className="wrap flex flex-col gap-1 pb-6">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="flex items-baseline justify-between border-b border-brown/10 py-4 text-[17px] font-semibold text-brown-dark">
              {n.label}
              <span className="font-serif text-sm italic text-olive">{n.en}</span>
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-4">직접 문의하기</Link>
        </nav>
      </div>
    </header>
  );
}
