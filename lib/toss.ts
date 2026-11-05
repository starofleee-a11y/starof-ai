// 토스페이먼츠 결제위젯 키.
// 키를 넣기 전에는 토스 공식 문서의 '공개 테스트 키'로 동작합니다. (실제 돈이 나가지 않아요)
// 실결제 전환: Vercel에 live_gck_… (NEXT_PUBLIC_TOSS_CLIENT_KEY) 와 live_gsk_… (TOSS_SECRET_KEY) 를 둘 다 넣고 Redeploy.
const DOCS_TEST_CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const DOCS_TEST_SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

export const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY?.trim() || DOCS_TEST_CLIENT_KEY;
export const tossSecretKey = () => process.env.TOSS_SECRET_KEY?.trim() || DOCS_TEST_SECRET_KEY;
export const isTossTestMode = () => TOSS_CLIENT_KEY.startsWith("test_");

/** test = 테스트 결제, live = 실결제, mismatch = 클라이언트 키와 시크릿 키 종류가 달라 결제 승인이 실패하는 상태 */
export function tossMode(): "test" | "live" | "mismatch" {
  const client = TOSS_CLIENT_KEY.startsWith("live_") ? "live" : "test";
  const secret = tossSecretKey().startsWith("live_") ? "live" : "test";
  return client === secret ? client : "mismatch";
}
