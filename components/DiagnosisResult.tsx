"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DIAG_KEY } from "./Diagnose";

type Result = {
  task: string;
  name?: string;
  feasible: "yes" | "partial" | "consult";
  headline: string;
  how: string[];
  plan: "study" | "consulting" | "enterprise";
  reason: string;
  product: { name: string; href: string; cta: string; priceLabel: string; audience: string };
};

const BADGE = { yes: ["가능해요", "bg-[#E3F3E6] text-[#1F6B3A]"], partial: ["일부 가능해요", "bg-butter-pale text-brown"], consult: ["상담이 필요해요", "bg-paper text-brown"] } as const;
const PLAN_HREF = { study: "/study#apply", consulting: "/#coffee-chat", enterprise: "/enterprise#inquiry" } as const;

/** /diagnosis — 히어로에서 제출한 진단의 답변 페이지 */
export default function DiagnosisResult() {
  const [r, setR] = useState<Result | null | undefined>(undefined);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DIAG_KEY);
      setR(raw ? JSON.parse(raw) : null);
    } catch {
      setR(null);
    }
  }, []);

  if (r === undefined) return <div className="mx-auto h-40 max-w-2xl animate-pulse rounded-2xl bg-white/50" />;
  if (!r) {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Star of AI 진단</p>
        <h1 className="h-display mt-4 text-[28px] md:text-[40px]">진단 내용이 없어요</h1>
        <p className="mt-4 text-[16px] text-brown/85">홈 화면에서 자동화하고 싶은 업무를 적고 화살표를 눌러주세요.</p>
        <Link href="/" className="btn-primary mt-8">홈으로</Link>
      </div>
    );
  }
  const [label, cls] = BADGE[r.feasible];
  return (
    <div className="mx-auto max-w-2xl">
      <p className="eyebrow">Star of AI 진단{r.name ? ` · ${r.name}님` : ""}</p>
      <p className="mt-4 rounded-xl border border-brown/10 bg-white/70 px-4 py-3 text-[14.5px] text-brown-dark">“{r.task}”</p>
      <div className="glass-card mt-6 !p-7 md:!p-9">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${cls}`}>{label}</span>
        </div>
        <h1 className="mt-4 break-keep text-[24px] font-bold leading-[1.3] text-brown-dark md:text-[32px]">{r.headline}</h1>
        <ol className="mt-6 space-y-3 text-[15px] text-brown-dark md:text-[16px]">
          {r.how.map((h, k) => (
            <li key={k} className="flex gap-3">
              <span className="font-serif font-bold text-olive">0{k + 1}</span>
              <span>{h}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4 rounded-2xl bg-brown-dark p-7 text-butter-pale md:p-9">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-butter/80">추천 플랜 · {r.product.audience}</p>
        <p className="mt-2 text-[22px] font-bold text-butter md:text-[26px]">
          {r.product.name} <span className="ml-2 font-serif text-[18px] font-semibold text-butter-pale/90">{r.product.priceLabel}</span>
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-butter-pale/90">{r.reason}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={PLAN_HREF[r.plan]} className="btn-yellow">{r.product.cta}</Link>
          <Link href={r.product.href} className="btn border border-butter/40 text-butter hover:bg-white/10">플랜 자세히 보기</Link>
        </div>
      </div>
      <p className="mt-5 text-[13px] text-brown/75">같은 내용을 메일로도 보내드려요. 더 자세한 상담은 <Link href="/#coffee-chat" className="font-semibold text-brown underline underline-offset-4">무료 커피챗</Link>에서.</p>
    </div>
  );
}
