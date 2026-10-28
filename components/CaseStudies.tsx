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
          <article className={`grid overflow-hidden rounded-2xl border md:grid-cols-[1.05fr_1fr] ${i % 2 ? "border-brown-dark bg-brown-dark text-butter-pale" : "border-brown/20 bg-white"}`}>
            <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[420px] ${i % 2 ? "md:order-2" : ""}`}>
              {c.image ? (
                <Image src={c.image} alt={c.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover object-left-top" />
              ) : (
                <div className="flex h-full flex-col justify-between bg-paper p-7 md:p-9">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="eyebrow">{c.tag}</span>
                    <span className="text-brown/65">{c.org}</span>
                  </div>
                  <div>
                    <p className="font-serif text-[64px] font-semibold leading-none text-brown md:text-[88px]">{c.metric}</p>
                    <p className="mt-2 text-[14px] text-brown/75">{c.metricLabel}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-7 md:p-9">
              <p className={`text-[12px] font-semibold ${i % 2 ? "text-butter/80" : "text-brown/70"}`}>
                사례 {String(i + 1).padStart(2, "0")} · {c.org}
              </p>
              <h3 className={`mt-2 text-[22px] font-extrabold leading-snug md:text-[26px] ${i % 2 ? "text-white" : "text-brown-dark"}`}>{c.title}</h3>
              <dl className="mt-6 space-y-5">
                {[
                  ["문제", c.problem],
                  ["해결", c.solution],
                  ["성과", c.result],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[48px_1fr] gap-3">
                    <dt className={`pt-0.5 text-[12px] font-bold uppercase tracking-[0.15em] ${i % 2 ? "text-butter" : "text-brown"}`}>{k}</dt>
                    <dd className={`text-[15px] leading-relaxed ${k === "성과" ? (i % 2 ? "font-bold text-butter" : "font-bold text-brown-dark") : i % 2 ? "text-butter-pale/85" : "text-brown/90"}`}>{v}</dd>
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
