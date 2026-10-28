import { NextRequest, NextResponse } from "next/server";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail, escapeHtml } from "@/lib/notify";
import { cancelUrl, createCoffeeEvent, hasGoogle } from "@/lib/google";
import { SLOT_MINUTES, EVENT_MINUTES, addMinutes, fmtKst, isValidSlot, toDate } from "@/lib/slots";
import { getAvailability } from "@/lib/availability";

export const runtime = "nodejs";

/**
 * 커피챗 신청.
 *  - 구글 캘린더가 연결돼 있으면: 캘린더에 일정 생성 → 구글 미트 링크 자동 생성 → 신청자에게 초대·확인 메일 → 슬랙 알림
 *  - 아니면: 슬랙·메일로 신청 내용만 전달 (링크는 직접 보내주세요)
 */
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const f = {
    name: clean(b.name, 50),
    email: clean(b.email, 120),
    topic: clean(b.topic, 60),
    concern: clean(b.concern, 2000),
    date: clean(b.date, 10),
    time: clean(b.time, 5),
  };
  if (!f.name || !isEmail(f.email) || !/^\d{4}-\d{2}-\d{2}$/.test(f.date) || !/^\d{2}:\d{2}$/.test(f.time)) {
    return NextResponse.json({ error: "이름, 메일, 날짜, 시간을 확인해 주세요." }, { status: 400 });
  }
  const avail = await getAvailability();
  if (!isValidSlot(avail.days, f.date, f.time)) {
    return NextResponse.json({ error: "방금 다른 분이 예약했거나 지난 시간이에요. 다른 시간을 골라주세요." }, { status: 409 });
  }

  const start = toDate(f.date, f.time);
  const end = addMinutes(start, EVENT_MINUTES); // 캘린더에는 1시간으로 잡아 다음 칸까지 마감
  const when = fmtKst(start);
  const origin = req.nextUrl.origin;

  const event = hasGoogle() ? await createCoffeeEvent({ ...f, start, end }) : null;
  const link = event?.meetLink;
  const cancel = event ? cancelUrl(origin, event.id) : "";

  const notice = {
    emoji: "☕",
    title: `커피챗 ${event ? "예약 확정" : "신청"} · ${when}`,
    fields: [
      ["이름", f.name],
      ["메일", f.email],
      ["주제", f.topic],
      ["고민", f.concern],
      ["일시", `${when} (${SLOT_MINUTES}분)`],
      ["미팅 링크", link],
      ["캘린더", event?.htmlLink],
    ] as [string, string | undefined][],
    footer: event ? "캘린더에 자동 등록됐어요. 24시간 전 리마인드 메일도 자동으로 나갑니다." : "구글 캘린더 미연결 — 확인 후 미팅 링크를 직접 보내주세요.",
  };

  const customerHtml = `<div style="font-family:Pretendard,Apple SD Gothic Neo,sans-serif;color:#3D2A0C;line-height:1.75;padding:28px;background:#FFFDF5">
    <p style="font-size:12px;letter-spacing:.2em;color:#70631F;margin:0 0 12px">STAR OF AI · FREE COFFEE CHAT</p>
    <h2 style="color:#614215;margin:0 0 16px">${escapeHtml(f.name)}님, 커피챗 ${event ? "예약이 확정됐어요" : "신청이 접수됐어요"} ☕</h2>
    <p><b>${escapeHtml(when)}</b> · ${SLOT_MINUTES}분 · 온라인</p>
    ${link ? `<p style="margin:20px 0"><a href="${link}" style="display:inline-block;background:#614215;color:#FFEB51;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">미팅 참여 링크</a></p><p style="font-size:13px;color:#8A6A3A">${link}</p>` : `<p>일정 확인 후 미팅 링크를 이 메일로 보내드릴게요.</p>`}
    ${event ? `<p style="font-size:14px">구글 캘린더 초대도 함께 보냈어요. 미팅 하루 전에 리마인드 메일을 드립니다.</p><p style="font-size:13px;color:#8A6A3A">일정이 어려워지셨다면 → <a href="${cancel}" style="color:#614215">예약 취소하기</a></p>` : ""}
    <p style="margin-top:28px;font-size:13px;color:#8A6A3A">Star of AI · 이경서(Winter) · starof-ai.com</p>
  </div>`;

  await Promise.all([
    notifySlack(notice),
    sendMail({ to: OWNER_EMAIL(), subject: `[커피챗] ${f.name} · ${when}`, html: noticeToHtml(notice), replyTo: f.email }),
    sendMail({ to: f.email, subject: `[Star of AI] 커피챗 ${event ? "예약 확정" : "신청 접수"} · ${when}`, html: customerHtml }),
  ]);
  return NextResponse.json({ ok: true, confirmed: !!event, when, link });
}
