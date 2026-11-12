// Zapier 워크플로우 "Star of AI 커피챗 후속 자동화" 소스 사본 (실제 실행본은 Zapier에 있어요).
// 사이트(app/api/coffee-chat)가 ZAPIER_COFFEE_HOOK_URL 로 신청 정보를 보내면:
// 1) 줌 미팅 생성 → 2) 구글 캘린더 30분 일정 등록(신청자 초대) → 3) 감사·안내 메일
// → 4) 시작 1시간 전까지 대기 → 일정이 아직 있으면 리마인드 메일 (취소 시 답장 요청)
import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const InputSchema = z
  .object({
    name: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    topic: z.string().nullable().optional(),
    concern: z.string().nullable().optional(),
    start: z.string().nullable().optional(), // ISO, 예: 2026-11-13T09:00:00.000Z
    end: z.string().nullable().optional(),
    when: z.string().nullable().optional(), // 사람이 읽는 KST 표기
    test: z.union([z.boolean(), z.string()]).nullable().optional(),
  })
  .loose();

const ZOOM = "zoom";
const GCAL = "gcal";
const GMAIL = "gmail";
const CALENDAR_ID = "starofleee@gmail.com";
const FROM_NAME = "Star of AI 이경서(Winter)";
const MINUTES = 30;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => (({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as Record<string, string>)[c]!));

function kstLabel(d: Date) {
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
  return parts; // 예: 11월 13일 (금) 오후 6:00
}

function wrap(inner: string) {
  return `<div style="font-family:Pretendard,'Apple SD Gothic Neo',sans-serif;color:#3D2A0C;line-height:1.75;padding:28px;background:#FFFDF5;max-width:560px">${inner}<p style="margin-top:28px;font-size:13px;color:#8A6A3A">Star of AI · 이경서(Winter) · starof-ai.com</p></div>`;
}

function button(url: string, label: string) {
  return `<p style="margin:20px 0"><a href="${url}" style="display:inline-block;background:#614215;color:#FFEB51;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:600">${label}</a></p><p style="font-size:13px;color:#8A6A3A;word-break:break-all">${url}</p>`;
}

type Meeting = { join_url?: string; id?: number | string; password?: string };
/** Zoom API 응답이 어떤 모양으로 감싸져 와도 join_url 이 든 객체를 찾아요 */
function findMeeting(v: unknown, depth = 0): Meeting | undefined {
  if (depth > 5 || v == null) return undefined;
  if (typeof v === "string") {
    const s = v.trim();
    if (!s.startsWith("{")) return undefined;
    try {
      return findMeeting(JSON.parse(s), depth + 1);
    } catch {
      return undefined;
    }
  }
  if (typeof v !== "object") return undefined;
  const o = v as Record<string, unknown>;
  if (typeof o.join_url === "string") return o as Meeting;
  for (const k of Object.keys(o)) {
    if (k === "request") continue;
    const m = findMeeting(o[k], depth + 1);
    if (m) return m;
  }
  return undefined;
}

const workflow = defineDurable({
  name: "starofai-coffee-chat-followup",
  inputSchema: InputSchema,
  run: async (ctx, rawInput) => {
    const input = InputSchema.parse(rawInput ?? {});
    const name = (input.name ?? "").trim();
    const email = (input.email ?? "").trim();
    const startRaw = (input.start ?? "").trim();
    const endRaw = (input.end ?? "").trim();
    // 날짜 계산은 step 안에서만 (durable 규칙)
    const t = await ctx.step("prepare-times", async () => {
      const s0 = new Date(startRaw);
      if (isNaN(s0.getTime())) return null;
      const e1 = new Date(endRaw);
      const e0 = endRaw && !isNaN(e1.getTime()) ? e1 : new Date(s0.getTime() + MINUTES * 60_000);
      const iso = (d: Date) => d.toISOString().replace(/\.\d{3}Z$/, "Z"); // 줌은 밀리초가 붙으면 시작 시각을 무시해요
      return { startIso: iso(s0), endIso: iso(e0), startMs: s0.getTime(), when: kstLabel(s0) };
    });
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !t) {
      return { skipped: true, reason: "missing-name-email-or-start", received: { name, email, start: startRaw } };
    }
    const when = t.when;
    const topic = (input.topic ?? "").trim();
    const concern = (input.concern ?? "").trim();
    const isTest = input.test === true || input.test === "true";
    const tag = isTest ? "[테스트] " : "";

    // 1) 줌 미팅 (Zoom API 직접 호출 — Zapier 기본 '미팅 만들기' 액션이 미팅 종류를 거부해서)
    const zoom = await ctx.step("create-zoom-meeting", async () =>
      sdk.runAction({
        appKey: "ZoomCLIAPI",
        actionType: "write",
        actionKey: "_zap_raw_request",
        connection: ZOOM,
        inputs: {
          method: "POST",
          url: "https://api.zoom.us/v2/users/me/meetings",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: `${tag}☕ Star of AI 커피챗 · ${name}`,
            type: 2,
            start_time: t.startIso,
            duration: MINUTES,
            timezone: "Asia/Seoul",
            agenda: `주제: ${topic || "-"}\n고민: ${concern || "-"}`.slice(0, 1900),
            settings: { join_before_host: false, waiting_room: false },
          }),
          fail_on_errors: "true",
        },
      }),
    );
    const meeting = findMeeting(zoom.data[0]);
    const joinUrl = meeting?.join_url ?? "";
    if (!joinUrl) throw new Error(`줌 미팅 생성 실패: ${JSON.stringify(zoom.data[0]).slice(-400)}`);

    // 2) 구글 캘린더 30분 일정 (신청자 초대)
    const cal = await ctx.step("create-calendar-event", async () =>
      sdk.runAction({
        appKey: "GoogleCalendarCLIAPI",
        actionType: "write",
        actionKey: "detailed_event",
        connection: GCAL,
        inputs: {
          calendarid: CALENDAR_ID,
          summary: `${tag}☕ 커피챗 · ${name}`,
          description: `[Star of AI 무료 커피챗]\n이름: ${name}\n메일: ${email}\n주제: ${topic || "-"}\n고민: ${concern || "-"}\n\n줌 링크: ${joinUrl}${meeting?.password ? `\n암호: ${meeting.password}` : ""}`,
          location: joinUrl,
          start__dateTime: t.startIso,
          end__dateTime: t.endIso,
          attendees: [email],
          reminders__useDefault: "yes",
          guestsCanModify: "no",
        },
      }),
    );
    const event = cal.data[0] as { id?: string; htmlLink?: string } | undefined;
    const eventId = event?.id ?? "";

    // 3) 감사·안내 메일
    const welcomeHtml = wrap(`
      <p style="font-size:12px;letter-spacing:.2em;color:#70631F;margin:0 0 12px">STAR OF AI · FREE COFFEE CHAT</p>
      <h2 style="color:#614215;margin:0 0 16px">${esc(name)}님, 커피챗 신청 감사합니다 ☕</h2>
      <p>바쁘신 와중에 시간 내어 신청해 주셔서 감사해요. 아래 일정으로 줌에서 뵐게요.</p>
      <p><b>${esc(when)}</b> · ${MINUTES}분 · 온라인(줌)</p>
      ${joinUrl ? button(joinUrl, "줌 미팅 참여하기") : ""}
      ${meeting?.password ? `<p style="font-size:13px">미팅 암호: <b>${esc(String(meeting.password))}</b></p>` : ""}
      <p style="font-size:14px">구글 캘린더 초대도 함께 보내드렸어요. 시작 1시간 전에 리마인드 메일을 한 번 더 드릴게요.</p>
      ${topic ? `<p style="font-size:14px">나누고 싶은 이야기: ${esc(topic)}</p>` : ""}
      <p style="font-size:14px">자동화하고 싶은 업무 화면이나 지금 쓰는 도구를 미리 떠올려 오시면 30분이 훨씬 알차져요.</p>
      <p style="font-size:14px;background:#FFF6C7;padding:12px 14px;border-radius:12px">혹시 일정이 어려워지시면 <b>이 메일에 답장으로 꼭 알려주세요.</b> 다른 시간으로 다시 잡아드릴게요.</p>`);

    await ctx.step("send-welcome-email", async () =>
      sdk.runAction({
        appKey: "GoogleMailV2CLIAPI",
        actionType: "write",
        actionKey: "message",
        connection: GMAIL,
        inputs: {
          to: [email],
          subject: `${tag}[Star of AI] 커피챗 예약 확정 · ${when}`,
          body: welcomeHtml,
          body_type: "html",
          from_name: FROM_NAME,
        },
      }),
    );

    // 4) 시작 1시간 전까지 대기
    const timing = await ctx.step("compute-reminder-wait", async () => ({
      waitSeconds: Math.floor((t.startMs - 60 * 60_000 - Date.now()) / 1000),
      started: t.startMs < Date.now(),
    }));
    if (timing.waitSeconds > 0) {
      await ctx.wait("wait-until-1h-before", timing.waitSeconds);
    } else if (timing.started) {
      return { zoom: joinUrl, eventId, reminder: "skipped-already-started" };
    }

    // 취소 확인: 캘린더에서 일정을 지웠으면 리마인드를 보내지 않아요
    const still = await ctx.step("check-event-still-scheduled", async () => {
      if (!eventId) return { exists: true, status: "unknown" };
      try {
        const r = await sdk.runAction({
          appKey: "GoogleCalendarCLIAPI",
          actionType: "search",
          actionKey: "event_by_id",
          connection: GCAL,
          inputs: { calendarid: CALENDAR_ID, event_id: eventId },
        });
        const ev = r.data[0] as { status?: string } | undefined;
        return { exists: !!ev && ev.status !== "cancelled", status: ev?.status ?? "missing" };
      } catch (e) {
        return { exists: false, status: `error: ${String(e).slice(0, 200)}` };
      }
    });
    if (!still.exists) {
      return { zoom: joinUrl, eventId, reminder: "skipped-event-cancelled", status: still.status };
    }

    const reminderHtml = wrap(`
      <p style="font-size:12px;letter-spacing:.2em;color:#70631F;margin:0 0 12px">STAR OF AI · REMINDER</p>
      <h2 style="color:#614215;margin:0 0 16px">${esc(name)}님, 1시간 뒤에 커피챗이 있어요 ☕</h2>
      <p><b>${esc(when)}</b> · ${MINUTES}분 · 온라인(줌)</p>
      ${joinUrl ? button(joinUrl, "줌 미팅 참여하기") : ""}
      ${meeting?.password ? `<p style="font-size:13px">미팅 암호: <b>${esc(String(meeting.password))}</b></p>` : ""}
      <p style="font-size:14px;background:#FFF6C7;padding:12px 14px;border-radius:12px">혹시 참석이 어려워지셨다면 <b>이 메일에 답장으로 꼭 알려주세요.</b> 미리 말씀해 주시면 다른 시간으로 다시 잡아드릴게요.</p>`);

    await ctx.step("send-reminder-email", async () =>
      sdk.runAction({
        appKey: "GoogleMailV2CLIAPI",
        actionType: "write",
        actionKey: "message",
        connection: GMAIL,
        inputs: {
          to: [email],
          subject: `${tag}[Star of AI] 1시간 뒤 커피챗 리마인드 · ${when}`,
          body: reminderHtml,
          body_type: "html",
          from_name: FROM_NAME,
        },
      }),
    );

    return { zoom: joinUrl, eventId, calendar: event?.htmlLink, reminder: "sent" };
  },
});

export default workflow;
