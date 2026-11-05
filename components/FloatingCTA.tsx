"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { openApply, APPLY_STATE, type ApplyKind } from "@/lib/apply";

/**
 * 페이지 아래에 떠 있는 신청 버튼. 조금 내려오면 나타나고, 팝업이 열려 있는 동안엔 숨어요.
 * primary = 신청 팝업, secondary = 링크(무료 교안 등)
 */
export default function FloatingCTA({
  kind,
  primary,
  secondary,
  note,
}: {
  kind: ApplyKind;
  primary: string;
  secondary?: { label: string; href: string };
  note?: string; // 왼쪽 작은 글씨 (가격 등)
}) {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 240);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const st = (e: Event) => setModal(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener(APPLY_STATE, st);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener(APPLY_STATE, st);
    };
  }, []);
  const visible = show && !modal;
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-all duration-500 sm:bottom-5 sm:pb-0 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"}`}>
      <div className="mx-auto flex max-w-[640px] items-center gap-2 rounded-[22px] border border-brown/30 bg-brown-dark/95 p-2 pl-2 shadow-[0_24px_60px_-20px_rgba(46,31,8,.75)] backdrop-blur-xl sm:rounded-full sm:pl-5">
        {note && <p className="hidden shrink-0 text-[13px] font-semibold text-butter-pale/85 sm:block">{note}</p>}
        <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-2 sm:flex sm:justify-end">
          <button type="button" onClick={() => openApply(kind)} className="btn-yellow relative whitespace-nowrap !px-4 !py-3.5 text-[15px] font-bold shadow-[0_0_0_0_rgba(255,235,81,.6)] animate-[cta-pulse_2.4s_ease-out_infinite] sm:!px-7">
            {primary}
          </button>
          {secondary && (
            <Link href={secondary.href} className="btn whitespace-nowrap !px-3 !py-3.5 border border-butter/40 text-[13.5px] font-semibold text-butter hover:bg-butter/15 sm:!px-5 sm:text-[14.5px]">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
