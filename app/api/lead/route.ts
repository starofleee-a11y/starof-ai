import { NextRequest, NextResponse } from "next/server";
import { notifySlack, clean, isEmail } from "@/lib/notify";

export const runtime = "nodejs";

const LABEL: Record<string, string> = {
  study: "자동화 기초 강의 · 1화 강의 교안",
  consulting: "1:1 AX 컨설팅 · 자동화 셋팅 가이드 & 커리큘럼",
};

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const name = clean(b.name, 50);
  const email = clean(b.email, 120);
  if (!name || !isEmail(email)) return NextResponse.json({ error: "이름과 메일을 확인해 주세요." }, { status: 400 });
  await notifySlack({
    emoji: "📥",
    title: `무료 PDF 다운로드 · ${LABEL[b.product] ?? b.product}`,
    fields: [
      ["이름", name],
      ["메일", email],
      ["자료", clean(b.file, 120)],
    ],
    footer: "관심 고객이에요. 2~3일 뒤 후속 메일이나 커피챗 제안을 보내보세요.",
  });
  return NextResponse.json({ ok: true });
}
