// 신청 팝업을 여는 작은 이벤트 버스. 어느 버튼에서든 openApply()를 부르면 그 페이지의 ApplyModalHost가 열려요.
export type ApplyKind = "study" | "oneday" | "consulting" | "enterprise";

export const APPLY_OPEN = "apply:open";
export const APPLY_STATE = "apply:state"; // detail: boolean (열림/닫힘) — 플로팅 CTA가 숨고 다시 나타날 때 씁니다.

export function openApply(kind?: ApplyKind) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(APPLY_OPEN, { detail: kind }));
}
