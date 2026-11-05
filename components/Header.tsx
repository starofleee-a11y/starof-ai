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
  const isActive = (href?: string) => !!href && path.startsWith(href);

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
            const pill = "relative rounded-full px-4 py-2 text-[14.5px] font-medium transition-colors";
            if (n.children) {
              const active = n.children.some((c) => isActive(c.href));
              return (
                // 마우스를 올리거나 키보드로 포커스하면 아래로 펼쳐지는 드롭다운
                <div key={n.label} className="group relative">
                  <button type="button" className={`${pill} flex items-center gap-1 ${active ? "text-brown-dark" : "text-brown/85 hover:text-brown-dark"}`} aria-haspopup="menu">
                    {active && <span className="absolute inset-0 -z-10 rounded-full bg-butter/70" />}
                    {n.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="w-[300px] rounded-2xl border border-brown/10 bg-cream/95 p-2 shadow-[0_24px_60px_-24px_rgba(61,42,12,.45)] backdrop-blur-xl">
                      {n.children.map((c) => {
                        const on = isActive(c.href);
                        return (
                          <Link key={c.href} href={c.href} className={`block rounded-xl px-4 py-3 transition-colors hover:bg-butter/60 ${on ? "bg-butter/70" : ""}`}>
                            <span className="flex items-baseline justify-between gap-3">
                              <span className="text-[15px] font-bold text-brown-dark">{c.label}</span>
                              <span className="font-serif text-[13px] italic text-olive">{c.en}</span>
                            </span>
                            {c.desc && <span className="mt-0.5 block text-[12.5px] leading-snug text-brown/70">{c.desc}</span>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
            const active = isActive(n.href);
            return (
              <Link key={n.href} href={n.href!} className={`${pill} ${active ? "text-brown-dark" : "text-brown/85 hover:text-brown-dark"}`}>
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

      <div className={`overflow-hidden transition-[max-height] duration-500 md:hidden ${open ? "max-h-[32rem]" : "max-h-0"}`}>
        <nav className="wrap flex flex-col gap-1 pb-6">
          {NAV.map((n) =>
            n.children ? (
              <div key={n.label} className="border-b border-brown/10 py-4">
                <p className="flex items-baseline justify-between text-[13px] font-bold uppercase tracking-[0.18em] text-brown/70">
                  {n.label}
                  <span className="font-serif text-sm normal-case italic tracking-normal text-olive">{n.en}</span>
                </p>
                <div className="mt-2 flex flex-col">
                  {n.children.map((c) => (
                    <Link key={c.href} href={c.href} className="flex items-baseline justify-between py-2.5 pl-3 text-[17px] font-semibold text-brown-dark">
                      {c.label}
                      <span className="font-serif text-sm italic text-olive">{c.en}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href!} className="flex items-baseline justify-between border-b border-brown/10 py-4 text-[17px] font-semibold text-brown-dark">
                {n.label}
                <span className="font-serif text-sm italic text-olive">{n.en}</span>
              </Link>
            )
          )}
          <Link href="/contact" className="btn-primary mt-4">직접 문의하기</Link>
        </nav>
      </div>
    </header>
  );
}
