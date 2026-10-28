// 이력·후기 데이터. 출처: 강의 증빙 목록(2026.10), 성균관대 GSB 워크샵 만족도 설문(응답 28명)

export const STATS = [
  { value: 239, suffix: "명", label: "2026 누적 수강생", decimals: 0 },
  { value: 7, suffix: "곳", label: "대학·기업·커뮤니티 출강", decimals: 0 },
  { value: 4.68, suffix: "/5", label: "GSB 워크샵 전체 만족도", decimals: 2 },
  { value: 9.57, suffix: "/10", label: "지인 추천 의향", decimals: 2 },
];

export const LECTURES = [
  { date: "2026.10", org: "클로드 코드 업무 자동화 스터디 1기", title: "비개발자 직장인 3주 4회 스터디 기획·운영", people: 9, kind: "스터디" },
  { date: "2026.10", org: "(주)이노텍", title: "영업·보고서 작성 AI 자동화 교육", people: 15, kind: "기업" },
  { date: "2026.09", org: "(주)태정", title: "클로드 코드 설치부터 첫 자동화 실습", people: 20, kind: "기업" },
  { date: "2026.09", org: "성균관대 경영전문대학원 (SKK GSB)", title: "클로드 코드 설치부터 실무 활용까지 3시간 워크샵 · 만족도 4.7/5", people: 70, kind: "대학" },
  { date: "2026.08", org: "(주)에스와이시너지", title: "AI로 일하는 방식 바꾸기: 임직원 AI 교육", people: 25, kind: "기업" },
  { date: "2026.06", org: "IT 연합동아리 DDD", title: "클로드 코드 설치부터 첫 실행까지 실습 강의", people: 50, kind: "커뮤니티" },
  { date: "2026.01", org: "성균관대 경영전문대학원 (SKK GSB)", title: "Notion AI 활용 특강", people: 50, kind: "대학" },
];

export const AUTOMATIONS = [
  { title: "제조 기업 일계표 자동화", desc: "매일 손으로 옮기던 생산·매출 일계표를 엑셀 원본에서 자동 집계하고 리포트로 발행", tag: "제조 · 엑셀" },
  { title: "입찰 공고 검토 에이전트", desc: "공고문 PDF를 읽고 자격 요건·마감·리스크를 표로 정리해 담당자에게 전달", tag: "영업 · 문서" },
  { title: "업무일지 KPI 리포트 사이트", desc: "팀원 업무일지를 모아 KPI 대시보드 웹사이트로 자동 배포", tag: "운영 · 웹" },
  { title: "카드뉴스 제작 에이전트", desc: "주제만 넣으면 리서치 → 카피 → 디자인까지 인스타그램 카드뉴스 자동 생성", tag: "마케팅 · 콘텐츠" },
  { title: "AI 트렌드 리서치 → 노션·슬랙", desc: "10개 토픽을 매일 병렬 검색해 노션에 정리하고 슬랙으로 요약 발송", tag: "리서치 · 뉴스레터" },
  { title: "기획서 → 피그마 와이어프레임", desc: "기획서와 IA만 올리면 피그마에 화면 설계가 그려지는 클로드 코드 스킬", tag: "기획 · 디자인" },
];

export const CONSULTING = [
  { org: "(주)명심릿츠", period: "2025.01 ~ 현재", title: "AX 컨설팅 용역", desc: "부동산 리츠 실무의 반복 업무를 진단하고 AI 자동화 구축과 운영 이관까지 담당" },
  { org: "(주)에스와이시너지", period: "2026.08", title: "임직원 AI 전환 교육", desc: "전 직원 대상 ‘AI로 일하는 방식 바꾸기’ 교육과 부서별 활용 시나리오 설계" },
  { org: "(주)이노텍 · (주)태정", period: "2026.09 ~ 10", title: "영업·보고서 자동화 교육", desc: "영업 보고서·견적 업무를 클로드 코드로 자동화하는 실습형 교육" },
];

export const CAREER = [
  { period: "2024.07 ~", role: "대기만성 대표 · AX 컨설턴트", desc: "AI 컨설팅·자동화 구축 1인 에이전시" },
  { period: "2025.01 ~", role: "(주)명심릿츠 AX 과장", desc: "기업 내부 AI 전환(AX) 실무" },
  { period: "2023.03 ~ 2024.06", role: "(주)메타보라 서비스기획실", desc: "카카오게임즈 계열사 서비스 기획" },
  { period: "재학 중", role: "성균관대 경영전문대학원 PMBA", desc: "성균관대 디자인학과 졸업" },
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
