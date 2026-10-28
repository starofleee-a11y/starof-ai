// 토스페이먼츠 결제위젯 키.
// 키를 넣기 전에는 토스 공식 문서의 '공개 테스트 키'로 동작합니다. (실제 돈이 나가지 않아요)
const DOCS_TEST_CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const DOCS_TEST_SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

export const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || DOCS_TEST_CLIENT_KEY;
export const tossSecretKey = () => process.env.TOSS_SECRET_KEY || DOCS_TEST_SECRET_KEY;
export const isTossTestMode = () => TOSS_CLIENT_KEY.startsWith("test_");
