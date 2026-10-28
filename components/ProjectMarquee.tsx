import Image from "next/image";
import { PROJECTS } from "@/lib/projects";

/**
 * 프로젝트를 화면 캡처와 함께 천천히 흐르는 가로 모듈.
 * 기본은 두 줄이 서로 반대 방향으로, rows=1 이면 한 줄이 화면 가운데를 가로질러 흘러요 (기업 AX 페이지).
 */
export default function ProjectMarquee({ companyOnly = false, rows: rowCount = 2 }: { companyOnly?: boolean; rows?: 1 | 2 }) {
  const items = companyOnly ? PROJECTS.filter((p) => p.forCompany) : PROJECTS;
  const half = Math.ceil(items.length / 2);
  const rows = rowCount === 1 ? [items] : [items.slice(0, half), items.slice(half)];
  return (
    <div className="space-y-4">
      {rows.map((row, r) => {
        const list = [...row, ...row];
        return (
          <div key={r} className={`marquee-mask group overflow-hidden ${rowCount === 1 ? "" : "-mx-5 md:mx-0"}`}>
            <ul className={`flex w-max items-stretch gap-4 group-hover:[animation-play-state:paused] ${r ? "animate-marquee [animation-direction:reverse] [animation-duration:70s]" : rowCount === 1 ? "animate-marquee [animation-duration:90s]" : "animate-marquee [animation-duration:62s]"}`}>
              {list.map((p, i) => (
                <li key={`${p.id}-${i}`} aria-hidden={i >= row.length} className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-brown/20 bg-white md:w-[380px]">
                  <div className="relative aspect-[4/3] border-b border-brown/10 bg-paper">
                    <Image src={p.image} alt={p.title} fill sizes="380px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-2 text-[12px]">
                      <span className="font-bold uppercase tracking-[0.15em] text-brown">{p.category}</span>
                      <span className="truncate font-medium text-brown/70">{p.org}</span>
                    </div>
                    <h3 className="mt-3 text-[15.5px] font-bold leading-snug text-brown-dark">{p.title}</h3>
                    <p className="mt-3 break-keep text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] text-brown-dark md:text-[28px]">{p.hook}</p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-brown/90">{p.how}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
