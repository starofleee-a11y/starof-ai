// 알림 모듈 — 슬랙과 메일. 키가 없으면 조용히 건너뛰고 서버 로그에만 남깁니다.
import { SITE } from "./site";

export interface Notice {
  emoji: string;
  title: string;
  fields: [string, string | number | undefined | null][];
  footer?: string;
}

function kst(d = new Date()) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
}

function toText(n: Notice) {
  const lines = n.fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(([k, v]) => `*${k}*  ${String(v)}`);
  lines.push(`*시간*  ${kst()} (KST)`);
  return lines.join("\n");
}

/**
 * 슬랙 알림. 아래 중 하나만 설정하면 됩니다.
 *  1) SLACK_WEBHOOK_URL — Incoming Webhook (가장 쉬움)
 *  2) SLACK_BOT_TOKEN(xoxb-…) + SLACK_CHANNEL_ID(예: C0CCWJ4MRFE)
 */
export async function notifySlack(n: Notice): Promise<boolean> {
  const webhook = process.env.SLACK_WEBHOOK_URL?.trim();
  const token = process.env.SLACK_BOT_TOKEN?.trim();
  const channel = process.env.SLACK_CHANNEL_ID?.trim();
  const header = `${n.emoji} ${n.title}`;
  const payload = {
    text: header,
    blocks: [
      { type: "header", text: { type: "plain_text", text: header, emoji: true } },
      { type: "section", text: { type: "mrkdwn", text: toText(n) } },
      ...(n.footer ? [{ type: "context", elements: [{ type: "mrkdwn", text: n.footer }] }] : []),
    ],
  };
  try {
    if (token?.startsWith("xoxb-") && channel) {
      const res = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ channel, ...payload }),
        signal: AbortSignal.timeout(6000),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!data.ok) console.error("[slack] postMessage 실패:", data.error);
      return !!data.ok;
    }
    if (webhook?.startsWith("https://hooks.slack.com/")) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(6000),
      });
      if (!res.ok) console.error("[slack] webhook 실패:", res.status);
      return res.ok;
    }
    console.warn("[slack] 미설정 — 알림 내용:", header, toText(n));
    return false;
  } catch (e) {
    console.error("[slack] 오류:", e);
    return false;
  }
}

/**
 * 메일 발송 (Resend). RESEND_API_KEY가 없으면 건너뜁니다.
 * MAIL_FROM 예: "Star of AI <hello@starof-ai.com>" (도메인 인증 전엔 onboarding@resend.dev 사용)
 */
export async function sendMail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    console.warn("[mail] RESEND_API_KEY 미설정 — 메일 건너뜀:", opts.subject);
    return false;
  }
  const from = process.env.MAIL_FROM?.trim() || "Star of AI <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [opts.to], subject: opts.subject, html: opts.html, reply_to: opts.replyTo }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[mail] 실패:", res.status, await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("[mail] 오류:", e);
    return false;
  }
}

export const OWNER_EMAIL = () => process.env.OWNER_EMAIL?.trim() || SITE.email;

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function noticeToHtml(n: Notice) {
  const rows = n.fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#70631F;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;color:#3D2A0C">${escapeHtml(String(v)).replace(/\n/g, "<br>")}</td></tr>`
    )
    .join("");
  return `<div style="font-family:Pretendard,Apple SD Gothic Neo,sans-serif;background:#FFFDF5;padding:24px"><h2 style="color:#614215;margin:0 0 16px">${n.emoji} ${escapeHtml(n.title)}</h2><table style="border-collapse:collapse;font-size:14px">${rows}</table><p style="color:#8A6A3A;font-size:12px;margin-top:20px">${kst()} · starof-ai.com</p></div>`;
}

export function clean(v: unknown, max = 2000) {
  return String(v ?? "").trim().slice(0, max);
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
