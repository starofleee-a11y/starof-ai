// 구글 캘린더 연동 — 커피챗 빈 시간 조회, 일정(구글 미트 링크 포함) 생성·삭제.
// GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN 이 없으면 모든 함수가 null을 돌려주고 사이트는 기본 시간표로 동작합니다.
import { createHmac } from "crypto";

const CAL = () => process.env.GOOGLE_CALENDAR_ID?.trim() || "primary";
const API = "https://www.googleapis.com/calendar/v3";
export const SITE_TAG = "starofai-coffee"; // 사이트에서 만든 일정 표시

export function hasGoogle() {
  return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN);
}

let cached: { token: string; exp: number } | null = null;

async function accessToken(): Promise<string | null> {
  if (!hasGoogle()) return null;
  if (cached && cached.exp > Date.now() + 30_000) return cached.token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(8000),
  });
  const data = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string };
  if (!data.access_token) {
    console.error("[google] 토큰 발급 실패:", data.error);
    return null;
  }
  cached = { token: data.access_token, exp: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cached.token;
}

async function gfetch(path: string, init: RequestInit = {}) {
  const token = await accessToken();
  if (!token) return null;
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(init.headers || {}) },
    signal: AbortSignal.timeout(10000),
  });
  if (res.status === 204) return {};
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[google]", path, res.status, JSON.stringify(data).slice(0, 300));
    return null;
  }
  return data;
}

/** 바쁜 시간 구간 조회 (freeBusy) — '한가함'으로 표시한 일정은 빠지는 단점이 있어 busyRanges 를 먼저 씁니다. */
export async function freeBusy(timeMin: Date, timeMax: Date): Promise<{ start: Date; end: Date }[] | null> {
  const data = await gfetch("/freeBusy", {
    method: "POST",
    body: JSON.stringify({ timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString(), timeZone: "Asia/Seoul", items: [{ id: CAL() }] }),
  });
  if (!data) return null;
  const cals = (data.calendars ?? {}) as Record<string, { busy?: { start: string; end: string }[] }>;
  const busy = cals[CAL()]?.busy ?? Object.values(cals)[0]?.busy ?? [];
  return (busy as { start: string; end: string }[]).map((b) => ({ start: new Date(b.start), end: new Date(b.end) }));
}

let calListCache: { ids: string[]; exp: number } | null = null;

/** 캘린더 목록에서 켜 둔(selected) 캘린더 id — 공휴일 캘린더는 제외. 10분 캐시. */
async function calendarIds(): Promise<string[]> {
  if (calListCache && calListCache.exp > Date.now()) return calListCache.ids;
  const data = (await gfetch("/users/me/calendarList?minAccessRole=reader&fields=items(id,selected,accessRole)")) as
    | { items?: { id: string; selected?: boolean; accessRole?: string }[] }
    | null;
  const ids = (data?.items ?? [])
    .filter((c) => c.selected !== false && !/#holiday@|#contacts@/.test(c.id))
    .map((c) => c.id);
  const out = ids.length ? ids : [CAL()];
  calListCache = { ids: out, exp: Date.now() + 10 * 60_000 };
  return out;
}

interface GEvent {
  status?: string;
  eventType?: string;
  transparency?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
}

/**
 * 바쁜 시간 구간 — 켜 둔 모든 캘린더의 일정을 직접 읽어요.
 * 시간이 정해진 일정은 '한가함'으로 표시돼 있어도 막고(캘린더에 적어 둔 약속은 약속이니까),
 * 종일 일정은 '바쁨'으로 표시한 것만 하루 전체를 막아요.
 */
export async function busyRanges(timeMin: Date, timeMax: Date): Promise<{ start: Date; end: Date }[] | null> {
  const ids = await calendarIds();
  const q = new URLSearchParams({
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: "true",
    maxResults: "250",
    fields: "items(status,eventType,transparency,start,end)",
  });
  const results = await Promise.all(ids.map((id) => gfetch(`/calendars/${encodeURIComponent(id)}/events?${q}`) as Promise<{ items?: GEvent[] } | null>));
  if (results.every((r) => !r)) return null;
  const out: { start: Date; end: Date }[] = [];
  for (const r of results) {
    for (const ev of r?.items ?? []) {
      if (ev.status === "cancelled") continue;
      if (ev.eventType === "workingLocation" || ev.eventType === "birthday") continue;
      if (ev.start?.dateTime && ev.end?.dateTime) {
        out.push({ start: new Date(ev.start.dateTime), end: new Date(ev.end.dateTime) });
      } else if (ev.start?.date && ev.end?.date && ev.transparency !== "transparent") {
        out.push({ start: new Date(`${ev.start.date}T00:00:00+09:00`), end: new Date(`${ev.end.date}T00:00:00+09:00`) });
      }
    }
  }
  return out;
}

export interface CoffeeEvent {
  id: string;
  meetLink?: string;
  htmlLink?: string;
  start: string;
  end: string;
  attendee?: string;
  name?: string;
}

/** 커피챗 일정 생성 — 구글 미트 링크 자동 생성, 신청자에게 초대 메일 발송 */
export async function createCoffeeEvent(opts: {
  name: string;
  email: string;
  start: Date;
  end: Date;
  topic: string;
  concern: string;
}): Promise<CoffeeEvent | null> {
  const fixedLink = process.env.MEETING_LINK?.trim(); // 줌 개인 회의실 등 고정 링크를 쓰고 싶을 때
  const body: Record<string, unknown> = {
    summary: `☕ 커피챗 · ${opts.name}`,
    description: `[Star of AI 무료 커피챗]\n이름: ${opts.name}\n메일: ${opts.email}\n주제: ${opts.topic}\n고민: ${opts.concern || "-"}${fixedLink ? `\n\n미팅 링크: ${fixedLink}` : ""}`,
    start: { dateTime: opts.start.toISOString(), timeZone: "Asia/Seoul" },
    end: { dateTime: opts.end.toISOString(), timeZone: "Asia/Seoul" },
    attendees: [{ email: opts.email, displayName: opts.name }],
    reminders: { useDefault: false, overrides: [{ method: "email", minutes: 24 * 60 }, { method: "popup", minutes: 30 }] },
    extendedProperties: { private: { site: SITE_TAG, name: opts.name, email: opts.email } },
    guestsCanModify: false,
  };
  if (fixedLink) body.location = fixedLink;
  else body.conferenceData = { createRequest: { requestId: `coffee-${Date.now()}`, conferenceSolutionKey: { type: "hangoutsMeet" } } };

  const data = await gfetch(`/calendars/${encodeURIComponent(CAL())}/events?conferenceDataVersion=1&sendUpdates=all`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!data?.id) return null;
  return {
    id: data.id,
    meetLink: fixedLink || data.hangoutLink,
    htmlLink: data.htmlLink,
    start: data.start?.dateTime,
    end: data.end?.dateTime,
    attendee: opts.email,
    name: opts.name,
  };
}

export async function getCoffeeEvent(id: string): Promise<(CoffeeEvent & { status?: string; reminded?: boolean }) | null> {
  const d = await gfetch(`/calendars/${encodeURIComponent(CAL())}/events/${encodeURIComponent(id)}`);
  if (!d?.id) return null;
  const p = d.extendedProperties?.private ?? {};
  return {
    id: d.id,
    meetLink: process.env.MEETING_LINK?.trim() || d.hangoutLink,
    htmlLink: d.htmlLink,
    start: d.start?.dateTime,
    end: d.end?.dateTime,
    attendee: p.email,
    name: p.name,
    status: d.status,
    reminded: p.reminded === "1",
  };
}

export async function cancelCoffeeEvent(id: string) {
  const r = await gfetch(`/calendars/${encodeURIComponent(CAL())}/events/${encodeURIComponent(id)}?sendUpdates=all`, { method: "DELETE" });
  return r !== null;
}

/** 사이트에서 만든 일정 중 특정 구간에 시작하는 것들 (리마인드용) */
export async function listCoffeeEvents(from: Date, to: Date) {
  const q = new URLSearchParams({
    timeMin: from.toISOString(),
    timeMax: to.toISOString(),
    singleEvents: "true",
    privateExtendedProperty: `site=${SITE_TAG}`,
  });
  const d = await gfetch(`/calendars/${encodeURIComponent(CAL())}/events?${q}`);
  if (!d?.items) return [];
  return (d.items as Array<Record<string, any>>) // eslint-disable-line @typescript-eslint/no-explicit-any
    .filter((e) => e.status !== "cancelled")
    .map((e) => ({
      id: e.id as string,
      meetLink: (process.env.MEETING_LINK?.trim() || e.hangoutLink) as string | undefined,
      start: e.start?.dateTime as string,
      end: e.end?.dateTime as string,
      attendee: e.extendedProperties?.private?.email as string | undefined,
      name: e.extendedProperties?.private?.name as string | undefined,
      reminded: e.extendedProperties?.private?.reminded === "1",
    }));
}

export async function markReminded(id: string) {
  return gfetch(`/calendars/${encodeURIComponent(CAL())}/events/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ extendedProperties: { private: { reminded: "1" } } }),
  });
}

/** 취소 링크 서명 — 아무나 일정을 지우지 못하게 */
const secret = () => process.env.APP_SECRET || process.env.GOOGLE_CLIENT_SECRET || "starofai-dev-secret";
export const signId = (id: string) => createHmac("sha256", secret()).update(id).digest("hex").slice(0, 24);
export const cancelUrl = (origin: string, id: string) => `${origin}/api/coffee-chat/cancel?id=${encodeURIComponent(id)}&t=${signId(id)}`;
