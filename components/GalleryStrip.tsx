"use client";
import Image from "next/image";
import { useRef } from "react";

type Item = { src: string; alt: string; caption: string; w: number; h: number };

/** 현장 사진을 가로로 넘겨 보는 갤러리. 높이는 같고 너비는 사진 비율대로. */
export default function GalleryStrip({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div className="mx-auto mb-4 flex max-w-site justify-end gap-2 px-5 md:px-8">
        {[["←", -1, "이전 사진"], ["→", 1, "다음 사진"]].map(([t, d, label]) => (
          <button
            key={label as string}
            type="button"
            aria-label={label as string}
            onClick={() => go(d as number)}
            className="grid h-10 w-10 place-items-center rounded-full border border-brown/25 bg-white text-[16px] font-bold text-brown-dark transition hover:bg-butter"
          >
            {t}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-8 md:gap-4 md:px-8 xl:px-[max(2rem,calc((100vw-1200px)/2+2rem))] xl:scroll-px-[max(2rem,calc((100vw-1200px)/2+2rem))]"
      >
        {items.map((g) => (
          <figure
            key={g.src}
            className="relative h-[220px] max-w-[80vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-brown/20 bg-white md:h-[340px] md:max-w-none"
            style={{ aspectRatio: `${g.w} / ${g.h}` }}
          >
            <Image src={g.src} alt={g.alt} fill sizes="(min-width:768px) 520px, 80vw" className="object-cover" />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown-dark/85 to-transparent px-4 pb-3 pt-10 text-[12.5px] font-bold text-butter-pale">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
