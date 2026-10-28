import Link from "next/link";
import Logo from "./Logo";
import { NAV, OTHER_PROJECTS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brown-dark text-butter-pale">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo color="#FFEB51" className="h-7 w-auto" />
          <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-butter-pale/85">
            AX Consulting · AI Builder · AI Lecture
            <br />
            반복 업무는 AI에게 맡기고, 사람은 더 중요한 일에 집중하도록.
          </p>
        </div>
        <div>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-butter/80">Services</p>
          <ul className="space-y-2.5 text-[14px] text-butter-pale/90">
            {NAV.map((n) => (
              <li key={n.href}><Link className="hover:text-butter" href={n.href}>{n.label}</Link></li>
            ))}
            <li><Link className="hover:text-butter" href="/#coffee-chat">무료 커피챗</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-butter/80">Projects</p>
          <ul className="space-y-2.5 text-[14px] text-butter-pale/90">
            {OTHER_PROJECTS.map((p) => (
              <li key={p.name}><a className="hover:text-butter" href={p.href} target="_blank" rel="noreferrer">{p.name} ↗</a></li>
            ))}
            <li><a className="hover:text-butter" href={SITE.instagram} target="_blank" rel="noreferrer">Instagram {SITE.instagramHandle} ↗</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-butter/80">Contact</p>
          <ul className="space-y-2.5 text-[14px] text-butter-pale/90">
            <li><a className="hover:text-butter" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>{SITE.phone}</li>
            <li>{SITE.address}</li>
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-butter/10 py-6 text-[12px] text-butter-pale/65 md:flex-row md:justify-between">
        <p>상호 {SITE.company} · 대표 이경서 · {SITE.email}</p>
        <p>© {new Date().getFullYear()} Star of AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
