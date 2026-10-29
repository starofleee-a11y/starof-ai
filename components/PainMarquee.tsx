import { PAINS } from "@/lib/pains";

/** 고객이 할 법한 고민을 말풍선으로, 가로로 천천히 흘려 보여줘요 */
export default function PainMarquee() {
  const list = [...PAINS, ...PAINS, ...PAINS, ...PAINS]; // 세 문장이라 네 번 반복해 띠를 채워요
  return (
    <div className="marquee-mask group relative -mx-5 overflow-hidden md:mx-0" aria-label="고객의 고민">
      <ul className="flex w-max animate-marquee gap-4 [animation-duration:38s] group-hover:[animation-play-state:paused] md:gap-5">
        {list.map((t, i) => (
          <li key={i} className={`bubble ${i % 2 ? "bubble-alt" : ""}`} aria-hidden={i >= PAINS.length}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
