// 상품·가격 정의. 결제 금액은 서버에서도 이 표로 다시 계산해서 위·변조를 막습니다.
export type PlanId = "study" | "consulting" | "enterprise"; // 홈 3대 플랜 (진단 추천에 쓰는 묶음)
export type ProductId = PlanId | "oneday";

export interface Product {
  id: ProductId;
  href: string;
  name: string;
  short: string;
  en: string;
  audience: string; // Starters / Workers / Company / Creators
  price: number; // 0이면 협의
  priceLabel: string;
  unit: string;
  summary: string;
  hook: string; // 플랜 카드의 한 줄 캐치프레이즈
  how: string; // 그 니즈를 어떻게 해결하는지
  bullets: string[];
  payable: boolean; // 사이트에서 바로 결제 가능한지
  cta: string;
  access?: string; // 강의 수강 가능 시점 (결제일로부터 12개월 이내)
}

export const PRODUCTS: Record<ProductId, Product> = {
  study: {
    id: "study",
    href: "/study",
    name: "자동화 기초 강의",
    short: "자동화 기초 클래스",
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
    access: "결제 후 확정된 기수 일정(3주 4회)에 수강 · 결제일로부터 12개월 이내",
  },
  oneday: {
    id: "oneday",
    href: "/oneday",
    name: "AI 콘텐츠 제작 원데이",
    short: "AI 콘텐츠 원데이",
    en: "AI Reels One-day",
    audience: "Creators",
    price: 59000,
    priceLabel: "59,000원",
    unit: "1인 · 11/29(일) 16:00–19:00 · 3시간",
    summary: "AI로 릴스 제작을 자동화해보는 3시간 원데이 클래스. 얼굴 합성 챌린지 영상부터 제품 홍보 영상, 스크립트, 자동화 워크플로우까지.",
    hook: "촬영 없이, 3시간 안에 릴스가 나와요",
    how: "AI 인물·제품 릴스를 직접 만들고, 노션 스크립트부터 제작까지 이어지는 자동화 워크플로우를 내 손으로 구축해요.",
    bullets: ["니온앤비욘 챌린지 영상에 내 얼굴 넣기", "촬영 없이 AI 제품 홍보 영상", "릴스 후킹 서사·스크립트 작성법", "릴스 자동화 워크플로우 직접 구축"],
    payable: true,
    cta: "원데이 신청하기",
    access: "11/29(일) 16:00–19:00 당일 수강 · 결제일로부터 12개월 이내",
  },
  consulting: {
    id: "consulting",
    href: "/consulting",
    name: "1:1 마케팅 자동화 컨설팅",
    short: "1:1 마케팅 자동화 컨설팅",
    en: "1:1 Marketing Automation",
    audience: "Workers",
    price: 300000,
    priceLabel: "300,000원",
    unit: "워크플로우 1개 · 컨설팅 3회",
    summary: "마케팅 담당자 혹은 1인 사업가를 위한 최적의 마케팅 자동화 프로세스 구축. 기획 > 디자인 > 업로드부터 성과 리포팅까지 컨설턴트가 직접 만들어 드립니다.",
    hook: "콘텐츠 제작, 99% 자동으로",
    how: "터지는 콘텐츠 공식부터 릴스·카드뉴스 자동화, 전환율·ROI 트래킹까지 내 마케팅 워크플로우를 완성해 드려요.",
    bullets: ["무료 커피챗으로 범위 진단", "컨설팅 3회 (오프라인 2회 · 온라인 1회)", "기획 > 디자인 > 업로드 자동화 대행", "전환율·ROI 리포팅까지 연결"],
    payable: false,
    cta: "1:1 컨설팅 신청하기",
    access: "홈페이지 결제창(PG) 결제 없음 · 계약 후 별도 정산",
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
export const FRIEND_DISCOUNT = 20000; // 지인할인 — 스터디 참가비 150,000원 → 130,000원

/** 지인할인이 적용되는 상품인지 */
export const hasFriendDiscount = (product: ProductId) => product === "study";

/** 결제 금액 계산 — 클라이언트와 서버가 같은 함수를 씁니다. friend = 지인할인 */
export function calcAmount(product: ProductId, qty: number, friend = false): number {
  const q = Math.max(1, Math.min(10, Math.floor(qty || 1)));
  const p = PRODUCTS[product];
  if (!p?.payable) return 0;
  const unit = friend && hasFriendDiscount(product) ? p.price - FRIEND_DISCOUNT : p.price;
  return unit * q;
}

export function orderName(product: ProductId, qty: number, friend = false) {
  if (product === "study") return `자동화 기초 강의 · 클로드 코드 스터디 (${qty}인${friend ? " · 지인할인" : ""})`;
  if (product === "oneday") return `AI 콘텐츠 제작 원데이 · 릴스 자동화 (${qty}인)`;
  return PRODUCTS[product].name;
}

export const won = (n: number) => n.toLocaleString("ko-KR") + "원";
