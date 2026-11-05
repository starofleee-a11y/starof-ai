// 구글 시트 기록 — 사이트의 모든 신청을 [Starofai] 고객 주소록 시트로 보냅니다.
// 시트에 붙인 Apps Script 웹앱(scripts/google-sheets/Code.gs)이 받아서
//   1) "강의 신청" 탭에 한 줄 추가
//   2) "고객 주소록" 탭에 새 고객 추가 (이미 있으면 세부 내용에 이어 적기)
// 를 해요. SHEETS_WEBHOOK_URL 이 없으면 조용히 건너뜁니다.

export type SheetKind = "pdf" | "study" | "oneday" | "consulting" | "enterprise" | "coffee" | "payment";

export interface SheetRecord {
  kind: SheetKind;
  name?: string;
  email?: string;
  phone?: string;
  job?: string; // 하는 일 · 회사
  detail?: string; // 신청 내용 (자동화 주제, 문의 내용, 받은 자료 등)
  amount?: number; // 참가비 (원)
  friend?: string; // 지인할인 추천인
  extra?: string; // 기타 (Pro 구독·참석 가능 여부, 커피챗 일시 등)
  product?: string; // 결제 기록용: study / oneday
  orderId?: string;
  method?: string; // 결제수단
  test?: boolean; // 토스 테스트 결제
}

export function hasSheets() {
  return !!process.env.SHEETS_WEBHOOK_URL?.startsWith("https://script.google.com/");
}

export async function recordToSheet(r: SheetRecord): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL?.trim();
  if (!url?.startsWith("https://script.google.com/")) {
    console.warn("[sheets] SHEETS_WEBHOOK_URL 미설정 — 시트 기록 건너뜀:", r.kind, r.email);
    return false;
  }
  try {
    // Apps Script는 처리 후 302로 결과 페이지를 돌려줘요. fetch가 따라가서 JSON을 받습니다.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret: process.env.SHEETS_SECRET?.trim() || "", ...r }),
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!data.ok) console.error("[sheets] 기록 실패:", res.status, data.error);
    return !!data.ok;
  } catch (e) {
    console.error("[sheets] 오류:", e);
    return false;
  }
}
