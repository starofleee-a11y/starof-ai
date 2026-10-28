"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PAINS } from "@/lib/pains";

type Result = {
  feasible: "yes" | "partial" | "consult";
  headline: string;
  how: string[];
  plan: "study" | "consulting" | "enterprise";
  reason: string;
  product: { name: string; href: string; cta: string; priceLabel: string; audience: string };
};

const BADGE = { yes: ["가능해요", "bg-[#E3F3E6] text-[#1F6B3A]"], partial: ["일부 가능해요", "bg-butter-pale text-brown"], consult: ["상담이 필요해요", "bg-paper text-brown"] } as const;
const PLAN_HREF = { study: "/study#apply", consulting: "/#coffee-chat", enterprise: "/enterprise#inquiry" } as const;

/** 히어로의 자동화 진단 — 검색창처럼 생긴 폼. 업무·성함·메일 → 가능 여부·방법·추천 플랜 → 바로 플랜으로 */
export default function Diagnose() {
  const [i, setI] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [r, setR] = useState<Result | null>(null);

  // 입력창 안내 문구가 고객의 고민으로 돌아가며 바뀌어요
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % PAINS.length), 2800);
    return () => clearInterval(t);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    setMsg("");
    const res = await fetch("/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: f.get("task"), name: f.get("name"), email: f.get("email") }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) {
      setR(data);
      setState("done");
    } else {
      setState("error");
      setMsg(data.error || "잠시 후 다시 시도해 주세요.");
    }
  }

  if (state === "done" && r) {
    const [label, cls] = BADGE[r.feasible];
    return (
      <div className="glass-card mx-auto max-w-2xl text-left" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${cls}`}>{label}</span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-olive">Star of AI 진단</span>
        </div>
        <p className="mt-3 text-[18px] font-bold leading-snug text-brown-dark md:text-[20px]">{r.headline}</p>
        <ol className="mt-4 space-y-2 text-[14.5px] text-brown/90">
          {r.how.map((h, k) => (
            <li key={k} className="flex gap-3">
              <span className="font-serif italic text-olive">0{k + 1}</span>
              <span>{h}</span>
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-xl border border-white/70 bg-white/60 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-olive">추천 플랜 · {r.product.audience}</p>
          <p className="mt-1 text-[16px] font-bold text-brown-dark">
            {r.product.name} <span className="ml-1 font-serif text-[15px] font-semibold text-brown">{r.product.priceLabel}</span>
          </p>
          <p className="mt-1 text-[13.5px] text-brown/85">{r.reason}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={PLAN_HREF[r.plan]} className="btn-primary !py-3 !text-[14px]">{r.product.cta}</Link>
            <Link href={r.product.href} className="btn-glass !py-3 !text-[14px]">플랜 자세히 보기</Link>
          </div>
        </div>
        <p className="mt-4 text-[12px] text-brown/65">진단 내용은 메일로도 보내드려요. 더 자세한 상담은 무료 커피챗에서.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-olive">자동화 진단 · 30초</p>
      <h2 className="mt-3 break-keep font-kserif text-[24px] font-bold leading-[1.3] text-brown-dark md:text-[34px]">어떤 업무를 자동화하고 싶으세요?</h2>
      <p className="mx-auto mt-3 max-w-xl text-[15.5px] leading-relaxed text-brown/85 md:text-[18px]">
        <b className="font-bold text-brown-dark">가능한지, 어떻게 하는지, 어떤 플랜이 맞는지</b> 바로 답해드려요.
      </p>

      {/* 검색창 */}
      <div className="searchbar mt-7">
        <svg className="ml-5 hidden shrink-0 text-brown/75 sm:block" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input name="task" required minLength={5} placeholder={`예) ${PAINS[i]}`} autoComplete="off" className="min-w-0 flex-1 bg-transparent px-4 py-4 text-[16px] text-brown-dark outline-none placeholder:text-brown/65 md:text-[17px]" />
        <button type="submit" disabled={state === "sending"} className="btn-primary m-1.5 shrink-0 !rounded-full !px-5 !py-3 !text-[14.5px] disabled:opacity-60 md:!px-6">
          {state === "sending" ? "진단 중…" : "진단 받기"}
        </button>
      </div>
      <div className="mx-auto mt-3 grid max-w-xl grid-cols-2 gap-2">
        <input name="name" required placeholder="성함" className="field !rounded-full !bg-white/80 !py-3 text-center" />
        <input name="email" type="email" required placeholder="메일" className="field !rounded-full !bg-white/80 !py-3 text-center" />
      </div>
      {msg && <p className="mt-2 text-[13px] font-medium text-[#B04A1A]">{msg}</p>}
      <p className="mt-3 text-[12.5px] text-brown/65">제출하면 Star of AI가 바로 답하고, 같은 내용을 메일로도 보내드려요.</p>
    </form>
  );
}
