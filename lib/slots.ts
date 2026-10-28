// 커피챗 시간표 규칙. 요일별로 열어 둘 시간을 적으면 구글 캘린더의 일정과 겹치는 칸은 자동으로 빠집니다.
// 요일: 0=일 1=월 2=화 3=수 4=목 5=금 6=토
export const SLOT_RULES: Record<number, string[]> = {
  1: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "20:00"],
  2: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "20:00"],
  3: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "20:00"],
  4: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "20:00"],
  5: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
  6: ["14:00", "15:00", "16:00"],
  0: [],
};
export const SLOT_MINUTES = 30; // 커피챗 길이 (안내용)
export const EVENT_MINUTES = 60; // 캘린더에 잡는 일정 길이 — 앞뒤 여유를 포함해 1시간을 막아요
export const FIRST_DAY_OFFSET = 1; // 오늘은 제외, 내일부터
export const DAYS_AHEAD = 14; // 내일부터 14일까지
export const MIN_LEAD_HOURS = 0; // 추가 리드타임 (내일부터라 0)

const KST = "Asia/Seoul";

/** KST 기준 YYYY-MM-DD */
export function kstDate(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: KST, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
}
export function kstWeekday(dateStr: string) {
  return new Date(`${dateStr}T12:00:00+09:00`).getUTCDay(); // 정오 기준이라 요일이 어긋나지 않음
}
export const toDate = (date: string, time: string) => new Date(`${date}T${time}:00+09:00`);
export const addMinutes = (d: Date, m: number) => new Date(d.getTime() + m * 60_000);

export interface DaySlots {
  date: string; // YYYY-MM-DD
  weekday: number;
  slots: string[]; // "HH:MM"
}

/** 내일부터 14일간의 모든 후보 칸 (바쁜 시간 제외 전) */
export function candidateDays(now = new Date()): DaySlots[] {
  const out: DaySlots[] = [];
  const minStart = now.getTime() + MIN_LEAD_HOURS * 3600_000;
  const start = new Date(`${kstDate(now)}T00:00:00+09:00`);
  for (let i = FIRST_DAY_OFFSET; i < FIRST_DAY_OFFSET + DAYS_AHEAD; i++) {
    const date = kstDate(new Date(start.getTime() + i * 86400_000 + 12 * 3600_000));
    const weekday = kstWeekday(date);
    const slots = (SLOT_RULES[weekday] ?? []).filter((t) => toDate(date, t).getTime() >= minStart);
    out.push({ date, weekday, slots });
  }
  return out;
}

/** 바쁜 구간과 겹치는 칸 제거 — 1시간 일정이 들어갈 자리가 비어 있어야 해요 */
export function removeBusy(days: DaySlots[], busy: { start: Date; end: Date }[]): DaySlots[] {
  return days.map((d) => ({
    ...d,
    slots: d.slots.filter((t) => {
      const s = toDate(d.date, t).getTime();
      const e = s + EVENT_MINUTES * 60_000;
      return !busy.some((b) => b.start.getTime() < e && b.end.getTime() > s);
    }),
  }));
}

export function isValidSlot(days: DaySlots[], date: string, time: string) {
  return !!days.find((d) => d.date === date)?.slots.includes(time);
}

export function fmtKst(d: Date) {
  return new Intl.DateTimeFormat("ko-KR", { timeZone: KST, month: "long", day: "numeric", weekday: "short", hour: "2-digit", minute: "2-digit" }).format(d);
}
