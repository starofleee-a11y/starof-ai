import { busyRanges, freeBusy, hasGoogle } from "./google";
import { candidateDays, removeBusy, type DaySlots } from "./slots";

/** 내일부터 2주 동안 커피챗이 가능한 시간. 구글 캘린더가 연결돼 있으면 (한가함 표시 일정까지) 겹치는 칸을 뺍니다. 매 요청마다 새로 읽어요. */
export async function getAvailability(): Promise<{ live: boolean; days: DaySlots[] }> {
  const days = candidateDays();
  if (!hasGoogle()) return { live: false, days };
  const from = new Date(`${days[0].date}T00:00:00+09:00`);
  const to = new Date(`${days[days.length - 1].date}T23:59:59+09:00`);
  const busy = (await busyRanges(from, to)) ?? (await freeBusy(from, to));
  if (!busy) return { live: false, days };
  return { live: true, days: removeBusy(days, busy) };
}
