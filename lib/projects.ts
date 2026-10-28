// AX 프로젝트 목록. 카테고리별로 묶이고, hook(세리프 큰 글씨)은 "어떻게 숫자를 만들었는지"를 한 줄로 보여줘요.
// 숫자는 실제 결과만 적고, 아직 측정 전인 프로젝트는 숫자 없이 방식만 적었어요.
export type Category = "경영지원 · 보고" | "입찰 · 재무" | "영업 · 마케팅" | "HR · 인사" | "콘텐츠 · 브랜딩" | "리서치 · 데이터" | "교육 · 조직";

export interface Project {
  id: string;
  category: Category;
  org: string;
  title: string;
  hook: string; // 세리프 큰 글씨
  how: string; // 어떻게 그 숫자를 만들었는지
  image: string;
  forCompany?: boolean; // 기업 AX 페이지에도 보여줄지
}

export const CATEGORIES: Category[] = ["경영지원 · 보고", "입찰 · 재무", "영업 · 마케팅", "HR · 인사", "콘텐츠 · 브랜딩", "리서치 · 데이터", "교육 · 조직"];

export const PROJECTS: Project[] = [
  {
    id: "agent",
    category: "경영지원 · 보고",
    org: "(주)명심릿츠 · AX팀",
    title: "사내 AI 에이전트 — 인사·재무·주간 보고",
    hook: "6시간 → 1시간",
    how: "매주 반복되는 업무를 9단계로 쪼개고, 수집·정리·초안 작성은 에이전트가, 사람은 예외 3건만 검토하도록 역할을 나눴어요.",
    image: "/images/projects/agent.jpg",
    forCompany: true,
  },
  {
    id: "bid",
    category: "입찰 · 재무",
    org: "(주)명심릿츠 · 입찰",
    title: "입찰 자동 검토 · 에쿼티 시뮬레이터",
    hook: "월 100건+ 자동 검토",
    how: "공고문을 읽고 조건·예정가·에쿼티 비율을 계산해 1차 판정까지 자동으로. 사람은 통과한 건만 봅니다.",
    image: "/images/projects/bid.jpg",
    forCompany: true,
  },
  {
    id: "kpi",
    category: "경영지원 · 보고",
    org: "(주)명심릿츠",
    title: "업무일지 KPI 리포트 자동 발행",
    hook: "매주 월요일, 지시 없이",
    how: "업무일지 폴더를 읽어 직원별 KPI를 산출하고 리포트 사이트로 배포한 뒤 슬랙으로 알림. 루틴으로 등록해 사람 손이 가지 않아요.",
    image: "/images/projects/kpi.jpg",
    forCompany: true,
  },
  {
    id: "sales",
    category: "영업 · 마케팅",
    org: "(주)이노텍",
    title: "영업 보고서 · 고객별 스크립트 생성",
    hook: "영업팀 15명, 같은 템플릿",
    how: "임직원 교육으로 클로드 코드를 익히게 한 뒤, 고객 데이터 5줄을 넣으면 보고서와 스크립트 초안이 나오는 워크플로우를 셋팅했어요.",
    image: "/images/projects/sales.jpg",
    forCompany: true,
  },
  {
    id: "hr",
    category: "HR · 인사",
    org: "삼영기업",
    title: "인사 · 근태 문서 흐름 자동화",
    hook: "사람은 예외만 봅니다",
    how: "문서 흐름을 진단해 반복 구간을 찾고, 수집 → 정리 → 누락 알림이 자동으로 이어지도록 구축. 담당자는 승인만 합니다.",
    image: "/images/projects/hr.jpg",
    forCompany: true,
  },
  {
    id: "edu",
    category: "교육 · 조직",
    org: "(주)에스와이시너지",
    title: "임직원 AI 전환 교육 + 부서별 시나리오",
    hook: "전 직원, 하루에",
    how: "‘AI로 일하는 방식 바꾸기’ 교육과 함께 부서별 활용 시나리오를 설계해, 교육 당일부터 각 부서가 쓸 자동화 후보를 가져가게 했어요.",
    image: "/images/projects/edu.jpg",
    forCompany: true,
  },
  {
    id: "research",
    category: "리서치 · 데이터",
    org: "Star of AI · 자체 운영",
    title: "업계 리서치 자동화 → 노션 · 슬랙",
    hook: "10개 토픽, 한 번에",
    how: "핵심 토픽 10개를 병렬로 웹 검색해 구조화된 분석으로 정리하고, 노션에 저장한 뒤 슬랙으로 요약을 보내는 스킬로 만들었어요.",
    image: "/images/projects/research.jpg",
  },
  {
    id: "content",
    category: "콘텐츠 · 브랜딩",
    org: "Star of AI · @starof_ai",
    title: "릴스 · 카드뉴스 제작 자동화",
    hook: "레퍼런스만 주면 디자인까지",
    how: "피그마·캔바 커넥터와 이미지 생성을 연결해, 레퍼런스와 주제만 주면 카드뉴스 디자인과 캡션 초안이 나오도록 했어요.",
    image: "/images/projects/content.jpg",
  },
  {
    id: "slack",
    category: "경영지원 · 보고",
    org: "(주)명심릿츠",
    title: "슬랙 리마인드 · 알림 자동화",
    hook: "정해진 시간에, 사람 대신",
    how: "슬랙 커넥터로 마감·회의·제출 리마인드를 자동 발송. 누가 챙기지 않아도 같은 시간에 같은 메시지가 나갑니다.",
    image: "/images/projects/slack.jpg",
    forCompany: true,
  },
  {
    id: "stock",
    category: "리서치 · 데이터",
    org: "Star of AI · 자체 운영",
    title: "투자 트래킹 · 시뮬레이션 대시보드",
    hook: "매주 루틴으로 갱신",
    how: "바이브 코딩으로 트래킹 사이트를 만들고, 투자 데이터 수집과 시뮬레이션을 주간 루틴으로 돌려 사람은 결과만 봅니다.",
    image: "/images/projects/stock.jpg",
  },
];
