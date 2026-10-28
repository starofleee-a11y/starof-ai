import Image from "next/image";
import Reveal from "./Reveal";
import { CASES } from "@/lib/proof";

/** 문제 → 해결 → 성과, 3단계로 읽는 AX 프로젝트 사례 */
export default function CaseStudies({ limit }: { limit?: number }) {
  const list = limit ? CASES.slice(0, limit) : CASES;
  return (
    <div className="space-y-6">
      {list.map((c, i) => (
        <Reveal key={c.id} delay={60}>
          <article className="grid overflow-hidden rounded-2xl border border-brown/10 bg-white md:grid-cols-[1.05fr_1fr]">
            <div className={`relative min-h-[260px] ${i % 2 ? "md:order-2" : ""}`}>
              {c.image ? (
                <Image src={c.image} alt={c.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
              ) : (
                <div className="flex h-full flex-col justify-between bg-paper p-7 md:p-9">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="eyebrow">{c.tag}</span>
                    <span className="text-brown/50">{c.org}</span>
                  </div>
                  <div>
                    <p className="font-serif text-[64px] font-semibold leading-none text-brown md:text-[88px]">{c.metric}</p>
                    <p className="mt-2 text-[14px] text-brown/60">{c.metricLabel}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-7 md:p-9">
              <p className="text-[12px] text-brown/50">
                사례 {String(i + 1).padStart(2, "0")} · {c.org}
              </p>
              <h3 className="mt-2 text-[21px] font-bold leading-snug text-brown-dark md:text-[24px]">{c.title}</h3>
              <dl className="mt-6 space-y-5">
                {[
                  ["문제", c.problem],
                  ["해결", c.solution],
                  ["성과", c.result],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[48px_1fr] gap-3">
                    <dt className="pt-0.5 text-[12px] font-semibold uppercase tracking-[0.15em] text-olive">{k}</dt>
                    <dd className={`text-[15px] leading-relaxed ${k === "성과" ? "font-semibold text-brown-dark" : "text-brown/75"}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
