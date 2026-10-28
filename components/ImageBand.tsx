import Image from "next/image";
import Reveal from "./Reveal";

export interface BandImage {
  src: string;
  alt: string;
  caption?: string;
}

/** 섹션 사이에 끼워 넣는 자료 사진 띠 — 2~4장을 비율 맞춰 보여줘요 */
export default function ImageBand({ images, eyebrow, note }: { images: BandImage[]; eyebrow?: string; note?: string }) {
  const cols = images.length >= 4 ? "md:grid-cols-4" : images.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <div>
      {eyebrow && (
        <Reveal>
          <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-brown">{eyebrow}</p>
        </Reveal>
      )}
      <div className={`grid grid-cols-2 gap-3 md:gap-4 ${cols}`}>
        {images.map((im, i) => (
          <Reveal key={im.src} delay={i * 90}>
            <figure className="overflow-hidden rounded-2xl border border-brown/20 bg-white">
              <div className="relative aspect-[4/3]">
                <Image src={im.src} alt={im.alt} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
              </div>
              {im.caption && <figcaption className="px-3 py-2.5 text-[12.5px] font-semibold text-brown-dark">{im.caption}</figcaption>}
            </figure>
          </Reveal>
        ))}
      </div>
      {note && <p className="mt-4 text-[12.5px] text-brown/75">{note}</p>}
    </div>
  );
}
