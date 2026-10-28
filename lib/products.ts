// 상품·가격 정의. 결제 금액은 서버에서도 이 표로 다시 계산해서 위·변조를 막습니다.
export type ProductId = "study" | "consulting" | "enterprise";

export interface Product {
  id: ProductId;
  href: string;
  name: string;
  short: string;
  en: string;
  audience: string; // Starters / Workers / Company
  price: number; // 0이면 협의
  priceLabel: string;
  unit: string;
  summary: string;
  hook: string; // 플랜 카드의 한 줄 캐치프레이즈
  how: string; // 그 니즈를 어떻게 해결하는지
  bullets: string[];
  payable: boolean; // 사이트에서 바로 결제 가능한지
  cta: string;
}

export const PRODUCTS: Record<ProductId, Product> = {
  study: {
    id: "study",
    href: "/study",
    name: "자동화 기초 강의",
    short: "자동화 기초 강의",
    en: "Claude Code Study",
    audience: "Starters",
    price: 150000,
    priceLabel: "150,000원",
    unit: "1인 · 3주 4회 · 회당 2~2.5시간",
    summary: "클로드 코드 설치부터 내 업무 자동화 발표까지. 7~10명 소수 정원으로 함께하는 3주 스터디예요.",
    hook: "설치부터 막혀도 괜찮아요",
    how: "셋팅을 같이 끝내고, 3주 뒤엔 내 업무 자동화를 직접 완성해 발표해요.",
    bullets: ["오프라인 2회 + 온라인 2회", "설치·터미널·권한 셋팅 동행", "내 업무 자동화 직접 완성·발표", "4회 전부 참석 시 30,000원 환급"],
    payable: true,
    cta: "스터디 신청하기",
  },
  consulting: {
    id: "consulting",
    href: "/consulting",
    name: "1:1 AX 컨설팅",
    short: "1:1 AX 컨설팅",
    en: "1:1 AX Consulting",
    audience: "Workers",
    price: 300000,
    priceLabel: "300,000원",
    unit: "워크플로우 1개 · 컨설팅 3회",
    summary: "자동화 가능한 범위 상담부터 최적화된 AI 워크플로우 구축·셋팅까지, 컨설턴트가 직접 만들어 드립니다.",
    hook: "자동화는 컨설턴트가 대신 만들어요",
    how: "범위 진단부터 구축·셋팅·보완까지, 내 업무용 워크플로우 1개를 완성해 드려요.",
    bullets: ["무료 커피챗으로 범위 진단", "컨설팅 3회 (오프라인 2회 · 온라인 1회)", "개발·셋팅은 컨설턴트가 대행", "수정·오류 보완까지 포함"],
    payable: false,
    cta: "무료 커피챗으로 시작",
  },
  enterprise: {
    id: "enterprise",
    href: "/enterprise",
    name: "기업 AX 강의 · 컨설팅",
    short: "기업 AX",
    en: "Enterprise AX",
    audience: "Company",
    price: 0,
    priceLabel: "비용 협의",
    unit: "원데이 강의 · AX 컨설팅 · 맞춤 SaaS 개발",
    summary: "조직 전사의 일하는 방식을 AX로 바꿉니다. 기업 맞춤 자동화 시스템을 설계·개발합니다.",
    hook: "조직 전체의 일하는 방식을 바꿔요",
    how: "임직원 교육부터 부서 맞춤 자동화·SaaS 개발까지, 기업 단위로 설계해요.",
    bullets: ["기업 AI 원데이 강의", "기업 AX 컨설팅", "기업 맞춤 SaaS 개발", "규모·범위에 따라 견적"],
    payable: false,
    cta: "기업 문의하기",
  },
};

export const STUDY_REFUND = 30000; // 4회 전부 참석 시 환급액

/** 결제 금액 계산 — 클라이언트와 서버가 같은 함수를 씁니다. */
export function calcAmount(product: ProductId, qty: number): number {
  const q = Math.max(1, Math.min(10, Math.floor(qty || 1)));
  if (product === "study") return PRODUCTS.study.price * q;
  return 0;
}

export function orderName(product: ProductId, qty: number) {
  if (product === "study") return `자동화 기초 강의 · 클로드 코드 스터디 (${qty}인)`;
  return PRODUCTS[product].name;
}

export const won = (n: number) => n.toLocaleString("ko-KR") + "원";
