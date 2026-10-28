import type { Tone } from "@/lib/tones";
import { TONES } from "@/lib/tones";

/** 움직이는 빛 + 글라스 레이어 배경. tone에 따라 빛 색이 달라져요. */
export default function GlassBg({ tone = "starters", className = "" }: { tone?: Tone; className?: string }) {
  const t = TONES[tone];
  return (
    <div
      className={`hero-bg ${className}`}
      aria-hidden
      style={{ "--b1": t.blobs[0], "--b2": t.blobs[1], "--b3": t.blobs[2] } as React.CSSProperties}
    >
      <span className="blob blob-1" />
      <span className="blob blob-2" />
      <span className="blob blob-3" />
      <span className="glass" />
    </div>
  );
}
