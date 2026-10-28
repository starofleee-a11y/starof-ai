// 자동화 기초 강의(클로드 코드 스터디) 기수 정보. 다음 기수를 열 땐 이 파일만 바꾸면 됩니다.
export const STUDY = {
  cohort: "클로드 코드 업무 자동화 스터디 2기",
  weeks: "3주 · 총 4회",
  people: "7~10명", // 소수 정원
  price: 150000,
  refund: 30000, // 4회 전부 참석 시 환급
  deadline: "11/6(금)",
  resultDate: "11/7(토)",
  host: "starof_ai",
  place: {
    offline: "서울 (강남 인근 강의실에서 진행 예정)",
    online: "줌 (링크 개별 안내)",
  },
  sessions: [
    {
      no: "1회차",
      date: "11월 8일(일) 14:30–17:00",
      mode: "오프라인",
      title: "클로드 코드 설치 & 기본기 학습 강의",
      image: "/images/study/ep1-deck.jpg",
      imageAlt: "1회차 교안 — 클로드 코드 설치와 기본기",
      items: ["설치 · 터미널 · 권한 초기 셋팅", "스킬 / 토큰 사용 / 커넥터 / 모델 개념 잡기", "클로드 코드로 나만의 사이트 만들어보기"],
    },
    {
      no: "2회차",
      date: "11월 15일(일) 20:00–22:00",
      mode: "온라인",
      title: "실무 자동화 사례 해부 & 샘플 데이터 실습 강의",
      image: "/images/study/ep2-deck.jpg",
      imageAlt: "2회차 교안 — 실무 자동화 사례 해부",
      items: ["실습: 나만의 AI 팀 만들어서 전사적 자동화하기", "샘플 데이터 제공 예정", "자동화가 되는 업무 vs 안 되는 업무 구분법"],
    },
    {
      no: "3회차",
      date: "11월 18일(수) 20:00–22:00",
      mode: "온라인",
      title: "내 업무 자동화 기획 발표 & 피드백",
      image: "/images/study/ep3-flow.jpg",
      imageAlt: "3회차 자료 — 자동화 기획 플로우",
      items: ["기획안은 전날(11/17)까지 제출 (세션은 피드백 중심으로 진행)", "필요한 데이터 · 권한 체크리스트 정리", "최종 발표까지 남은 5일 작업 플랜 짜기"],
    },
    {
      no: "4회차",
      date: "11월 22일(일) 16:30–19:00",
      mode: "오프라인",
      title: "최종 자동화 발표 & 네트워킹",
      image: "/images/study/ep4-deck.jpg",
      imageAlt: "4회차 교안 — 최종 발표와 운영 팁",
      items: ["각 팀원별 완성한 자동화 라이브 시연", "운영 · 유지보수 · 확장 팁", "네트워킹 회식 (이후 자유)"],
    },
  ],
  checks: [
    "클로드 코드 Pro 구독이 필수입니다. 첫 세션 전까지 구독 상태여야 해요.",
    "자동화할 실무 주제나 소스를 가지고 계셔야 합니다. 3회차에 이 주제로 발표합니다.",
    "4회 전 일정에 참여 가능하셔야 합니다. 한 번이라도 빠지면 환급 대상에서 제외됩니다.",
    "개인 노트북 지참을 권장합니다. 회사 노트북은 설치·터미널 권한이 막힌 경우가 많아요.",
    "선정 안내 및 입금 후에는 환불이 불가합니다. 일정을 꼭 확인하고 신청해 주세요.",
  ],
  hostCareer: [
    "기업 및 교육 기관 AI 강의 10건 이상 진행",
    "스타트업 및 중소기업 대상 AX 컨설팅",
    "IT 기획 에이전시 2년차 운영",
    "IT 경력 4년차",
    "성균관대학교 디자인학과 학사 졸업 & PMBA 석사 재학 중",
  ],
};

// 교안 · 실습 결과물 (AI 강의 자료 폴더). public/images/study/ 에 넣고 여기에 추가하면 커리큘럼 아래 띠에 나와요.
export const STUDY_MATERIALS = [
  { src: "/images/study/practice-cardnews.jpg", alt: "실습 결과물 — 클로드 코드로 만든 카드뉴스", caption: "실습 · 카드뉴스 자동 생성" },
  { src: "/images/study/practice-site.jpg", alt: "실습 결과물 — 클로드 코드로 만든 개인 사이트", caption: "실습 · 나만의 사이트 만들기" },
  { src: "/images/study/practice-briefing.jpg", alt: "실습 결과물 — 자동 브리핑 결과", caption: "실습 · 매일 아침 자동 브리핑" },
  { src: "/images/study/certificate.jpg", alt: "스터디 수료증", caption: "4회 완주 시 수료증 발급" },
];

// 강의 현장 사진. public/images/lectures/ 에 파일을 넣고 여기에 추가하면 스터디 페이지에 바로 나와요.
// 1기 스터디 현장 사진 (강의사진 폴더)
export const LECTURE_PHOTOS = [
  { src: "/images/lectures/study1-present-b.jpg", alt: "1기 수강생이 자신의 자동화를 발표하는 모습", w: 720, h: 960 },
  { src: "/images/lectures/study1-present-a.jpg", alt: "1기 4회차 발표 현장", w: 720, h: 960 },
  { src: "/images/lectures/study1-class.jpg", alt: "1기 1회차 강의 현장", w: 1200, h: 1200 },
  { src: "/images/lectures/study1-lead.jpg", alt: "스터디장 Winter의 강의 모습", w: 1200, h: 622 },
];

// 1기 수강생이 노션 스터디 페이지에 직접 남긴 후기 원문 (이름은 뺐어요)
export const STUDY_REVIEWS = [
  {
    quote: "AI 사용 해야겠다는 생각은 오랫동안 해왔지만 엄두를 못 내고 있었는데, 이번 스터디를 통해 **첫걸음을 뗄 수 있어** 너무 감사하고 좋았습니다. **선생님이 있다는 생각만으로도 든든해요.**",
    who: "1기 수강생 · 채용·개인 업무 자동화",
    featured: true,
  },
  {
    quote: "**코딩 경험이 없어도** 클로드 코드를 활용하면 단순한 AI 활용을 넘어, **아이디어 기획부터 콘텐츠 제작과 업로드까지 하나의 자동화 워크플로로** 연결할 수 있다는 점을 배웠습니다.",
    who: "1기 수강생 · 카드뉴스 제작 자동화",
  },
  {
    quote: "자동화의 핵심은 도구보다, **내 업무를 아는 사람만 정할 수 있는 규칙을 정확히 정하는 일**이라는 것을 배웠습니다. **흩어져 있던 기록이 하나의 DB로 모이는 것**을 보며 큰 보람을 느꼈습니다.",
    who: "1기 수강생 · 제약 영업 CRM 자동화",
    featured: true,
  },
  {
    quote: "반복적이고 간단한 검증만 필요한 업무를 자동화해 **업무 시간을 효율적으로 쓰는 방법**과, **깔끔한 산출물을 만드는 스킬**들을 배웠어요.",
    who: "1기 수강생 · 건설사 비교견적 자동화",
  },
];

// 1기 수강생이 4회차에 발표한 자동화 (발표 자료 기준)
// image = 4회차 발표 자료 표지 (public/images/students)
export const STUDENT_PROJECTS = [
  { title: "건설사 비교견적 자동화", desc: "메일로 온 견적서 수집 → 금액 순위표 → 출력용 PDF까지. 30분~1시간 걸리던 일을 지시 한 번으로.", image: "/images/students/quote.jpg", alt: "발표 자료 표지 — 견적 메일 뒤지던 30분, 이제 5분이면 끝납니다" },
  { title: "제약 영업 교수 CRM", desc: "담당 교수 66명+의 논문·반응 기록을 시트 하나로. 매주 일요일 방문 우선순위와 영업 스크립트 자동 제안.", image: "/images/students/pip-os.jpg", alt: "발표 자료 표지 — 교수님별 최신 논문 모니터링 & 관심사·제품 연계 DB 자동화" },
  { title: "인스타그램 카드뉴스 파이프라인", desc: "노션에 주제만 적으면 리서치 → 원고 → 캔바 템플릿 → 승인 후 게시까지 이어지는 흐름.", image: "/images/students/cardnews.jpg", alt: "발표 자료 표지 — 카드뉴스 업로드, 승인 한 번으로 끝내기" },
  { title: "팀 업무일지 슬랙 취합 자동화", desc: "매일 6시, 8명의 업무일지가 슬랙에 알아서 모여요. 퇴근 전 40분 걸리던 취합이 확인 5분으로.", image: "/images/students/daily-log.jpg", alt: "발표 자료 표지 — 매일 6시, 팀 업무일지가 슬랙에 알아서 모입니다" },
];
