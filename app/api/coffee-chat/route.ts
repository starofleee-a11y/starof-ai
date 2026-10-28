import { NextRequest, NextResponse } from "next/server";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail } from "@/lib/notify";

export const runtime = "nodejs";

// Cal.com 연결 전 임시 신청 폼용. Cal.com을 연결하면 /api/webhooks/cal 이 대신 알림을 보냅니다.
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
  const notice = {
    emoji: "☕",
    title: `커피챗 신청 · ${f.date} ${f.time}`,
    fields: [
      ["이름", f.name],
      ["메일", f.email],
      ["주제", f.topic],
      ["고민", f.concern],
      ["희망 일시", `${f.date} ${f.time} (30분)`],
    ] as [string, string][],
    footer: "확인 후 줌 링크를 메일로 보내주세요. (Cal.com 연결 시 자동)",
  };
  await Promise.all([
    notifySlack(notice),
    sendMail({ to: OWNER_EMAIL(), subject: `[커피챗] ${f.name} · ${f.date} ${f.time}`, html: noticeToHtml(notice), replyTo: f.email }),
    sendMail({
      to: f.email,
      subject: "[Star of AI] 무료 커피챗 신청이 접수됐어요",
      html: `<div style="font-family:Pretendard,sans-serif;color:#3D2A0C;line-height:1.7;padding:24px;background:#FFFDF5"><h2 style="color:#614215">커피챗 신청 감사해요 ☕</h2><p>${f.name}님, <b>${f.date} ${f.time}</b> 커피챗 신청이 접수됐어요.<br>일정 확인 후 줌 링크를 이 메일로 보내드릴게요.</p><p style="color:#8A6A3A;font-size:13px">Star of AI · 이경서(Winter)</p></div>`,
    }),
  ]);
  return NextResponse.json({ ok: true });
}
