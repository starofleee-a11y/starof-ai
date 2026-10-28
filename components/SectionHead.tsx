import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  title,
  desc,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`h-display mt-4 text-[30px] md:text-[44px] ${center ? "mx-auto" : ""} max-w-3xl`}>{title}</h2>
      {desc && <p className={`mt-5 max-w-2xl text-[16px] leading-relaxed text-brown/75 md:text-[17px] ${center ? "mx-auto" : ""}`}>{desc}</p>}
    </Reveal>
  );
}
