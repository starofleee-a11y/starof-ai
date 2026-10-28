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

/** 히어로의 자동화 진단 폼 — 업무·성함·메일 → 가능 여부·방법·추천 플랜 → 바로 플랜으로 */
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
      <div className="glass-card max-w-2xl" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${cls}`}>{label}</span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-olive">Star of AI 진단</span>
        </div>
        <p className="mt-3 text-[18px] font-bold leading-snug text-brown-dark md:text-[20px]">{r.headline}</p>
        <ol className="mt-4 space-y-2 text-[14.5px] text-brown/80">
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
          <p className="mt-1 text-[13.5px] text-brown/70">{r.reason}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href={PLAN_HREF[r.plan]} className="btn-primary !py-3 !text-[14px]">{r.product.cta}</Link>
            <Link href={r.product.href} className="btn-glass !py-3 !text-[14px]">플랜 자세히 보기</Link>
          </div>
        </div>
        <p className="mt-4 text-[12px] text-brown/50">진단 내용은 메일로도 보내드려요. 더 자세한 상담은 무료 커피챗에서.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass-card max-w-2xl">
      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-olive">자동화 진단 · 30초</p>
      <p className="mt-2 text-[16px] font-semibold text-brown-dark md:text-[17px]">어떤 업무를 자동화하고 싶으세요? 가능한지, 어떻게 하는지, 어떤 플랜이 맞는지 바로 답해드려요.</p>
      <textarea name="task" required minLength={5} rows={3} placeholder={`예) ${PAINS[i]}`} className="field mt-4 resize-none !bg-white/70" />
      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1.4fr_auto]">
        <input name="name" required placeholder="성함" className="field !bg-white/70" />
        <input name="email" type="email" required placeholder="메일" className="field !bg-white/70" />
        <button type="submit" disabled={state === "sending"} className="btn-primary !py-3 disabled:opacity-60">
          {state === "sending" ? "진단 중…" : "진단 받기"}
        </button>
      </div>
      {msg && <p className="mt-2 text-[13px] text-[#B04A1A]">{msg}</p>}
      <p className="mt-3 text-[12px] text-brown/50">제출하면 Star of AI가 바로 답하고, 같은 내용을 메일로도 보내드려요.</p>
    </form>
  );
}
