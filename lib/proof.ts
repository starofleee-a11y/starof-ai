// 이력·후기 데이터. 출처: 이력서(2026.10), 강의 증빙 목록, 성균관대 GSB 워크샵 만족도 설문(응답 28명)

export const STATS = [
  { value: 260, suffix: "명+", label: "누적 수강생", decimals: 0 },
  { value: 10, suffix: "회+", label: "기업·교육기관 AI 강의", decimals: 0 },
  { value: 5, suffix: "곳", label: "기업 AX 컨설팅·교육", decimals: 0 },
  { value: 9.57, suffix: "/10", label: "수강생 추천 의향", decimals: 2 },
];

/** 스크롤하며 읽는 설득형 성과. 기업 AX 효과 → 강의 만족도 순서 */
export const RESULTS = [
  {
    kind: "AX 컨설팅",
    org: "부동산 리츠 기업 · 사내 AX",
    big: "6시간 → 1시간",
    title: "사내 AI 에이전트로 반복 업무 83% 단축",
    desc: "인사 관리부터 재무 설계까지, 매번 손으로 하던 업무를 에이전트에게 맡겼습니다. 담당자는 검토만 합니다.",
  },
  {
    kind: "AX 컨설팅",
    org: "부동산 · 입찰",
    big: "월 100건+",
    title: "입찰 검토와 에쿼티 시뮬레이션 자동화",
    desc: "입찰·시행 에쿼티 비율 시뮬레이터를 만들고, 월 100건이 넘는 입찰 검토를 자동으로 돌아가게 했습니다.",
  },
  {
    kind: "AX 교육",
    org: "제조 · 영업 · 건설 기업 5곳",
    big: "5곳",
    title: "전 직원 AI 교육과 부서별 자동화 설계",
    desc: "이노텍, 태정, 에스와이시너지, 삼영기업, 명심릿츠. 임직원 교육과 함께 마케팅·영업·HR 업무 자동화를 설계했습니다.",
  },
  {
    kind: "강의",
    org: "성균관대 GSB 워크샵 · 응답 28명",
    big: "4.68 / 5",
    title: "입문자 64%가 실습을 끝까지 완주",
    desc: "클로드 코드를 처음 접한 분이 절반 넘게 참여했는데도 실습 완주율 86%, 지인 추천 의향 9.57점을 받았습니다.",
  },
];

export const LECTURES = [
  { date: "2026.10", org: "클로드 코드 업무 자동화 스터디 1기", title: "비개발자 직장인 3주 4회 스터디 기획·운영", people: 10, kind: "스터디" },
  { date: "2026.10", org: "(주)이노텍", title: "영업·보고서 작성 AI 자동화 교육 · 마케팅/영업 스크립트 자동화 컨설팅", people: 15, kind: "기업" },
  { date: "2026.09", org: "(주)태정", title: "클로드 코드 설치부터 첫 자동화 실습", people: 20, kind: "기업" },
  { date: "2026.09", org: "성균관대 경영전문대학원 (SKK GSB)", title: "클로드 코드 설치부터 실무 활용까지 3시간 워크샵 · 만족도 4.7/5", people: 70, kind: "대학" },
  { date: "2026.08", org: "(주)에스와이시너지", title: "AI로 일하는 방식 바꾸기: 임직원 AI 교육", people: 25, kind: "기업" },
  { date: "2026.01", org: "성균관대 경영전문대학원 (SKK GSB)", title: "Notion AI 활용 특강", people: 50, kind: "대학" },
];

/** 1:1 AX 컨설팅 상세의 사례. image는 public/images/cases/ 에 캡처를 넣고 경로를 적으세요. (없으면 텍스트 패널로 표시) */
export interface CaseStudy {
  id: string;
  org: string;
  tag: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
  image?: string;
}

export const CASES: CaseStudy[] = [
  {
    id: "agent",
    image: "/images/cases/agent.jpg",
    org: "(주)명심릿츠 · AX팀",
    tag: "사내 AI 에이전트",
    title: "6시간 걸리던 반복 업무를 1시간으로",
    problem: "인사 관리, 재무 설계, 보고서 작성처럼 매주 반복되는 업무에 담당자 한 명이 하루의 대부분을 쓰고 있었습니다.",
    solution: "업무 흐름을 단계별로 쪼개고, 클로드 코드 에이전트가 자료 수집·정리·초안 작성을 맡도록 스킬을 설계했습니다. 담당자는 결과만 검토합니다.",
    result: "6시간 → 1시간. 남은 시간은 검토와 의사결정에 쓰고, 에이전트는 매주 같은 품질로 돌아갑니다.",
    metric: "-83%",
    metricLabel: "업무 시간",
  },
  {
    id: "bid",
    image: "/images/cases/bid.jpg",
    org: "(주)명심릿츠 · 입찰",
    tag: "입찰 자동화",
    title: "월 100건 넘는 입찰 검토를 자동으로",
    problem: "공고마다 조건을 읽고 에쿼티 비율을 계산해 참여 여부를 정하는 데 시간이 걸렸고, 사람마다 기준이 조금씩 달랐습니다.",
    solution: "입찰·시행 에쿼티 비율 시뮬레이터를 개발하고, 공고 수집부터 1차 검토까지 자동화 파이프라인으로 연결했습니다.",
    result: "월 100건 이상의 입찰을 같은 기준으로 검토합니다. 사람은 통과한 건만 봅니다.",
    metric: "100건+",
    metricLabel: "월 자동 검토",
  },
  {
    id: "sales",
    image: "/images/cases/sales.jpg",
    org: "(주)이노텍",
    tag: "마케팅 · 영업",
    title: "영업 보고서와 스크립트 작성 자동화",
    problem: "영업팀 15명이 보고서와 고객별 마케팅·영업 스크립트를 매번 처음부터 썼습니다.",
    solution: "임직원 교육으로 클로드 코드를 익히게 한 뒤, 고객 데이터를 넣으면 보고서와 스크립트 초안이 나오는 워크플로우를 셋팅했습니다.",
    result: "교육 당일부터 팀 전체가 같은 템플릿으로 초안을 뽑고, 사람은 다듬기만 합니다.",
    metric: "15명",
    metricLabel: "영업팀 전원 적용",
  },
  {
    id: "hr",
    image: "/images/cases/hr.jpg",
    org: "삼영기업",
    tag: "HR 프로세스",
    title: "인사·근태 문서 흐름 자동화",
    problem: "제조 현장의 인사·근태 문서가 여러 사람 손을 거치며 누락과 중복이 생겼습니다.",
    solution: "문서 흐름을 진단해 반복 구간을 찾고, 수집·정리·알림이 자동으로 이어지도록 구축했습니다.",
    result: "담당자가 문서를 찾아다니지 않고, 정해진 시간에 정리된 결과를 받습니다.",
    metric: "자동화",
    metricLabel: "HR 반복 구간",
  },
];

export const CONSULTING = [
  { org: "(주)명심릿츠 · AX팀", period: "2025.01 ~ 현재", title: "사내 AX 전환", desc: "사내 AI 에이전트 도입으로 6시간 반복 업무를 1시간으로 단축. 인사부터 재무 설계까지 자동화하고 월 100건 이상 입찰을 자동화" },
  { org: "(주)이노텍", period: "2026.10", title: "마케팅·영업 스크립트 자동화 컨설팅", desc: "영업·보고서 작성 AI 자동화 교육과 함께 마케팅·영업 스크립트 자동화를 설계" },
  { org: "삼영기업", period: "2026.08", title: "HR 프로세스 자동화 컨설팅", desc: "인사 업무 프로세스를 진단하고 반복 업무 자동화 구축" },
  { org: "(주)에스와이시너지", period: "2026.08", title: "임직원 AI 전환 교육", desc: "전 직원 대상 ‘AI로 일하는 방식 바꾸기’ 교육과 부서별 활용 시나리오 설계" },
];

export const CAREER = [
  { period: "2024.07 ~", role: "대기만성 에이전시 대표", desc: "IT 기획·개발 에이전시 · AX 컨설팅" },
  { period: "2025.01 ~", role: "(주)명심릿츠 AX팀 과장", desc: "사내 AI 에이전트 도입" },
  { period: "2023.03 ~ 2024.06", role: "(주)메타보라 서비스 기획자", desc: "카카오게임즈 계열 · 글로벌 서비스 런칭" },
  { period: "2025.08 ~", role: "성균관대 경영전문대학원 PMBA", desc: "성균관대 디자인학과 졸업" },
];

export interface Review {
  quote: string;
  who: string;
  score: number;
}

// 설문 원문을 그대로 옮기되, 개인 식별 정보는 넣지 않았습니다.
export const REVIEWS: Review[] = [
  { quote: "MCP, Zapier 등 들어만 본 것들을 이론이 아닌 현실로 만들어 줘서 너무 좋았어요.", who: "현장 참여 · 클로드 코드 입문자", score: 10 },
  { quote: "Starter들에게 딱 적당한 볼륨의, 꼭 필요한 강의였습니다!", who: "온라인 참여 · 이름만 알던 분", score: 10 },
  { quote: "실제 업무에서 클로드를 어떻게 사용하면 될지 충분히 감이 잡혔습니다.", who: "온라인 참여 · 이름만 알던 분", score: 10 },
  { quote: "직무에 맞는 공식 스킬과 플러그인을 설치하고 활용하는 방법을 배울 수 있어서 좋았습니다.", who: "현장 참여 · 조금 써본 분", score: 9 },
  { quote: "실용적인 실습! 실제로 업무에 바로 적용 가능해요.", who: "현장 참여 · 이름만 알던 분", score: 8 },
  { quote: "클로드 코드를 처음 써봤는데 개념부터 이해할 수 있어서 좋았습니다.", who: "현장 참여 · 조금 써본 분", score: 10 },
  { quote: "코드가 일반 클로드와 뭐가 다른지 궁금했는데, 확실히 알고 갑니다!", who: "현장 참여 · 조금 써본 분", score: 10 },
  { quote: "스킬을 직접 써볼 수 있어서 좋았어요.", who: "현장 참여 · 조금 써본 분", score: 10 },
  { quote: "Not at all!! Perfecto!", who: "현장 참여 · 이름만 알던 분", score: 10 },
  { quote: "초보로서 어떻게 사용해야 할지 잘 알게 되었습니다.", who: "온라인 참여 · 이름만 알던 분", score: 7 },
  { quote: "어떻게 써야겠다는 실무적 활용법을 얻어갑니다.", who: "온라인 참여 · 이름만 알던 분", score: 10 },
  { quote: "실습을 바로 할 수 있다는 점이 가장 좋았어요.", who: "온라인 참여 · 이름만 알던 분", score: 9 },
];

export const SURVEY = {
  source: "성균관대 GSB 클로드 코드 워크샵 만족도 설문 (2026.09, 응답 28명)",
  overall: 4.68,
  theory: 4.86,
  practice: 4.68,
  recommend: 9.57,
  beginners: 64, // 입문자 비율 %
  completion: 86, // 실습 완주율 %
};
