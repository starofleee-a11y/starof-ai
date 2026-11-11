// AI 콘텐츠 제작 원데이 클래스 정보. 다음 회차를 열 땐 이 파일만 바꾸면 됩니다.
export const ONEDAY = {
  cohort: "AI 콘텐츠 제작 원데이 1기",
  title: "AI로 릴스 제작 자동화 해보기",
  date: "11월 29일(일) 16:00–19:00",
  dateShort: "11/29(일)",
  time: "16:00–19:00",
  duration: "3시간 원데이",
  mode: "오프라인",
  place: "서울 (강남 인근 강의실에서 진행 예정)",
  price: 59000,
  people: "소수 정원",
  deadline: "11/27(금)",
  host: "starof_ai",
  curriculum: [
    {
      no: "01",
      tag: "AI 인물 릴스",
      title: "니온앤비욘 챌린지 영상에 내 얼굴 넣어 만들기",
      desc: "요즘 터지는 챌린지 포맷에 AI로 내 얼굴을 합성해, 촬영 없이 내가 등장하는 릴스를 완성해요.",
      out: "내 얼굴이 들어간 챌린지 릴스 1편",
      ref: { kind: "video" as const, src: "/videos/challenge.mp4", poster: "/images/oneday/challenge-poster.jpg", wide: true, label: "참고 영상 · 챌린지 영상에 얼굴 합성" },
    },
    {
      no: "02",
      tag: "AI 제품 릴스",
      title: "AI 제품 사진으로 인물·제품 촬영 없이 제품 홍보 영상 만들기",
      desc: "제품 사진 한 장으로 AI 모델 컷과 장면을 만들고, 촬영 없이 제품 홍보 영상으로 이어 붙여요.",
      out: "촬영 없이 만든 제품 홍보 릴스 1편",
      ref: { kind: "video" as const, src: "/videos/product.mp4", poster: "/images/oneday/product-poster.jpg", wide: false, label: "참고 영상 · AI 제품 릴스" },
    },
    {
      no: "03",
      tag: "스크립트",
      title: "릴스 후킹 서사 · 스크립트 작성법 · 팁",
      desc: "첫 1초에 붙잡는 후킹 서사 구조, 조회수를 가른 스크립트 작성법과 운영 팁을 실제 사례로 뜯어봐요.",
      out: "내 채널용 후킹 스크립트 템플릿",
      ref: { kind: "video" as const, src: "/videos/script.mp4", poster: "/images/oneday/script-poster.jpg", wide: false, label: "참고 영상 · 첫 1초 후킹 서사" },
    },
    {
      no: "04",
      tag: "자동화",
      title: "릴스 자동화 스킬 소개 + 직접 자동화 워크플로우 구축",
      desc: "노션 스크립트부터 제작까지 이어지는 릴스 자동화 스킬을 소개하고, 내 손으로 자동화 워크플로우를 구축해요.",
      out: "내 릴스 자동화 워크플로우",
      ref: { kind: "flow" as const, src: "", poster: "", wide: true, label: "노션 스크립트 → 릴스 업로드까지, 한 번 셋팅하면 자동" },
    },
  ],
  // 강사의 릴스 성과
  reels: {
    total: "50만회+",
    totalLabel: "릴스 누적 조회수",
    hits: [
      { n: "16만회", l: "최고 조회 릴스" },
      { n: "15만회", l: "두 번째 히트" },
      { n: "7만회", l: "세 번째 히트" },
    ],
    // 강사가 직접 만든 릴스 — 카드 안에서 재생돼요 (video = 사이트에 올린 짧은 클립, instagram = 공식 임베드)
    works: [
      { k: "AI 인물 릴스", name: "teach me daddy", desc: "AI로 만든 인물이 등장하는 드라마 릴스 시리즈", media: { kind: "video" as const, src: "/videos/tmd.mp4", poster: "/images/oneday/tmd-poster.jpg" } },
      { k: "AI 제품 릴스", name: "cabin aura", desc: "촬영 없이 AI 제품 사진으로 만든 제품 홍보 릴스", media: { kind: "video" as const, src: "/videos/cabin.mp4", poster: "/images/oneday/cabin-poster.jpg" } },
      { k: "직접 촬영 + TTS 자막", name: "starof_ai", desc: "직접 촬영한 영상에 TTS 자막을 얹은 정보 콘텐츠", media: { kind: "video" as const, src: "/videos/starofai.mp4", poster: "/images/oneday/starofai-poster.jpg" } },
    ],
    workflow: { k: "전 과정 자동화", name: "Reels Workflow", desc: "릴스 노션 스크립트부터 제작까지 전부 자동화로 구축" },
  },
  fit: [
    { who: "얼굴 노출·촬영이 부담스러운 예비 크리에이터", why: "내 얼굴을 AI로 합성한 챌린지 릴스로, 카메라 앞에 서지 않고도 '내가 나오는' 콘텐츠를 시작할 수 있어요." },
    { who: "촬영·모델 비용이 아까운 소상공인·마케터", why: "제품 사진 한 장이면 AI 모델 컷과 홍보 영상이 나와요. 스튜디오 예약 없이 신제품 릴스를 당일에 올릴 수 있어요." },
    { who: "스크립트부터 제작까지 손으로 하느라 지친 크리에이터", why: "노션에 주제만 적으면 대본·이미지·영상·자막이 이어지는 워크플로우로, 제작 시간을 하루에서 30분으로 줄여요." },
    { who: "AI 툴은 써봤지만 '내 콘텐츠'로 이어지지 않았던 분", why: "툴 소개가 아니라 내 채널·내 제품으로 실습해요. 수업이 끝나면 올릴 수 있는 릴스 2편이 손에 남아요." },
  ],
  // 신청 후 안내 방식 — 스터디·원데이 공통
  smsNotice: "신청 후 남겨주신 번호로 문자(SMS)로 입금 안내와 톡방 초대를 보내드려요.",
  checks: [
    "개인 노트북을 꼭 가져와 주세요. 실습 비중이 큽니다.",
    "인스타그램 계정이 있으면 당일 바로 업로드까지 해볼 수 있어요.",
    "캡컷 · 힉스필드 · 클로드 코드 · 노션을 써요. 사전 공지에 맞춰 수업 전에 꼭 설치·구독해 주세요. (일부 툴은 유료 크레딧이 필요해요)",
    "수업 신청 후 결제하시면 환불이 불가합니다.",
  ],
  faqs: [
    { q: "영상 편집을 전혀 못 해도 되나요?", a: "네. 편집 프로그램 대신 AI 툴과 자동화 워크플로우로 만들어요. 클릭과 프롬프트 입력만 할 수 있으면 충분합니다." },
    { q: "제 얼굴이나 제품이 꼭 있어야 하나요?", a: "얼굴 합성 실습은 본인 사진 한 장만 있으면 돼요. 제품이 없으면 샘플 제품 사진으로 같이 진행합니다." },
    { q: "무슨 툴을 쓰나요?", a: "캡컷(CapCut), 힉스필드(Higgsfield), 클로드 코드(Claude Code), 노션(Notion) 네 가지를 써요. 수업 전에 설치·구독 안내를 미리 드리니, 사전 공지에 맞춰 꼭 준비해 주세요." },
    { q: "3시간 안에 정말 릴스가 나오나요?", a: "네. 미리 안내드린 툴을 구독·설치해 오시면 수업 시작과 함께 바로 실습에 들어가 작업할 수 있어요. 대신 사전 공지에 맞게 툴 설치와 구독을 꼭 마치고 와주셔야 해요." },
    { q: "언제 수강할 수 있나요?", a: "수강 가능 시점은 11/29(일) 16:00–19:00 당일 수업이에요. 결제일로부터 12개월을 넘겨 수강하는 경우는 없어요." },
    { q: "결제와 환불은 어떻게 되나요?", a: "신청서를 보내면 바로 결제할 수 있어요. 수업 신청 후 결제하시면 환불이 불가하니, 일정을 확인하고 신청해 주세요." },
  ],
};
