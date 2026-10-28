"use client";
import { useState } from "react";
import Link from "next/link";
import { calcAmount, won } from "@/lib/products";

export default function WorkflowPricing() {
  const [n, setN] = useState(1);
  const total = calcAmount("workflow", n);
  return (
    <div className="rounded-[32px] border border-brown/10 bg-white p-7 shadow-[0_40px_80px_-50px_rgba(97,66,21,.6)] md:p-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Price</p>
          <p className="mt-3 font-serif text-[52px] font-semibold leading-none text-brown md:text-[64px]">
            {total.toLocaleString("ko-KR")}
            <span className="ml-1 text-[22px]">원</span>
          </p>
          <p className="mt-2 text-[14px] text-brown/60">워크플로우 {n}개 · 개당 300,000원</p>
        </div>
        <div>
          <span className="label">워크플로우 개수</span>
          <div className="flex items-center gap-1 rounded-full border border-brown/15 bg-cream p-1">
            <button type="button" aria-label="줄이기" onClick={() => setN((v) => Math.max(1, v - 1))} className="grid h-10 w-10 place-items-center rounded-full text-xl text-brown hover:bg-white">−</button>
            <span className="w-14 text-center text-[18px] font-bold text-brown-dark">{n}개</span>
            <button type="button" aria-label="늘리기" onClick={() => setN((v) => Math.min(5, v + 1))} className="grid h-10 w-10 place-items-center rounded-full text-xl text-brown hover:bg-white">+</button>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href={`/checkout?product=workflow&qty=${n}`} className="btn-primary !py-4 text-[16px]">
          {won(total)} 바로 결제하기
        </Link>
        <Link href="/#coffee-chat" className="btn-ghost !py-4">범위가 애매하면 커피챗 먼저</Link>
      </div>
      <p className="mt-4 text-center text-[12px] text-brown/50">결제 후 24시간 안에 킥오프 일정 메일을 드려요 · 킥오프 전 전액 환불</p>
    </div>
  );
}
