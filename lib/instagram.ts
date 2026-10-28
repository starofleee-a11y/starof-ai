// 소개 섹션의 인스타그램 콘텐츠 카드. 썸네일은 인스타그램 공식 임베드로 방문자 브라우저에서 불러와요.
// href에 게시물 링크(https://www.instagram.com/p/… 또는 /reel/…)만 적으면 됩니다.
export interface InstaPost {
  href: string;
  kind: "릴스" | "게시물";
  title?: string; // 임베드가 안 뜰 때 보여줄 제목 (선택)
}

export const INSTAGRAM_POSTS: InstaPost[] = [
  { href: "https://www.instagram.com/reel/DdI9grlzQHV/", kind: "릴스" },
  { href: "https://www.instagram.com/reel/DXYFoFVkxdJ/", kind: "릴스" },
  { href: "https://www.instagram.com/reel/De4dFkkyVaC/", kind: "릴스" },
  { href: "https://www.instagram.com/p/Dd0ziM3FDpR/", kind: "게시물" },
];

/** 게시물 링크 → 임베드 주소 */
export function embedUrl(href: string) {
  const m = href.match(/instagram\.com\/(p|reel|reels)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/${m[1] === "reels" ? "reel" : m[1]}/${m[2]}/embed/` : null;
}
