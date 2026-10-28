import { REVIEWS, SURVEY } from "@/lib/proof";
import Sparkle from "./Sparkle";

function Card({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <figure className="mx-2.5 flex w-[300px] shrink-0 flex-col justify-between rounded-[24px] border border-brown/10 bg-white p-6 shadow-[0_10px_30px_-18px_rgba(97,66,21,.35)] transition-transform duration-300 hover:-translate-y-1 md:w-[340px]">
      <div className="mb-3 flex gap-0.5 text-[#E8B400]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Sparkle key={i} className="h-3.5 w-3.5" color="#E8B400" />
        ))}
      </div>
      <blockquote className="text-[15px] leading-relaxed text-brown-dark">“{r.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center justify-between text-[12px] text-brown/60">
        <span>{r.who}</span>
        <span className="rounded-full bg-butter-pale px-2 py-0.5 font-semibold text-brown">추천 {r.score}/10</span>
      </figcaption>
    </figure>
  );
}

export default function ReviewMarquee() {
  const half = Math.ceil(REVIEWS.length / 2);
  const rows = [REVIEWS.slice(0, half), REVIEWS.slice(half)];
  return (
    <div className="space-y-5">
      {rows.map((row, i) => (
        <div key={i} className="marquee-mask group overflow-hidden">
          <div
            className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
            style={{ animationDirection: i ? "reverse" : "normal", animationDuration: i ? "70s" : "60s" }}
          >
            {[...row, ...row].map((r, j) => (
              <Card key={j} r={r} />
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-[12px] text-brown/50">출처: {SURVEY.source} · 설문 원문 그대로</p>
    </div>
  );
}
