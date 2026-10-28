"use client";
import { useState } from "react";
import Link from "next/link";
import { STUDY_GROUP_PRICES, calcAmount, studyPerPerson, won } from "@/lib/products";

export default function StudyPricing() {
  const [people, setPeople] = useState(1);
  const per = studyPerPerson(people);
  const total = calcAmount("study", people);
  const save = 200000 * people - total;
  return (
    <div className="rounded-[32px] border border-brown/10 bg-white p-7 shadow-[0_40px_80px_-50px_rgba(97,66,21,.6)] md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Price</p>
          <p className="mt-3 font-serif text-[52px] font-semibold leading-none text-brown md:text-[64px]">
            {won(total).replace("원", "")}
            <span className="ml-1 text-[22px]">원</span>
          </p>
          <p className="mt-2 text-[14px] text-brown/60">
            {people}인 · 1인당 {won(per)} · 4회 총 4시간
            {save > 0 && <span className="ml-2 rounded-full bg-butter px-2 py-0.5 font-semibold text-brown-dark">{won(save)} 할인</span>}
          </p>
        </div>
        <div>
          <span className="label">함께 듣는 인원</span>
          <div className="flex items-center gap-1 rounded-full border border-brown/15 bg-cream p-1">
            <button type="button" aria-label="인원 줄이기" onClick={() => setPeople((p) => Math.max(1, p - 1))} className="grid h-10 w-10 place-items-center rounded-full text-xl text-brown hover:bg-white">−</button>
            <span className="w-14 text-center text-[18px] font-bold text-brown-dark">{people}명</span>
            <button type="button" aria-label="인원 늘리기" onClick={() => setPeople((p) => Math.min(10, p + 1))} className="grid h-10 w-10 place-items-center rounded-full text-xl text-brown hover:bg-white">+</button>
          </div>
        </div>
      </div>
      <div className="mt-7 grid grid-cols-3 gap-2 text-center text-[12.5px]">
        {STUDY_GROUP_PRICES.map((t) => {
          const on = per === t.perPerson;
          return (
            <div key={t.min} className={`rounded-2xl border px-2 py-3 transition-all ${on ? "border-brown bg-butter-pale" : "border-brown/10"}`}>
              <p className="font-semibold text-brown-dark">{t.label}</p>
              <p className="mt-0.5 text-brown/60">1인 {won(t.perPerson)}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href={`/checkout?product=study&qty=${people}`} className="btn-primary !py-4 text-[16px]">
          {won(total)} 바로 결제하기
        </Link>
        <Link href="/#coffee-chat" className="btn-ghost !py-4">먼저 커피챗으로 상담받기</Link>
      </div>
      <p className="mt-4 text-center text-[12px] text-brown/50">결제 후 24시간 안에 일정 조율 메일을 드려요 · 1회차 시작 전 전액 환불</p>
    </div>
  );
}
