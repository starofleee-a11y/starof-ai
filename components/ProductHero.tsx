import Reveal from "./Reveal";
import GlassBg from "./GlassBg";
import type { Tone } from "@/lib/tones";
import { TONES } from "@/lib/tones";

/** 상품 페이지 상단. tone에 따라 글라스 빛 색이 달라서 페이지가 구분돼요. */
export default function ProductHero({
  tone,
  en,
  title,
  desc,
  chips,
  aside,
  children,
}: {
  tone: Tone;
  en: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  chips: string[];
  aside?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div className="relative overflow-hidden">
      <GlassBg tone={tone} />
      <section className={`wrap relative pb-20 pt-36 md:pb-28 md:pt-44 ${aside ? "grid items-center gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16" : ""}`}>
        <div>
          <Reveal>
            <p className="eyebrow">
              For <span className={t.text}>{t.label}</span> · {en}
            </p>
            <h1 className="h-display mt-5 max-w-4xl text-[32px] md:text-[58px]">{title}</h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-brown/90 md:text-[18px]">{desc}</p>
          </Reveal>
          <Reveal delay={150} className="mt-8 flex flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="chip !border-white/70 !bg-white/60 !px-3 !py-1.5 !text-[13px] backdrop-blur-md">
                {c}
              </span>
            ))}
          </Reveal>
          {children && (
            <Reveal delay={260} className="mt-10 flex flex-wrap gap-3">
              {children}
            </Reveal>
          )}
        </div>
        {aside && <Reveal delay={200} className="min-w-0">{aside}</Reveal>}
      </section>
    </div>
  );
}
