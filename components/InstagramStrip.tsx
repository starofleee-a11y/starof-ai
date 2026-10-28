import Image from "next/image";
import { INSTAGRAM_POSTS } from "@/lib/instagram";
import { SITE } from "@/lib/site";

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
        {INSTAGRAM_POSTS.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-[4/5] w-[200px] shrink-0 snap-start overflow-hidden rounded-xl border border-brown/10 bg-white md:w-[220px]"
          >
            {p.image ? (
              <Image src={p.image} alt={p.title} fill sizes="220px" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            ) : (
              <div className={`absolute inset-0 ${i % 2 ? "bg-paper" : "bg-butter-pale"}`} />
            )}
            <div className={`absolute inset-x-0 bottom-0 p-4 ${p.image ? "bg-gradient-to-t from-brown-dark/80 to-transparent pt-12 text-butter-pale" : "text-brown-dark"}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${p.image ? "text-butter/80" : "text-olive"}`}>{p.kind}</p>
              <p className="mt-1 text-[14px] font-semibold leading-snug">{p.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
