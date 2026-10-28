import Reveal from "./Reveal";

export default function ProductHero({
  audience,
  en,
  title,
  desc,
  chips,
  children,
}: {
  audience: string;
  en: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  chips: string[];
  children?: React.ReactNode;
}) {
  return (
    <div className="glow-bg">
      <section className="wrap relative pb-20 pt-36 md:pb-28 md:pt-48">
        <Reveal>
          <p className="eyebrow">
            For {audience} · {en}
          </p>
          <h1 className="h-display mt-5 max-w-4xl text-[36px] md:text-[62px]">{title}</h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-brown/80 md:text-[18px]">{desc}</p>
        </Reveal>
        <Reveal delay={150} className="mt-8 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span key={c} className="chip !bg-white/80 !px-3 !py-1.5 !text-[13px]">
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
    </div>
  );
}
