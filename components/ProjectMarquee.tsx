import { PROJECTS } from "@/lib/projects";

/** 프로젝트를 이미지 없이, 두 줄이 서로 반대 방향으로 천천히 흐르는 가로 모듈 */
export default function ProjectMarquee() {
  const half = Math.ceil(PROJECTS.length / 2);
  const rows = [PROJECTS.slice(0, half), PROJECTS.slice(half)];
  return (
    <div className="space-y-4">
      {rows.map((row, r) => {
        const list = [...row, ...row];
        return (
          <div key={r} className="marquee-mask group -mx-5 overflow-hidden md:mx-0">
            <ul className={`flex w-max gap-4 group-hover:[animation-play-state:paused] ${r ? "animate-marquee [animation-direction:reverse] [animation-duration:70s]" : "animate-marquee [animation-duration:62s]"}`}>
              {list.map((p, i) => (
                <li key={`${p.id}-${i}`} aria-hidden={i >= row.length} className="card flex w-[300px] shrink-0 flex-col p-6 md:w-[360px]">
                  <div className="flex items-center justify-between gap-2 text-[12px]">
                    <span className="font-semibold uppercase tracking-[0.15em] text-olive">{p.category}</span>
                    <span className="truncate font-medium text-brown/65">{p.org}</span>
                  </div>
                  <h3 className="mt-3 text-[15.5px] font-bold leading-snug text-brown-dark">{p.title}</h3>
                  <p className="mt-3 break-keep text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em] text-brown md:text-[28px]">{p.hook}</p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-brown/85">{p.how}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
