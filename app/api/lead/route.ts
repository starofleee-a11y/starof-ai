import { NextRequest, NextResponse } from "next/server";
import { notifySlack, clean, isEmail } from "@/lib/notify";
import { logApplication } from "@/lib/sheets";

export const runtime = "nodejs";

const LABEL: Record<string, string> = {
  study: "자동화 기초 강의 · 1화 강의 교안",
  consulting: "1:1 마케팅 자동화 컨설팅 · 자동화 셋팅 가이드 & 커리큘럼",
};

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const name = clean(b.name, 50);
  const email = clean(b.email, 120);
  const digits = clean(b.phone, 30).replace(/\D/g, "");
  if (!name || !isEmail(email) || !/^0\d{9,10}$/.test(digits)) {
    return NextResponse.json({ error: "이름, 휴대폰 번호, 메일을 확인해 주세요." }, { status: 400 });
  }
  // 010-1234-5678 형태로 맞춰 저장 (문자 보낼 때 그대로 복사해서 쓰기 좋게)
  const phone = digits.length === 11 ? `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}` : `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  const sms = b.smsConsent === true ? "동의" : "미동의";
  const fileLabel = LABEL[b.product] ?? clean(b.product, 40);
  const notice = notifySlack({
    emoji: "📥",
    title: `무료 PDF 다운로드 · ${fileLabel}`,
    fields: [
      ["이름", name],
      ["휴대폰", phone],
      ["메일", email],
      ["자료", clean(b.file, 120)],
      ["소식 문자·메일 수신", sms],
    ],
    footer: sms === "동의"
      ? "관심 고객이에요. 2~3일 뒤 후속 문자·메일이나 커피챗 제안을 보내보세요."
      : "관심 고객이에요. 홍보 문자·메일 수신은 미동의라, 자료 관련 안내만 보내주세요.",
  });
  // 구글 시트 '강의 신청' 탭에도 한 줄 (결제 상태는 '확인 필요'로 표시)
  const sheet = logApplication({
    course: "무료 자료 다운로드",
    cohort: fileLabel,
    name,
    phone,
    email,
    status: "확인 필요",
    note: `소식 문자·메일 수신 ${sms}`,
  });
  await Promise.all([notice, sheet]);
  return NextResponse.json({ ok: true });
}
