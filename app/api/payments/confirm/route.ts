import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, calcAmount, won, type ProductId } from "@/lib/products";
import { tossSecretKey, isTossTestMode } from "@/lib/toss";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const paymentKey = clean(body.paymentKey, 200);
  const orderId = clean(body.orderId, 64);
  const amount = Number(body.amount);
  const c = body.customer ?? {};
  const customer = { name: clean(c.name, 50), email: clean(c.email, 120), phone: clean(c.phone, 20), memo: clean(c.memo, 1000) };

  // 1) 주문번호(상품-수량-랜덤)로 금액을 다시 계산해 위·변조를 막습니다.
  const [pid, qtyStr] = orderId.split("-");
  const product = PRODUCTS[pid as ProductId];
  const qty = Number(qtyStr);
  if (!paymentKey || !product?.payable || !qty || calcAmount(product.id, qty) !== amount) {
    return NextResponse.json({ ok: false, message: "주문 정보가 올바르지 않아요." }, { status: 400 });
  }

  // 2) 토스페이먼츠 결제 승인
  const auth = Buffer.from(`${tossSecretKey()}:`).toString("base64");
  const r = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok && data?.code !== "ALREADY_PROCESSED_PAYMENT") {
    return NextResponse.json({ ok: false, message: data?.message || "결제 승인에 실패했어요." }, { status: 400 });
  }
  if (data?.code === "ALREADY_PROCESSED_PAYMENT") {
    // 새로고침 등으로 두 번 들어온 경우 — 알림은 다시 보내지 않습니다.
    return NextResponse.json({ ok: true, orderName: product.name, amount, test: isTossTestMode() });
  }

  const test = isTossTestMode();
  const notice = {
    emoji: "💳",
    title: `${test ? "[테스트] " : ""}결제 완료 · ${data.orderName ?? product.name}`,
    fields: [
      ["상품", data.orderName ?? product.name],
      ["금액", won(amount)],
      ["결제수단", data.method],
      ["이름", customer.name],
      ["메일", customer.email],
      ["휴대폰", customer.phone],
      ["메모", customer.memo],
      ["주문번호", orderId],
      ["영수증", data.receipt?.url],
    ] as [string, string | undefined][],
    footer: "24시간 안에 일정 안내 메일을 보내주세요.",
  };
  await Promise.all([
    notifySlack(notice),
    sendMail({ to: OWNER_EMAIL(), subject: notice.title, html: noticeToHtml(notice), replyTo: isEmail(customer.email) ? customer.email : undefined }),
    isEmail(customer.email)
      ? sendMail({
          to: customer.email,
          subject: `[Star of AI] ${data.orderName ?? product.name} 결제가 완료됐어요`,
          html: `<div style="font-family:Pretendard,sans-serif;color:#3D2A0C;line-height:1.7;padding:24px;background:#FFFDF5"><h2 style="color:#614215">결제해 주셔서 감사해요 ✦</h2><p>${customer.name}님, <b>${data.orderName ?? product.name}</b> (${won(amount)}) 결제가 완료됐어요.<br>24시간 안에 일정 안내 메일을 다시 드릴게요.</p><p style="color:#8A6A3A;font-size:13px">Star of AI · 이경서(Winter) · starofleee@gmail.com</p></div>`,
        })
      : Promise.resolve(false),
  ]);

  return NextResponse.json({ ok: true, orderName: data.orderName ?? product.name, amount, method: data.method, receiptUrl: data.receipt?.url, test });
}
