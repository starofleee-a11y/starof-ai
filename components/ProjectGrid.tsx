"use client";
import Image from "next/image";
import { useState } from "react";
import { PROJECTS, CATEGORIES, type Category } from "@/lib/projects";

/** AX 프로젝트를 카테고리별로 넘겨 보는 그리드. hook은 세리프로 크게. */
export default function ProjectGrid({ companyOnly = false }: { companyOnly?: boolean }) {
  const base = companyOnly ? PROJECTS.filter((p) => p.forCompany) : PROJECTS;
  const cats = CATEGORIES.filter((c) => base.some((p) => p.category === c));
  const [cat, setCat] = useState<Category | "전체">("전체");
  const list = cat === "전체" ? base : base.filter((p) => p.category === cat);
  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0">
        {(["전체", ...cats] as const).map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className={`pick shrink-0 !rounded-full !px-4 ${cat === c ? "pick-on" : ""}`}>
            {c}
            <span className="ml-1.5 text-[12px] opacity-60">{c === "전체" ? base.length : base.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {list.map((p) => (
          <article key={p.id} className="card group grid overflow-hidden sm:grid-cols-[0.9fr_1.1fr]">
            <div className="relative aspect-[4/3] bg-paper sm:aspect-auto sm:min-h-[220px]">
              <Image src={p.image} alt={p.title} fill sizes="(min-width:768px) 25vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col p-6">
              <div className="flex items-center justify-between gap-2 text-[12px]">
                <span className="font-semibold uppercase tracking-[0.15em] text-olive">{p.category}</span>
                <span className="truncate text-brown/50">{p.org}</span>
              </div>
              <h3 className="mt-3 text-[16px] font-bold leading-snug text-brown-dark">{p.title}</h3>
              <p className="mt-3 break-keep font-serif text-[28px] font-semibold leading-[1.05] text-brown md:text-[32px]">{p.hook}</p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-brown/70">{p.how}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
