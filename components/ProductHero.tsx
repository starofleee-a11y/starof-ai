import GlowArea from "./GlowArea";
import Reveal from "./Reveal";
import Sparkle from "./Sparkle";

export default function ProductHero({
  index,
  en,
  title,
  desc,
  chips,
  children,
}: {
  index: string;
  en: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  chips: string[];
  children?: React.ReactNode;
}) {
  return (
    <GlowArea className="overflow-hidden">
      <section className="wrap relative pb-20 pt-36 md:pb-28 md:pt-48">
        <Sparkle className="absolute right-[8%] top-32 hidden h-14 w-14 animate-twinkle text-brown md:block" />
        <Reveal>
          <p className="font-serif text-[18px] italic text-olive">
            {index} · {en}
          </p>
          <h1 className="h-display mt-5 max-w-4xl text-[38px] md:text-[64px]">{title}</h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-brown/80 md:text-[18px]">{desc}</p>
        </Reveal>
        <Reveal delay={150} className="mt-8 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="chip !bg-white/80 !px-4 !py-1.5 !text-[13px]">
              {c}
            </span>
          ))}
        </Reveal>
        {children && (
          <Reveal delay={260} className="mt-10 flex flex-wrap gap-3">
            {children}
          </Reveal>
        )}
      </section>
    </GlowArea>
  );
}
