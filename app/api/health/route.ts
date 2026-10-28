import { NextResponse } from "next/server";
import { hasGoogle } from "@/lib/google";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** 어떤 연동이 켜져 있는지 확인용 (키 값은 절대 내보내지 않아요) */
export function GET() {
  const e = process.env;
  return NextResponse.json({
    slack: !!(e.SLACK_WEBHOOK_URL?.startsWith("https://hooks.slack.com/") || (e.SLACK_BOT_TOKEN && e.SLACK_CHANNEL_ID)),
    mail: !!e.RESEND_API_KEY,
    calendar: hasGoogle(),
    calendarId: e.GOOGLE_CALENDAR_ID ? "custom" : "primary",
    cron: !!e.CRON_SECRET,
    anthropic: !!e.ANTHROPIC_API_KEY,
    toss: !!(e.NEXT_PUBLIC_TOSS_CLIENT_KEY && e.TOSS_SECRET_KEY),
    bank: !!e.NEXT_PUBLIC_BANK_ACCOUNT,
  });
}
