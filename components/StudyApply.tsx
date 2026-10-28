"use client";
import { useState } from "react";
import Link from "next/link";
import { STUDY } from "@/lib/study";
import { won } from "@/lib/products";

const BANK = process.env.NEXT_PUBLIC_BANK_ACCOUNT; // 예: "카카오뱅크 3333-00-0000000 이경서"

/** 스터디 신청서 → 접수 후 결제 안내 */
export default function StudyApply() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        job: fd.get("job"),
        topic: fd.get("topic"),
        pro: fd.get("pro") === "on",
        schedule: fd.get("schedule") === "on",
      }),
    }).catch(() => null);
    if (res?.ok) setState("done");
    else {
      const d = res ? await res.json().catch(() => ({})) : {};
      setErr(d.error || "전송에 실패했어요. 잠시 후 다시 시도해 주세요.");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="card p-8 md:p-10">
        <p className="eyebrow">Received</p>
        <p className="mt-3 text-[22px] font-bold text-brown-dark">신청이 접수됐어요.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-brown/85">
          선정 결과는 {STUDY.resultDate} 남겨주신 번호로 카카오톡 팀 채팅 초대와 함께 알려드려요.
          <br />
          참가비는 지금 결제하거나, 선정 안내를 받은 뒤 결제하셔도 돼요.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/checkout?product=study&qty=1" className="btn-primary !py-3.5">
            {won(STUDY.price)} 결제하기
          </Link>
          {BANK ? (
            <div className="rounded-xl bg-paper px-4 py-3 text-[13.5px] text-brown/90">
              <p className="font-semibold text-brown-dark">계좌이체</p>
              <p>{BANK}</p>
            </div>
          ) : (
            <Link href="/#coffee-chat" className="btn-ghost !py-3.5">궁금한 점은 커피챗으로</Link>
          )}
        </div>
      </div>
    );

  return (
    <form onSubmit={submit} className="card grid gap-5 p-6 md:p-9">
      <div>
        <p className="eyebrow">Apply</p>
        <p className="mt-2 text-[20px] font-bold text-brown-dark">{STUDY.cohort} 신청</p>
        <p className="mt-1 text-[14px] text-brown/75">신청 마감 {STUDY.deadline} · 선정 결과 {STUDY.resultDate}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="a-name">이름</label>
          <input id="a-name" name="name" required className="field" placeholder="홍길동" />
        </div>
        <div>
          <label className="label" htmlFor="a-phone">연락처 <span className="font-normal text-brown/60">· 카카오톡 초대용</span></label>
          <input id="a-phone" name="phone" required className="field" placeholder="010-0000-0000" />
        </div>
        <div>
          <label className="label" htmlFor="a-email">메일</label>
          <input id="a-email" name="email" type="email" required className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor="a-job">하는 일</label>
          <input id="a-job" name="job" className="field" placeholder="예) 스타트업 마케터, 인사팀 3년차" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="a-topic">자동화하고 싶은 실무 주제</label>
          <textarea id="a-topic" name="topic" required rows={3} className="field resize-none" placeholder="예) 매주 월요일 영업 데이터를 엑셀로 정리해서 보고서로 만드는 일" />
        </div>
      </div>
      <div className="space-y-2.5 rounded-xl bg-paper p-4 text-[14px] text-brown/90">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="pro" required className="mt-1 h-4 w-4 accent-brown" />
          클로드 Pro 구독을 첫 세션 전까지 준비할 수 있어요.
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="schedule" required className="mt-1 h-4 w-4 accent-brown" />
          4회 일정(11/8 · 11/15 · 11/18 · 11/22)에 모두 참여할 수 있어요.
        </label>
      </div>
      {state === "error" && <p className="text-[14px] font-medium text-[#B04A1A]">{err}</p>}
      <button disabled={state === "sending"} className="btn-primary w-full !py-4 text-[16px] disabled:opacity-60">
        {state === "sending" ? "보내는 중…" : "스터디 신청하기"}
      </button>
      <p className="-mt-1 text-center text-[12px] text-brown/65">참가비 {won(STUDY.price)} · 4회 전부 참석 시 {won(STUDY.refund)} 환급</p>
    </form>
  );
}
