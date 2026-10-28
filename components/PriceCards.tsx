import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import Reveal from "./Reveal";

export default function PriceCards() {
  const list = [PRODUCTS.study, PRODUCTS.consulting, PRODUCTS.enterprise];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {list.map((p, i) => {
        const featured = p.id === "consulting";
        return (
          <Reveal key={p.id} delay={i * 100}>
            <div
              className={`flex h-full flex-col rounded-2xl border p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8 ${
                featured ? "border-brown bg-brown text-butter-pale" : "border-brown/10 bg-white"
              }`}
            >
              <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${featured ? "text-butter/80" : "text-olive"}`}>
                {p.audience} · {p.en}
              </p>
              <h3 className={`mt-4 text-[22px] font-bold leading-snug ${featured ? "text-butter" : "text-brown-dark"}`}>{p.name}</h3>
              <p className={`mt-3 text-[14.5px] leading-relaxed ${featured ? "text-butter-pale/75" : "text-brown/70"}`}>{p.summary}</p>
              <div className="mt-7">
                <p className={`font-serif text-[38px] font-semibold leading-none ${featured ? "text-butter" : "text-brown"}`}>{p.priceLabel}</p>
                <p className={`mt-2 text-[13px] ${featured ? "text-butter-pale/60" : "text-brown/55"}`}>{p.unit}</p>
              </div>
              <ul className={`mt-6 space-y-2 border-t pt-6 text-[14px] ${featured ? "border-butter/15 text-butter-pale/90" : "border-brown/10 text-brown/80"}`}>
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className={featured ? "text-butter" : "text-olive"}>·</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link href={p.href} className={`${featured ? "btn-yellow" : "btn-primary"} w-full`}>
                  자세히 보기
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
