"use client";
import { useEffect, useState } from "react";

/** 한참 내려가면 오른쪽 아래에 뜨는 ‘위로’ 버튼 */
export default function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      type="button"
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-white/80 text-brown shadow-[0_12px_30px_-12px_rgba(97,66,21,.5)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:bg-white md:bottom-8 md:right-8 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
