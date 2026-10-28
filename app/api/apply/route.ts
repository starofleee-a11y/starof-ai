import { NextRequest, NextResponse } from "next/server";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail, escapeHtml } from "@/lib/notify";
import { STUDY } from "@/lib/study";

export const runtime = "nodejs";

/** 자동화 기초 강의(스터디) 신청서 → 슬랙 + 대표 메일 + 신청자 확인 메일 */
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const f = {
    name: clean(b.name, 50),
    phone: clean(b.phone, 30),
    email: clean(b.email, 120),
    job: clean(b.job, 100),
    topic: clean(b.topic, 1500),
    pro: b.pro === true ? "예" : "아니오",
    schedule: b.schedule === true ? "예" : "아니오",
  };
  if (!f.name || !f.phone || !isEmail(f.email) || !f.topic) {
    return NextResponse.json({ error: "이름, 연락처, 메일, 자동화 주제를 확인해 주세요." }, { status: 400 });
  }
  const notice = {
    emoji: "🎓",
    title: `스터디 신청 · ${f.name}`,
    fields: [
      ["이름", f.name],
      ["연락처", f.phone],
      ["메일", f.email],
      ["하는 일", f.job],
      ["자동화 주제", f.topic],
      ["클로드 Pro 구독", f.pro],
      ["4회 전부 참석 가능", f.schedule],
    ] as [string, string][],
    footer: `${STUDY.cohort} · 선정 결과는 ${STUDY.resultDate} 카카오톡으로 안내`,
  };
  await Promise.all([
    notifySlack(notice),
    sendMail({ to: OWNER_EMAIL(), subject: `[스터디 신청] ${f.name} · ${f.job || f.email}`, html: noticeToHtml(notice), replyTo: f.email }),
    sendMail({
      to: f.email,
      subject: `[Star of AI] ${STUDY.cohort} 신청이 접수됐어요`,
      html: `<div style="font-family:Pretendard,Apple SD Gothic Neo,sans-serif;color:#3D2A0C;line-height:1.75;padding:28px;background:#FFFDF5">
        <p style="font-size:12px;letter-spacing:.2em;color:#70631F;margin:0 0 12px">STAR OF AI · STUDY</p>
        <h2 style="color:#614215;margin:0 0 16px">${escapeHtml(f.name)}님, 신청 감사해요 ✨</h2>
        <p>${STUDY.cohort} 신청이 접수됐어요.<br>선정 결과는 <b>${STUDY.resultDate}</b> 남겨주신 번호로 카카오톡 팀 채팅 초대와 함께 알려드릴게요.</p>
        <p style="font-size:14px">첫 세션 전까지 클로드 Pro 구독을 준비해 주세요.</p>
        <p style="margin-top:28px;font-size:13px;color:#8A6A3A">Star of AI · 이경서(Winter)</p></div>`,
    }),
  ]);
  return NextResponse.json({ ok: true });
}
