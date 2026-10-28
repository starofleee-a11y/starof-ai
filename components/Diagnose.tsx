"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { PAINS } from "@/lib/pains";

export const DIAG_KEY = "starofai.diagnosis";

/** 히어로의 자동화 진단 — 업무 한 줄 → (모달) 성함·메일 → /diagnosis 답변 페이지 */
export default function Diagnose() {
  const router = useRouter();
  const [i, setI] = useState(0);
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [msg, setMsg] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  // 안내 문구가 고객의 고민으로 돌아가며 바뀌어요
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % PAINS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    nameRef.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  function ask(e: React.FormEvent) {
    e.preventDefault();
    if (task.trim().length < 5) {
      setMsg("자동화하고 싶은 업무를 한 줄만 더 적어주세요.");
      return;
    }
    setMsg("");
    setOpen(true);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    const body = { task, name: f.get("name"), email: f.get("email") };
    const res = await fetch("/api/diagnose", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) {
      try {
        sessionStorage.setItem(DIAG_KEY, JSON.stringify({ ...data, task, name: body.name, at: Date.now() }));
      } catch {}
      router.push("/diagnosis");
    } else {
      setState("error");
      setMsg(data.error || "잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <>
      <form onSubmit={ask} className="max-w-2xl">
        <h2 className="break-keep text-[20px] font-bold leading-[1.35] text-brown-dark md:text-[26px]">어떤 업무를 자동화하고 싶으세요?</h2>
        <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-brown/85 md:text-[16px]">가능한지, 어떻게 하는지, 어떤 플랜이 맞는지 바로 답해드려요.</p>
        <div className="linefield mt-7">
          <input value={task} onChange={(e) => setTask(e.target.value)} placeholder={`예) ${PAINS[i]}`} autoComplete="off" aria-label="자동화하고 싶은 업무" />
          <button type="submit" className="arrowbtn" aria-label="진단 받기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </button>
        </div>
        {msg && !open && <p className="mt-3 text-[13px] font-medium text-[#B04A1A]">{msg}</p>}
      </form>

      {open && createPortal(
        <div className="fixed inset-0 z-[60] grid place-items-center bg-brown-dark/45 p-5 backdrop-blur-sm" onClick={() => state !== "sending" && setOpen(false)} role="dialog" aria-modal="true" aria-labelledby="diag-title">
          <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="glass-card w-full max-w-md !bg-white/85 text-left shadow-2xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-olive">Star of AI 진단</p>
            <h3 id="diag-title" className="mt-2 text-[20px] font-bold leading-snug text-brown-dark">답변을 어디로 보내드릴까요?</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-brown/85">화면에서 바로 보여드리고, 같은 내용을 메일로도 보내드려요.</p>
            <p className="mt-4 rounded-xl bg-paper px-4 py-3 text-[13.5px] text-brown-dark">“{task}”</p>
            <div className="mt-4 space-y-3">
              <input ref={nameRef} name="name" required placeholder="성함" className="field" />
              <input name="email" type="email" required placeholder="메일" className="field" />
            </div>
            {msg && <p className="mt-3 text-[13px] font-medium text-[#B04A1A]">{msg}</p>}
            <div className="mt-5 flex gap-2">
              <button type="submit" disabled={state === "sending"} className="btn-primary flex-1 disabled:opacity-60">
                {state === "sending" ? "진단 중…" : "진단 받기"}
              </button>
              <button type="button" onClick={() => setOpen(false)} disabled={state === "sending"} className="btn-ghost">닫기</button>
            </div>
          </form>
        </div>,
        document.body
      )}
    </>
  );
}
