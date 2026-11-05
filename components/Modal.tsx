"use client";
import { useEffect } from "react";

/** 화면 가운데 뜨는 팝업. 모바일에선 아래에서 올라오는 시트 형태예요. */
export default function Modal({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={label}>
      <div className="absolute inset-0 bg-brown-dark/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[92dvh] w-full max-w-[680px] overflow-y-auto rounded-t-[28px] bg-cream shadow-[0_40px_90px_-30px_rgba(46,31,8,.7)] sm:rounded-[28px] animate-[fadeUp_.35s_ease]">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brown shadow-sm transition hover:bg-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <div className="p-5 pt-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
