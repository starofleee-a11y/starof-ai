"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

/** 상세 페이지 하단에 따라다니는 결제/문의 바 */
export default function StickyBar({ title, price, href, cta }: { title: string; price: string; href: string; cta: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > 600 && !nearEnd);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-4 z-40 px-4 transition-all duration-500 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}>
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 rounded-full border border-brown/10 bg-white/90 py-2 pl-6 pr-2 shadow-[0_20px_50px_-20px_rgba(61,42,12,.5)] backdrop-blur-xl">
        <div className="min-w-0">
          <p className="truncate text-[13px] text-brown/75">{title}</p>
          <p className="font-serif text-[20px] font-semibold leading-tight text-brown">{price}</p>
        </div>
        <Link href={href} className="btn-primary shrink-0 !py-3">
          {cta}
        </Link>
      </div>
    </div>
  );
}
