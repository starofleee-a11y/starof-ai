import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { type Tone } from "@/lib/tones";
import Reveal from "./Reveal";

const TONE_OF: Record<string, Tone> = { study: "starters", consulting: "workers", enterprise: "company" };

// 밝은 노랑 → 중간 올리브 → 진한 브라운, 세 플랜의 명도를 확실히 가르고 가격은 가장 굵게
const STYLE: Record<Tone, { card: string; eyebrow: string; name: string; summary: string; price: string; unit: string; bullet: string; dot: string; btn: string }> = {
  starters: { card: "border-butter-deep bg-butter", eyebrow: "text-brown", name: "text-brown-dark", summary: "text-brown/90", price: "text-brown-dark", unit: "text-brown/80", bullet: "text-brown-dark", dot: "text-brown", btn: "btn-primary" },
  workers: { card: "border-sage/40 bg-sage-soft", eyebrow: "text-sage", name: "text-brown-dark", summary: "text-brown/90", price: "text-brown-dark", unit: "text-brown/80", bullet: "text-brown-dark", dot: "text-sage", btn: "btn-primary" },
  company: { card: "border-brown-dark bg-brown-dark", eyebrow: "text-butter", name: "text-white", summary: "text-butter-pale/85", price: "text-butter", unit: "text-butter-pale/75", bullet: "text-butter-pale", dot: "text-butter", btn: "btn-yellow" },
};

/** 세 가지 플랜. 고객군 색으로 구분되고, 아래에 커피챗 안내가 붙어요. */
export default function PriceCards() {
  const list = [PRODUCTS.study, PRODUCTS.consulting, PRODUCTS.enterprise];
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {list.map((p, i) => {
          const t = STYLE[TONE_OF[p.id]];
          return (
            <Reveal key={p.id} delay={i * 100}>
              <div className={`flex h-full flex-col rounded-2xl border p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8 ${t.card}`}>
                <p className={`text-[12px] font-bold uppercase tracking-[0.2em] ${t.eyebrow}`}>
                  {p.audience} · {p.en}
                </p>
                <h3 className={`mt-4 break-keep text-[30px] font-extrabold leading-[1.2] tracking-tight md:text-[34px] ${t.name}`}>{p.name}</h3>
                <p className={`mt-4 text-[17px] font-bold leading-snug ${t.name}`}>{p.hook}</p>
                <p className={`mt-1.5 text-[14.5px] leading-relaxed ${t.summary}`}>{p.how}</p>
                <div className="mt-7">
                  <p className={`font-serif text-[42px] font-bold leading-none ${t.price}`}>{p.priceLabel}</p>
                  <p className={`mt-2 text-[13px] font-medium ${t.unit}`}>{p.unit}</p>
                </div>
                <ul className={`mt-6 space-y-2 border-t border-current/15 pt-6 text-[14px] font-medium ${t.bullet}`}>
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span className={t.dot}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link href={p.href} className={`${t.btn} w-full`}>
                    자세히 보기
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={200}>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brown/20 bg-white p-6 md:flex-row md:items-center md:p-7">
          <p className="text-[16px] text-brown-dark md:text-[17px]">
            <b className="font-extrabold">플랜 선택이 어렵다면 무료 커피챗을 신청해주세요.</b>
            <span className="ml-2 font-medium text-brown/80">30분 안에 어떤 방법이 맞는지 같이 정해드려요.</span>
          </p>
          <Link href="#coffee-chat" className="btn-primary shrink-0">무료 커피챗 신청</Link>
        </div>
      </Reveal>
    </>
  );
}
