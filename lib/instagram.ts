// 소개 섹션의 인스타그램 콘텐츠 카드.
// href에 게시물 링크(https://www.instagram.com/p/… 또는 /reel/…)를, image에 public/images/insta/ 에 넣은 썸네일 경로를 적으세요.
// image가 없으면 제목만 있는 타이포 카드로 보여요.
export interface InstaPost {
  title: string;
  kind: string; // 릴스 · 카드뉴스 · 현장
  href: string;
  image?: string;
}

export const INSTAGRAM_POSTS: InstaPost[] = [
  { title: "클로드 코드로 주간 보고서 자동으로 만드는 법", kind: "릴스", href: "https://www.instagram.com/starof_ai" },
  { title: "비개발자를 위한 AI 자동화 툴 업데이트 정리", kind: "카드뉴스", href: "https://www.instagram.com/starof_ai" },
  { title: "성균관대 GSB 클로드 코드 워크샵 현장", kind: "현장", href: "https://www.instagram.com/starof_ai", image: "/images/lecture-gsb.jpg" },
  { title: "클로드 코드 업무 자동화 스터디 모집", kind: "카드뉴스", href: "https://www.instagram.com/starof_ai" },
];
