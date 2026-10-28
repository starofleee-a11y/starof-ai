import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";

export default function PriceCards() {
  const list = [PRODUCTS.study, PRODUCTS.workflow, PRODUCTS.enterprise];
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {list.map((p, i) => {
        const featured = p.id === "workflow";
        return (
          <Reveal key={p.id} delay={i * 120}>
            <div
              className={`group relative flex h-full flex-col overflow-hidden rounded-[30px] border p-7 transition-all duration-500 hover:-translate-y-2 md:p-8 ${
                featured
                  ? "border-brown bg-brown text-butter-pale shadow-[0_30px_60px_-25px_rgba(61,42,12,.7)]"
                  : "border-brown/10 bg-white hover:shadow-[0_30px_60px_-30px_rgba(97,66,21,.4)]"
              }`}
            >
              <Sparkle
                className={`absolute right-6 top-6 h-7 w-7 transition-transform duration-700 group-hover:rotate-90 group-hover:scale-125 ${featured ? "" : "opacity-80"}`}
                color={featured ? "#FFEB51" : "#FFE04A"}
              />
              <p className={`font-serif text-[15px] italic ${featured ? "text-butter/80" : "text-olive"}`}>0{i + 1} · {p.en}</p>
              <h3 className={`mt-3 text-[21px] font-bold leading-snug ${featured ? "text-butter" : "text-brown-dark"}`}>{p.name}</h3>
              <p className={`mt-3 text-[14.5px] leading-relaxed ${featured ? "text-butter-pale/75" : "text-brown/70"}`}>{p.summary}</p>
              <div className="mt-7">
                <p className={`font-serif text-[40px] font-semibold leading-none ${featured ? "text-butter" : "text-brown"}`}>
                  {p.priceLabel}
                </p>
                <p className={`mt-2 text-[13px] ${featured ? "text-butter-pale/60" : "text-brown/55"}`}>{p.unit}</p>
              </div>
              <ul className={`mt-7 space-y-2.5 text-[14px] ${featured ? "text-butter-pale/90" : "text-brown/80"}`}>
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span className={featured ? "text-butter" : "text-[#D9A800]"}>✦</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link href={p.href} className={`${featured ? "btn-yellow" : "btn-primary"} w-full`}>
                  자세히 보기 <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
