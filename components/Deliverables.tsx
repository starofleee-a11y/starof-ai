import Image from "next/image";
import Reveal from "./Reveal";
import Quote from "./Quote";
import { DELIVERABLES, CLIENT_QUOTES } from "@/lib/proof";
import { STUDY_REVIEWS } from "@/lib/study";

/** 컨설팅에서 실제로 받는 산출물 미리보기 (기밀 블러) */
export function DeliverableGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {DELIVERABLES.map((d, i) => (
        <Reveal key={d.src} delay={i * 100}>
          <figure className="card h-full overflow-hidden">
            <div className="relative aspect-[4/3] bg-paper">
              <Image src={d.src} alt={d.title} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover object-left-top" />
            </div>
            <figcaption className="p-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-olive">Deliverable 0{i + 1}</p>
              <p className="mt-2 text-[17px] font-bold text-brown-dark">{d.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-brown/85">{d.desc}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

/** 함께한 분들의 이야기 — 스터디 1기 수강생이 직접 남긴 후기 + (확인된) 고객사 코멘트 */
export function Voices({ limit }: { limit?: number }) {
  const list = [...CLIENT_QUOTES, ...STUDY_REVIEWS].slice(0, limit ?? 99);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {list.map((r, i) => (
        <Reveal key={r.who + i} delay={i * 80}>
          <figure className={`glass-card h-full ${"featured" in r && r.featured ? "!border-butter !bg-butter-pale/80" : ""}`}>
            <blockquote className="text-[15.5px] leading-[1.8] text-brown/85">“<Quote text={r.quote} hl />”</blockquote>
            <figcaption className="mt-5 text-[13px] text-brown/75">— {r.who}</figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
