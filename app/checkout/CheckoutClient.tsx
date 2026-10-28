"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { PRODUCTS, calcAmount, orderName, won, type ProductId } from "@/lib/products";
import { TOSS_CLIENT_KEY, isTossTestMode } from "@/lib/toss";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window { TossPayments?: any }
}

export default function CheckoutClient() {
  const sp = useSearchParams();
  const pid = (sp.get("product") as ProductId) || "study";
  const product = PRODUCTS[pid] && PRODUCTS[pid].payable ? PRODUCTS[pid] : PRODUCTS.study;
  const qty = Math.max(1, Math.min(product.id === "study" ? 10 : 5, Number(sp.get("qty")) || 1));
  const amount = calcAmount(product.id, qty);
  const name = orderName(product.id, qty);

  const [sdkReady, setSdkReady] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);
  const [error, setError] = useState("");
  const widgets = useRef<any>(null);

  useEffect(() => {
    if (window.TossPayments) setSdkReady(true);
  }, []);

  useEffect(() => {
    if (!sdkReady) return;
    let cancelled = false;
    (async () => {
      try {
        const toss = window.TossPayments(TOSS_CLIENT_KEY);
        const w = toss.widgets({ customerKey: window.TossPayments.ANONYMOUS });
        await w.setAmount({ currency: "KRW", value: amount });
        await Promise.all([
          w.renderPaymentMethods({ selector: "#payment-method", variantKey: "DEFAULT" }),
          w.renderAgreement({ selector: "#agreement", variantKey: "AGREEMENT" }),
        ]);
        if (!cancelled) {
          widgets.current = w;
          setWidgetReady(true);
        }
      } catch (e: any) {
        setError(e?.message || "결제창을 불러오지 못했어요.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sdkReady, amount]);

  async function pay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!widgets.current) return;
    const f = new FormData(e.currentTarget);
    const customer = {
      name: String(f.get("name") || ""),
      email: String(f.get("email") || ""),
      phone: String(f.get("phone") || "").replace(/[^0-9]/g, ""),
      memo: String(f.get("memo") || ""),
    };
    // 주문번호에 상품·수량을 담아 서버가 금액을 다시 검증합니다.
    const orderId = `${product.id}-${qty}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    try {
      sessionStorage.setItem(`order:${orderId}`, JSON.stringify(customer));
    } catch {}
    try {
      await widgets.current.requestPayment({
        orderId,
        orderName: name,
        successUrl: `${location.origin}/checkout/success`,
        failUrl: `${location.origin}/checkout/fail`,
        customerEmail: customer.email,
        customerName: customer.name,
        customerMobilePhone: customer.phone || undefined,
      });
    } catch (e: any) {
      if (e?.code !== "USER_CANCEL") setError(e?.message || "결제 요청에 실패했어요.");
    }
  }

  return (
    <>
      <Script src="https://js.tosspayments.com/v2/standard" strategy="afterInteractive" onLoad={() => setSdkReady(true)} />
      <Link href={product.href} className="text-[14px] text-brown/60 hover:text-brown">← {product.short} 상세로 돌아가기</Link>
      <h1 className="h-display mt-4 text-[32px] md:text-[44px]">결제하기</h1>
      {isTossTestMode() && (
        <p className="mt-4 inline-flex rounded-full bg-brown px-4 py-1.5 text-[13px] font-semibold text-butter">
          테스트 모드 · 실제로 결제되지 않아요
        </p>
      )}

      <form onSubmit={pay} className="mt-10 grid gap-6 md:grid-cols-[1.25fr_1fr]">
        <div className="space-y-6">
          <div className="card p-6 md:p-8">
            <p className="text-[16px] font-bold text-brown-dark">신청자 정보</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="c-name">이름</label>
                <input id="c-name" name="name" required className="field" placeholder="홍길동" />
              </div>
              <div>
                <label className="label" htmlFor="c-phone">휴대폰</label>
                <input id="c-phone" name="phone" required className="field" placeholder="010-0000-0000" />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="c-email">메일 (일정 안내를 보내드려요)</label>
                <input id="c-email" name="email" type="email" required className="field" placeholder="you@example.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="c-memo">자동화하고 싶은 업무 · 희망 일정 (선택)</label>
                <textarea id="c-memo" name="memo" rows={3} className="field resize-none" placeholder="예) 평일 저녁 7시 이후, 주간 보고서 자동화" />
              </div>
            </div>
          </div>
          <div className="card overflow-hidden p-2 md:p-4">
            <div id="payment-method" />
            <div id="agreement" />
            {!widgetReady && !error && <p className="p-6 text-center text-[14px] text-brown/50">결제 수단을 불러오는 중…</p>}
            {error && <p className="p-6 text-center text-[14px] font-medium text-[#B04A1A]">{error}</p>}
          </div>
        </div>

        <aside className="md:sticky md:top-28 md:self-start">
          <div className="rounded-[28px] bg-brown p-7 text-butter-pale shadow-[0_30px_60px_-30px_rgba(61,42,12,.8)]">
            <p className="font-serif text-[15px] italic text-butter/70">{product.en}</p>
            <p className="mt-2 text-[19px] font-bold text-butter">{name}</p>
            <p className="mt-1 text-[13px] text-butter-pale/60">{product.unit}</p>
            <div className="my-6 h-px bg-butter/15" />
            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-butter-pale/70">결제 금액</span>
              <span className="font-serif text-[34px] font-semibold text-butter">{won(amount)}</span>
            </div>
            <button disabled={!widgetReady} className="btn-yellow mt-6 w-full !py-4 text-[16px] disabled:opacity-50">
              {won(amount)} 결제하기
            </button>
            <p className="mt-4 text-center text-[12px] text-butter-pale/50">결제 후 24시간 안에 일정 안내 메일을 드려요</p>
          </div>
        </aside>
      </form>
    </>
  );
}
