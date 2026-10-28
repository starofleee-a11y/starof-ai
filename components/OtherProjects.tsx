import { OTHER_PROJECTS } from "@/lib/site";
import Reveal from "./Reveal";

export default function OtherProjects() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {OTHER_PROJECTS.map((p, i) => (
        <Reveal key={p.name} delay={i * 100}>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-brown/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brown/30 md:p-9"
          >
            <span className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-butter/0 blur-2xl transition-all duration-700 group-hover:bg-butter/70" />
            <div className="relative">
              <span className="chip">{p.tag}</span>
              <h3 className="mt-5 font-serif text-[36px] font-semibold leading-none text-brown">{p.name}</h3>
              <p className="mt-2 text-[15px] font-semibold text-brown-dark">{p.label}</p>
              <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-brown/85">{p.desc}</p>
            </div>
            <span className="relative mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-brown">
              사이트 둘러보기
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
