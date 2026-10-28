// 이력·후기 데이터. 출처: 강의 증빙 목록(2026.10), 성균관대 GSB 워크샵 만족도 설문(응답 28명)

export const STATS = [
  { value: 260, suffix: "명+", label: "누적 수강생", decimals: 0 },
  { value: 5, suffix: "곳", label: "기업 AX 컨설팅 · 교육", decimals: 0 },
  { value: 10, suffix: "건+", label: "서비스 기획 · 개발", decimals: 0 },
  { value: 9.57, suffix: "/10", label: "워크샵 지인 추천 의향", decimals: 2 },
];

export const LECTURES = [
  { date: "2026.10", org: "클로드 코드 업무 자동화 스터디 1기", title: "비개발자 직장인 3주 4회 스터디 기획·운영", people: 10, kind: "스터디" },
  { date: "2026.10", org: "(주)이노텍", title: "영업·보고서 작성 AI 자동화 교육 · 마케팅/영업 스크립트 자동화 컨설팅", people: 15, kind: "기업" },
  { date: "2026.09", org: "(주)태정", title: "클로드 코드 설치부터 첫 자동화 실습", people: 20, kind: "기업" },
  { date: "2026.09", org: "성균관대 경영전문대학원 (SKK GSB)", title: "클로드 코드 설치부터 실무 활용까지 3시간 워크샵 · 만족도 4.7/5", people: 70, kind: "대학" },
  { date: "2026.08", org: "(주)에스와이시너지", title: "AI로 일하는 방식 바꾸기: 임직원 AI 교육", people: 25, kind: "기업" },
  { date: "2026.09", org: "IT 연합동아리 DDD", title: "IT 취준생 1:1 취업 컨설팅", people: 10, kind: "커뮤니티" },
  { date: "2026.06", org: "IT 연합동아리 DDD", title: "클로드 코드 설치부터 첫 실행까지 실습 강의", people: 50, kind: "커뮤니티" },
  { date: "2026.01", org: "성균관대 경영전문대학원 (SKK GSB)", title: "Notion AI 활용 특강", people: 50, kind: "대학" },
];

export const AUTOMATIONS = [
  { title: "사내 AI 에이전트 도입", desc: "6시간 걸리던 반복 업무를 1시간으로. 인사 관리부터 재무 설계까지 사내 업무를 에이전트로 자동화", tag: "부동산 리츠 · 사내 AX" },
  { title: "입찰 자동화 · 에쿼티 시뮬레이터", desc: "입찰·시행 에쿼티 비율 시뮬레이터를 개발하고 월 100건 이상의 입찰 검토를 자동화", tag: "부동산 · 입찰" },
  { title: "HR 프로세스 자동화", desc: "제조 기업의 인사·근태 문서 흐름을 진단하고 반복되는 HR 업무를 자동화", tag: "제조 · HR" },
  { title: "마케팅 · 영업 스크립트 자동화", desc: "영업 보고서와 마케팅·영업 스크립트 작성을 클로드 코드로 자동화하는 컨설팅", tag: "영업 · 마케팅" },
  { title: "업무 자동화 스킬 6종", desc: "기획서 → 피그마 와이어프레임, 카드뉴스 제작, AI 리서치 → 노션·슬랙 등 바로 설치해 쓰는 클로드 코드 스킬", tag: "Claude Code Skills" },
  { title: "AI 서비스 기획 · 개발 10건+", desc: "웹툰 AI 어시스턴트, 글로벌 CS 플랫폼 등 AI 서비스를 기획부터 개발까지", tag: "IT 에이전시" },
];

export const CONSULTING = [
  { org: "(주)명심릿츠 · AX팀", period: "2025.01 ~ 현재", title: "사내 AX 전환", desc: "사내 AI 에이전트 도입으로 6시간 반복 업무를 1시간으로 단축. 인사부터 재무 설계까지 자동화하고 월 100건 이상 입찰을 자동화" },
  { org: "(주)이노텍", period: "2026.10", title: "마케팅·영업 스크립트 자동화 컨설팅", desc: "영업·보고서 작성 AI 자동화 교육과 함께 마케팅·영업 스크립트 자동화를 설계" },
  { org: "삼영기업", period: "2026.08", title: "HR 프로세스 자동화 컨설팅", desc: "인사 업무 프로세스를 진단하고 반복 업무 자동화 구축" },
  { org: "(주)에스와이시너지", period: "2026.08", title: "임직원 AI 전환 교육", desc: "전 직원 대상 ‘AI로 일하는 방식 바꾸기’ 교육과 부서별 활용 시나리오 설계" },
];

export const CAREER = [
  { period: "2024.07 ~", role: "대기만성 에이전시 대표", desc: "IT 개발 에이전시 · AX 컨설팅" },
  { period: "2025.01 ~", role: "(주)명심릿츠 AX팀 과장", desc: "사내 AI 에이전트 도입" },
  { period: "2023.03 ~ 2024.06", role: "(주)메타보라 서비스 기획자", desc: "카카오게임즈 계열 · 글로벌 서비스 런칭" },
  { period: "2025.08 ~", role: "성균관대 경영전문대학원 PMBA", desc: "성균관대 디자인학과 졸업" },
];

export const AWARDS = [
  "2026 조달청 아이디어 공모전 최우수상",
  "2021 원티드 해커톤 해커리어 브론즈",
  "2021 MakeUs 앱 디자인 경진대회 우수상",
  "2021 IBDA 커뮤니케이션 디자인 아이디어상",
];

export const COMMUNITY = [
  { label: "AI 콘텐츠 크리에이터 @starof_ai", value: "팔로워 2K · 누적 조회 50만+" },
  { label: "IT 커리어 동아리 DDD 운영", value: "누적 회원 500명+" },
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
