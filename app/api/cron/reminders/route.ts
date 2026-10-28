import { NextRequest, NextResponse } from "next/server";
import { cancelUrl, hasGoogle, listCoffeeEvents, markReminded } from "@/lib/google";
import { sendMail, escapeHtml } from "@/lib/notify";
import { fmtKst } from "@/lib/slots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 매시간 실행 (vercel.json의 cron). 23~25시간 뒤에 시작하는 커피챗에 리마인드 메일을 보냅니다.
 * Vercel이 Authorization: Bearer CRON_SECRET 헤더를 붙여 호출합니다.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!hasGoogle()) return NextResponse.json({ ok: true, skipped: "google not configured" });

  const now = Date.now();
  const events = await listCoffeeEvents(new Date(now + 23 * 3600_000), new Date(now + 25 * 3600_000));
  const origin = req.nextUrl.origin;
  let sent = 0;
  for (const ev of events) {
    if (ev.reminded || !ev.attendee) continue;
    const when = fmtKst(new Date(ev.start));
    const ok = await sendMail({
      to: ev.attendee,
      subject: `[Star of AI] 내일 커피챗 리마인드 · ${when}`,
      html: `<div style="font-family:Pretendard,Apple SD Gothic Neo,sans-serif;color:#3D2A0C;line-height:1.75;padding:28px;background:#FFFDF5">
        <p style="font-size:12px;letter-spacing:.2em;color:#70631F;margin:0 0 12px">STAR OF AI · REMINDER</p>
        <h2 style="color:#614215;margin:0 0 16px">${escapeHtml(ev.name || "")}님, 내일 커피챗이 있어요 ☕</h2>
        <p><b>${escapeHtml(when)}</b> · 30분 · 온라인</p>
        ${ev.meetLink ? `<p style="margin:20px 0"><a href="${ev.meetLink}" style="display:inline-block;background:#614215;color:#FFEB51;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">미팅 참여 링크</a></p>` : ""}
        <p style="font-size:14px">자동화하고 싶은 업무 화면을 미리 떠올려 오시면 30분이 훨씬 알차요.</p>
        <p style="font-size:13px;color:#8A6A3A">일정이 어려워지셨다면 → <a href="${cancelUrl(origin, ev.id)}" style="color:#614215">예약 취소하기</a></p>
        <p style="margin-top:28px;font-size:13px;color:#8A6A3A">Star of AI · 이경서(Winter)</p></div>`,
    });
    if (ok) {
      await markReminded(ev.id);
      sent++;
    }
  }
  return NextResponse.json({ ok: true, checked: events.length, sent });
}
