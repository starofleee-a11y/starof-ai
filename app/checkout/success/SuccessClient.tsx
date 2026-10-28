"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { won } from "@/lib/products";

type Result = { ok: true; orderName: string; amount: number; method?: string; receiptUrl?: string; test?: boolean } | { ok: false; message: string };

export default function SuccessClient() {
  const sp = useSearchParams();
  const [res, setRes] = useState<Result | null>(null);
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    const orderId = sp.get("orderId") || "";
    let customer = {};
    try {
      customer = JSON.parse(sessionStorage.getItem(`order:${orderId}`) || "{}");
    } catch {}
    fetch("/api/payments/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentKey: sp.get("paymentKey"), orderId, amount: Number(sp.get("amount")), customer }),
    })
      .then((r) => r.json())
      .then(setRes)
      .catch(() => setRes({ ok: false, message: "결제 확인 중 문제가 생겼어요." }));
  }, [sp]);

  if (!res) return <p className="text-center text-brown/75">결제를 확인하고 있어요…</p>;

  if (!res.ok)
    return (
      <div className="card p-10 text-center">
        <p className="text-[20px] font-bold text-brown-dark">결제를 완료하지 못했어요</p>
        <p className="mt-3 text-[15px] text-brown/85">{res.message}</p>
        <Link href="/contact" className="btn-primary mt-8">문의하기</Link>
      </div>
    );

  return (
    <div className="card p-10 text-center">
      <p className="mt-6 font-serif text-5xl italic text-brown">Welcome!</p>
      <p className="mt-4 text-[19px] font-bold text-brown-dark">결제가 완료됐어요{res.test ? " (테스트)" : ""}</p>
      <p className="mt-2 text-[15px] text-brown/85">
        {res.orderName} · {won(res.amount)}
        <br />
        24시간 안에 일정 안내 메일을 보내드릴게요.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {res.receiptUrl && (
          <a href={res.receiptUrl} target="_blank" rel="noreferrer" className="btn-ghost">영수증 보기</a>
        )}
        <Link href="/" className="btn-primary">홈으로</Link>
      </div>
    </div>
  );
}
