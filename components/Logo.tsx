import { LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo-paths";

/** 명함과 같은 세리프 "STAR OF AI" 로고 */
export default function Logo({ className = "", color = "#614215", title = "Star of AI" }: { className?: string; color?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} fill={color} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      {LOGO_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
