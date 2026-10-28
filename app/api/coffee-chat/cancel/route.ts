import { NextRequest, NextResponse } from "next/server";
import { cancelCoffeeEvent, getCoffeeEvent, signId } from "@/lib/google";
import { notifySlack } from "@/lib/notify";
import { fmtKst } from "@/lib/slots";

export const runtime = "nodejs";

const page = (title: string, body: string) =>
  new NextResponse(
    `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · Star of AI</title></head>
<body style="margin:0;background:#FFFDF5;font-family:Pretendard,Apple SD Gothic Neo,sans-serif;color:#3D2A0C"><div style="max-width:520px;margin:12vh auto;padding:32px;text-align:center">
<p style="font-size:12px;letter-spacing:.2em;color:#70631F">STAR OF AI</p><h1 style="color:#614215;font-size:26px">${title}</h1><p style="line-height:1.7;color:#614215">${body}</p>
<a href="/#coffee-chat" style="display:inline-block;margin-top:20px;background:#614215;color:#FFEB51;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">다른 시간으로 다시 예약</a></div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );

/** 메일의 '예약 취소하기' 링크 → 캘린더 일정 삭제 + 슬랙 알림 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id") || "";
  const t = req.nextUrl.searchParams.get("t") || "";
  if (!id || signId(id) !== t) return page("링크가 올바르지 않아요", "메일에 있는 취소 링크를 다시 눌러주세요.");
  const ev = await getCoffeeEvent(id);
  if (!ev || ev.status === "cancelled") return page("이미 취소된 예약이에요", "새로 예약하시려면 아래 버튼을 눌러주세요.");
  const ok = await cancelCoffeeEvent(id);
  if (!ok) return page("취소에 실패했어요", "잠시 후 다시 시도하거나 starofleee@gmail.com 으로 알려주세요.");
  await notifySlack({
    emoji: "🚫",
    title: `커피챗 취소 · ${fmtKst(new Date(ev.start))}`,
    fields: [
      ["이름", ev.name],
      ["메일", ev.attendee],
    ],
  });
  return page("예약이 취소됐어요", `${fmtKst(new Date(ev.start))} 커피챗을 취소했어요. 캘린더에서도 지워졌습니다.`);
}
