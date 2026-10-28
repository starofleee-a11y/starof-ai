import { NextRequest, NextResponse } from "next/server";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const f = {
    type: clean(b.type, 50),
    company: clean(b.company, 100),
    size: clean(b.size, 30),
    name: clean(b.name, 50),
    phone: clean(b.phone, 30),
    email: clean(b.email, 120),
    message: clean(b.message, 3000),
  };
  if (!f.name || !isEmail(f.email) || !f.message) {
    return NextResponse.json({ error: "이름, 메일, 의뢰 내용을 확인해 주세요." }, { status: 400 });
  }
  const notice = {
    emoji: "🏢",
    title: `새 문의 · ${f.type}${f.company ? ` · ${f.company}` : ""}`,
    fields: [
      ["유형", f.type],
      ["회사", f.company],
      ["인원", f.size],
      ["담당자", f.name],
      ["연락처", f.phone],
      ["메일", f.email],
      ["내용", f.message],
    ] as [string, string][],
    footer: "1영업일 안에 회신해 주세요.",
  };
  // 메일과 슬랙 둘 다로 알림
  const [slack, mail] = await Promise.all([
    notifySlack(notice),
    sendMail({ to: OWNER_EMAIL(), subject: `[Star of AI 문의] ${f.type} · ${f.company || f.name}`, html: noticeToHtml(notice), replyTo: f.email }),
  ]);
  return NextResponse.json({ ok: true, slack, mail });
}
