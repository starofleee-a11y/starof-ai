import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { TONES, type Tone } from "@/lib/tones";
import Reveal from "./Reveal";

const TONE_OF: Record<string, Tone> = { study: "starters", consulting: "workers", enterprise: "company" };

/** 세 가지 플랜. 고객군 색으로 구분되고, 아래에 커피챗 안내가 붙어요. */
export default function PriceCards() {
  const list = [PRODUCTS.study, PRODUCTS.consulting, PRODUCTS.enterprise];
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {list.map((p, i) => {
          const t = TONES[TONE_OF[p.id]];
          return (
            <Reveal key={p.id} delay={i * 100}>
              <div className={`flex h-full flex-col rounded-2xl border p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8 ${t.bg} ${t.border}`}>
                <p className={`text-[12px] font-semibold uppercase tracking-[0.2em] ${t.text}`}>
                  {p.audience} · {p.en}
                </p>
                <h3 className="mt-4 text-[22px] font-bold leading-snug text-brown-dark">{p.name}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-brown/85">{p.summary}</p>
                <div className="mt-7">
                  <p className="font-serif text-[38px] font-semibold leading-none text-brown">{p.priceLabel}</p>
                  <p className="mt-2 text-[13px] text-brown/70">{p.unit}</p>
                </div>
                <ul className="mt-6 space-y-2 border-t border-brown/10 pt-6 text-[14px] text-brown/90">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className={t.text}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link href={p.href} className="btn-primary w-full">
                    자세히 보기
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={200}>
        <div className="glass-card mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-[16px] text-brown-dark md:text-[17px]">
            <b className="font-semibold">플랜 선택이 어렵다면 무료 커피챗을 신청해주세요.</b>
            <span className="ml-2 text-brown/75">30분 안에 어떤 방법이 맞는지 같이 정해드려요.</span>
          </p>
          <Link href="#coffee-chat" className="btn-primary shrink-0">무료 커피챗 신청</Link>
        </div>
      </Reveal>
    </>
  );
}
