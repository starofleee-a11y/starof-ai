import { embedUrl } from "@/lib/instagram";

/**
 * 9:16 세로 프레임 안에 참고 영상을 보여줘요.
 * tiktok · instagram = 공식 임베드 iframe (방문자 브라우저에서 로드), 못 뜨면 아래 링크 카드가 보여요.
 */
export default function MediaEmbed({ kind, url, label }: { kind: "tiktok" | "instagram"; url: string; label?: string }) {
  let src: string | null = null;
  if (kind === "tiktok") {
    const m = url.match(/\/video\/(\d+)/);
    src = m ? `https://www.tiktok.com/embed/v2/${m[1]}` : null;
  } else src = embedUrl(url);
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-brown/10 bg-paper">
      <a href={url} target="_blank" rel="noreferrer" className="absolute inset-0 flex flex-col justify-end p-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-olive">{kind === "tiktok" ? "TikTok" : "Instagram"}</span>
        <span className="mt-1 text-[14px] font-semibold leading-snug text-brown-dark">{label ?? "참고 영상 보기"} ↗</span>
      </a>
      {src && <iframe src={src} title={label ?? url} loading="lazy" scrolling="no" allow="autoplay; encrypted-media" allowFullScreen className="absolute inset-0 h-full w-full border-0" />}
    </div>
  );
}
