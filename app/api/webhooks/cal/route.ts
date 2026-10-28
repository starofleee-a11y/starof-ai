import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { notifySlack } from "@/lib/notify";

export const runtime = "nodejs";

/**
 * Cal.com 웹훅 → 슬랙 알림.
 * Cal.com > Settings > Developer > Webhooks 에서
 *   URL: https://www.starof-ai.com/api/webhooks/cal
 *   Secret: CAL_WEBHOOK_SECRET 와 같은 값
 *   이벤트: Booking Created, Booking Cancelled, Booking Rescheduled
 */
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers.get("x-cal-signature-256") || "";
    const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }
  }
  const body = JSON.parse(raw || "{}");
  const p = body.payload ?? {};
  const attendee = p.attendees?.[0] ?? {};
  const label: Record<string, [string, string]> = {
    BOOKING_CREATED: ["☕", "커피챗 예약"],
    BOOKING_CANCELLED: ["🗑️", "커피챗 취소"],
    BOOKING_RESCHEDULED: ["🔁", "커피챗 일정 변경"],
  };
  const [emoji, title] = label[body.triggerEvent] ?? ["📅", body.triggerEvent ?? "Cal.com 이벤트"];
  const when = p.startTime
    ? new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", dateStyle: "medium", timeStyle: "short" }).format(new Date(p.startTime))
    : "";
  const answers = Object.entries(p.responses ?? {})
    .filter(([k]) => !["name", "email", "location", "guests", "rescheduleReason"].includes(k))
    .map(([k, v]: [string, unknown]) => `${(v as { label?: string })?.label ?? k}: ${(v as { value?: unknown })?.value ?? v}`)
    .join("\n");
  await notifySlack({
    emoji,
    title: `${title} · ${when}`,
    fields: [
      ["이름", attendee.name],
      ["메일", attendee.email],
      ["일시", when],
      ["줌", p.videoCallData?.url ?? p.metadata?.videoCallUrl],
      ["고민", answers || p.description],
      ["취소 사유", p.cancellationReason],
    ],
  });
  return NextResponse.json({ ok: true });
}
