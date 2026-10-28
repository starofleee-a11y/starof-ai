"use client";
import { useState } from "react";

export const INQUIRY_TYPES = ["기업 AI 원데이 강의", "기업 AX 컨설팅", "기업 맞춤 SaaS 개발", "기타 문의"];
const SIZES = ["1~10명", "11~50명", "51~200명", "200명 이상"];

export default function InquiryForm({ defaultType = INQUIRY_TYPES[0], compact = false }: { defaultType?: string; compact?: boolean }) {
  const [type, setType] = useState(defaultType);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("sending");
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, type }),
    }).catch(() => null);
    if (res?.ok) setState("done");
    else {
      const d = res ? await res.json().catch(() => ({})) : {};
      setErr(d.error || "전송에 실패했어요. starofleee@gmail.com 으로 메일 주셔도 좋아요.");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="card p-10">
        <p className="eyebrow">Received</p>
        <p className="mt-3 text-[22px] font-bold text-brown-dark">문의가 접수됐어요.</p>
        <p className="mt-2 text-[15px] text-brown/85">영업일 기준 1일 안에 남겨주신 메일로 회신드릴게요.</p>
      </div>
    );

  return (
    <form onSubmit={submit} className={`card grid gap-5 ${compact ? "p-6" : "p-6 md:p-9"}`}>
      <div>
        <span className="label">문의 유형</span>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {INQUIRY_TYPES.map((t) => (
            <button type="button" key={t} onClick={() => setType(t)} className={`pick !px-2 text-[13px] ${t === type ? "pick-on" : ""}`}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="q-company">회사·기관명</label>
          <input id="q-company" name="company" className="field" placeholder="(주)스타오브에이아이" />
        </div>
        <div>
          <label className="label" htmlFor="q-size">교육·적용 대상 인원</label>
          <select id="q-size" name="size" className="field" defaultValue="">
            <option value="" disabled>선택해 주세요</option>
            {SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="q-name">담당자 성함 · 직함</label>
          <input id="q-name" name="name" required className="field" placeholder="홍길동 팀장" />
        </div>
        <div>
          <label className="label" htmlFor="q-phone">연락처</label>
          <input id="q-phone" name="phone" className="field" placeholder="010-0000-0000" />
        </div>
        <div className="md:col-span-2">
          <label className="label" htmlFor="q-email">메일</label>
          <input id="q-email" name="email" type="email" required className="field" placeholder="you@company.com" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="q-message">의뢰 내용</label>
        <textarea
          id="q-message"
          name="message"
          required
          rows={5}
          className="field resize-none"
          placeholder="희망 일정, 교육 대상, 자동화하고 싶은 업무, 예산 범위 등을 알려주시면 더 정확한 제안을 드릴 수 있어요."
        />
      </div>
      {state === "error" && <p className="text-[14px] font-medium text-[#B04A1A]">{err}</p>}
      <button disabled={state === "sending"} className="btn-primary w-full !py-4 text-[16px] disabled:opacity-60">
        {state === "sending" ? "보내는 중…" : "문의 보내기"}
      </button>
      <p className="-mt-1 text-center text-[12px] text-brown/65">남겨주신 정보는 회신 목적으로만 사용해요.</p>
    </form>
  );
}
