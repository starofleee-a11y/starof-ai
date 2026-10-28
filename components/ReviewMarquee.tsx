import { REVIEWS, SURVEY } from "@/lib/proof";

function Card({ r }: { r: (typeof REVIEWS)[number] }) {
  return (
    <figure className="mx-2 flex w-[300px] shrink-0 flex-col justify-between rounded-2xl border border-brown/10 bg-white p-6 md:w-[340px]">
      <blockquote className="text-[15px] leading-relaxed text-brown-dark">“{r.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center justify-between text-[12px] text-brown/75">
        <span>{r.who}</span>
        <span className="font-semibold text-brown">추천 {r.score}/10</span>
      </figcaption>
    </figure>
  );
}

export default function ReviewMarquee() {
  const half = Math.ceil(REVIEWS.length / 2);
  const rows = [REVIEWS.slice(0, half), REVIEWS.slice(half)];
  return (
    <div className="space-y-4">
      {rows.map((row, i) => (
        <div key={i} className="marquee-mask group overflow-hidden">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" style={{ animationDirection: i ? "reverse" : "normal", animationDuration: i ? "70s" : "60s" }}>
            {[...row, ...row].map((r, j) => (
              <Card key={j} r={r} />
            ))}
          </div>
        </div>
      ))}
      <p className="text-center text-[12px] text-brown/65">출처: {SURVEY.source} · 설문 원문 그대로</p>
    </div>
  );
}
