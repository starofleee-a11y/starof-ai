// 상품·가격 정의. 결제 금액은 서버에서도 이 표로 다시 계산해서 위·변조를 막습니다.
export type ProductId = "study" | "workflow" | "enterprise";

export interface Product {
  id: ProductId;
  href: string;
  name: string;
  short: string;
  en: string;
  price: number; // 1인(또는 1개) 기준
  priceLabel: string;
  unit: string;
  summary: string;
  bullets: string[];
  payable: boolean; // 사이트에서 바로 결제 가능한지
}

export const PRODUCTS: Record<ProductId, Product> = {
  study: {
    id: "study",
    href: "/study",
    name: "클로드 코드 설치 & 스터디 과외",
    short: "클로드 코드 스터디",
    en: "Claude Code Study",
    price: 200000,
    priceLabel: "200,000원",
    unit: "1인 · 4회 총 4시간",
    summary: "설치부터 내 업무 자동화 1개 완성까지, 1:1 또는 소그룹으로 4번 만나 끝냅니다.",
    bullets: ["4회 · 회당 1시간 (온라인/오프라인)", "설치·세팅을 옆에서 같이", "내 업무 자동화 1개 완성", "2인 이상 단체 할인"],
    payable: true,
  },
  workflow: {
    id: "workflow",
    href: "/workflow",
    name: "개인 자동화 워크플로우 셋팅 대행",
    short: "자동화 셋팅 대행",
    en: "Workflow Setup",
    price: 300000,
    priceLabel: "300,000원",
    unit: "워크플로우 1개당 · 미팅 3회",
    summary: "배우는 대신 맡기세요. 킥오프부터 핸드오프까지, 자동화 시스템을 직접 만들어 셋팅해 드립니다.",
    bullets: ["미팅 3회 · 총 3시간", "자동화 시스템 개발·셋팅 대행", "킥오프 → 중간 셋팅 → 최종 핸드오프", "사용 가이드 문서 제공"],
    payable: true,
  },
  enterprise: {
    id: "enterprise",
    href: "/enterprise",
    name: "기업 자동화 시스템 강의 & AX 컨설팅",
    short: "기업 AX",
    en: "Enterprise AX",
    price: 500000,
    priceLabel: "500,000원~",
    unit: "기업 규모·의뢰 범위에 따라 협의",
    summary: "임직원 AI 교육부터 부서 단위 자동화 구축까지. 조직에 맞춰 설계합니다.",
    bullets: ["임직원 AI 실습 교육", "부서별 업무 자동화 진단", "자동화 시스템 구축·운영 이관", "강의 + 컨설팅 패키지"],
    payable: false,
  },
};

// 스터디 단체 할인 (인원 → 1인당 금액). 정책이 바뀌면 여기만 수정하세요.
export const STUDY_GROUP_PRICES = [
  { min: 1, perPerson: 200000, label: "1인" },
  { min: 2, perPerson: 180000, label: "2~3인 (10% 할인)" },
  { min: 4, perPerson: 160000, label: "4인 이상 (20% 할인)" },
];

export function studyPerPerson(people: number) {
  let p = STUDY_GROUP_PRICES[0].perPerson;
  for (const tier of STUDY_GROUP_PRICES) if (people >= tier.min) p = tier.perPerson;
  return p;
}

/** 결제 금액 계산 — 클라이언트와 서버가 같은 함수를 씁니다. */
export function calcAmount(product: ProductId, qty: number): number {
  const q = Math.max(1, Math.min(20, Math.floor(qty || 1)));
  if (product === "study") return studyPerPerson(q) * q;
  if (product === "workflow") return PRODUCTS.workflow.price * q;
  return 0;
}

export function orderName(product: ProductId, qty: number) {
  if (product === "study") return `클로드 코드 스터디 과외 (${qty}인)`;
  if (product === "workflow") return `자동화 워크플로우 셋팅 대행 (${qty}개)`;
  return PRODUCTS[product].name;
}

export const won = (n: number) => n.toLocaleString("ko-KR") + "원";
