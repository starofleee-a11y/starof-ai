// 신청을 구글 시트 "[Starofai] 고객 주소록" › '강의 신청' 탭에 한 줄씩 쌓아요.
// 커피챗 자동화와 같은 Zapier 웹훅(ZAPIER_COFFEE_HOOK_URL)으로 action: "apply" 를 보내면
// Zapier 워크플로우가 시트에 행을 추가합니다. 웹훅이 없거나 실패해도 신청 자체는 막지 않아요.
export interface ApplicationRow {
  course: string; // 신청 강의
  cohort?: string; // 기수 · 일정
  name: string;
  phone?: string;
  email?: string;
  job?: string;
  topic?: string;
  price?: string;
  status?: string; // 입금 대기 · 결제 완료 · 상담 대기 …
  note?: string;
  /** 진행일 YYYY-MM-DD — 시트 정렬 기준 */
  classDate?: string;
}

export async function logApplication(row: ApplicationRow): Promise<boolean> {
  const hook = process.env.ZAPIER_COFFEE_HOOK_URL?.trim();
  if (!hook) {
    console.warn("[sheets] ZAPIER_COFFEE_HOOK_URL 미설정 — 시트 기록 건너뜀");
    return false;
  }
  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "starof-ai.com", action: "apply", at: new Date().toISOString(), ...row }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) console.error("[sheets] 웹훅 실패:", res.status);
    return res.ok;
  } catch (e) {
    console.error("[sheets] 웹훅 오류:", e);
    return false;
  }
}
