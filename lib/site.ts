// 사이트 전역 정보. 연락처·링크를 바꿀 땐 이 파일만 고치면 됩니다.
export const SITE = {
  name: "Star of AI",
  domain: "https://www.starof-ai.com",
  tagline: "AX 에이전시, Star of AI",
  owner: "이경서 (Winter)",
  company: "대기만성",
  email: "starofleee@gmail.com",
  phone: "+82 10-3732-8091",
  address: "서울 강남구 언주로 30길",
  instagram: "https://www.instagram.com/starof_ai",
  instagramHandle: "@starof_ai",
  linkedinPost: "https://lnkd.in/p/gQHTtuWk",
  lectureVideos: "https://drive.google.com/drive/folders/1wMJ6ifEQiRHHHgMdnqZMKJZwPXNxI-0G?usp=sharing",
};

export interface NavLink {
  href: string;
  label: string;
  en: string;
  desc?: string;
}
export interface NavItem extends Partial<NavLink> {
  label: string;
  en: string;
  children?: NavLink[]; // 있으면 드롭다운 메뉴
}

// 헤더 메뉴. [클래스]는 두 개의 클래스를 묶은 드롭다운이에요.
export const NAV: NavItem[] = [
  {
    label: "클래스",
    en: "Classes",
    children: [
      { href: "/study", label: "자동화 기초 클래스", en: "Starters", desc: "클로드 코드 설치부터 내 업무 자동화까지 · 3주 4회" },
      { href: "/oneday", label: "AI 콘텐츠 제작 원데이", en: "Creators", desc: "AI로 릴스 제작 자동화 · 11/29(토) 3시간" },
    ],
  },
  { href: "/consulting", label: "1:1 AX 컨설팅", en: "Workers" },
  { href: "/enterprise", label: "기업 AX", en: "Company" },
];

/** 드롭다운을 펼친 평평한 링크 목록 (푸터 등) */
export const NAV_LINKS: NavLink[] = NAV.flatMap((n) => n.children ?? [n as NavLink]);

export const OTHER_PROJECTS = [
  {
    name: "Skill Shop",
    href: "https://skill-shop-six.vercel.app/",
    label: "PM·기획자 치트키 인벤토리",
    desc: "기획서와 IA만 올리면 피그마 와이어프레임까지. 현업 기획자가 만든 클로드 코드 스킬을 3분 만에 설치하세요.",
    tag: "Claude Code Skills",
  },
  {
    name: "AI BAMTI",
    href: "https://www.aibamti.com",
    label: "AI 티 제거 서비스",
    desc: "한국어 전용 5단계 교정으로 AI가 쓴 글의 워터마크와 ‘AI 티’를 지워 드려요. 자소서·보고서 제출 전에 한 번.",
    tag: "Korean AI Humanizer",
  },
];
