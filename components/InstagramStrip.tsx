import { INSTAGRAM_POSTS, embedUrl } from "@/lib/instagram";
import { SITE } from "@/lib/site";

// 인스타그램 임베드는 326px 폭이 기준이라, 카드 폭에 맞춰 축소해서 보여줍니다.
const EMBED_W = 326;
const EMBED_H = 480; // 헤더 + 미디어까지만 보이도록 자름
const CARD_W = 236;
const SCALE = CARD_W / EMBED_W;

/** 인스타그램 콘텐츠를 옆으로 넘겨 보는 띠 */
export default function InstagramStrip() {
  return (
    <div className="min-w-0">
      <div className="mb-4 flex items-baseline justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-brown/50">Instagram · {SITE.instagramHandle}</p>
        <a href={SITE.instagram} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-brown underline-offset-4 hover:underline">
          전체 보기 ↗
        </a>
      </div>
      <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        {INSTAGRAM_POSTS.map((p, i) => {
          const src = embedUrl(p.href);
          return (
            <div
              key={p.href}
              className="relative shrink-0 snap-start overflow-hidden rounded-xl border border-brown/10 bg-white"
              style={{ width: CARD_W, height: Math.round(EMBED_H * SCALE) }}
            >
              {/* 임베드가 뜨기 전·실패 시 보이는 바탕 */}
              <a href={p.href} target="_blank" rel="noreferrer" className={`absolute inset-0 flex flex-col justify-end p-4 ${i % 2 ? "bg-paper" : "bg-butter-pale"}`}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-olive">{p.kind}</span>
                <span className="mt-1 text-[14px] font-semibold leading-snug text-brown-dark">{p.title ?? `${SITE.instagramHandle} ${p.kind} 보기`}</span>
              </a>
              {src && (
                <iframe
                  src={src}
                  title={`${SITE.instagramHandle} ${p.kind} ${i + 1}`}
                  loading="lazy"
                  scrolling="no"
                  className="absolute left-0 top-0 border-0"
                  style={{ width: EMBED_W, height: EMBED_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
