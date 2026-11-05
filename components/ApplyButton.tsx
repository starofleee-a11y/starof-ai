"use client";
import { openApply, type ApplyKind } from "@/lib/apply";

/** 누르면 신청 팝업이 열리는 버튼. className으로 btn-primary 등 모양을 정해요. */
export default function ApplyButton({ kind, className = "btn-primary", children }: { kind: ApplyKind; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => openApply(kind)} className={className}>
      {children}
    </button>
  );
}
