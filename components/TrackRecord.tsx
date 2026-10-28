"use client";
import { useState } from "react";
import Image from "next/image";
import { AUTOMATIONS, CONSULTING, LECTURES } from "@/lib/proof";

const TABS = [
  { id: "lecture", label: "강의 이력", count: LECTURES.length },
  { id: "automation", label: "자동화 프로젝트", count: AUTOMATIONS.length },
  { id: "consulting", label: "AX 컨설팅", count: CONSULTING.length },
] as const;

export default function TrackRecord() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("lecture");
  return (
    <div>
      <div role="tablist" className="mb-10 inline-flex rounded-full border border-brown/15 bg-white p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`relative rounded-full px-4 py-2.5 text-[14px] font-semibold transition-all duration-300 md:px-6 ${
              tab === t.id ? "bg-brown text-butter" : "text-brown/70 hover:text-brown"
            }`}
          >
            {t.label}
            <span className={`ml-1.5 font-serif text-[13px] italic ${tab === t.id ? "text-butter/70" : "text-brown/40"}`}>{t.count}</span>
          </button>
        ))}
      </div>

      <div key={tab} className="animate-[fadeUp_.6s_cubic-bezier(.2,.7,.2,1)]">
        {tab === "lecture" && (
          <div className="grid gap-8 md:grid-cols-[1.25fr_1fr]">
            <ol className="relative border-l border-brown/15 pl-7">
              {LECTURES.map((l) => (
                <li key={l.org + l.date + l.title} className="group relative pb-7 last:pb-0">
                  <span className="absolute -left-[34px] top-1.5 h-3 w-3 rounded-full border-2 border-brown bg-cream transition-colors group-hover:bg-butter" />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-serif text-[15px] italic text-olive">{l.date}</span>
                    <span className="chip !py-0.5">{l.kind}</span>
                    <span className="text-[13px] text-brown/50">{l.people}명</span>
                  </div>
                  <p className="mt-1.5 text-[16.5px] font-semibold text-brown-dark">{l.org}</p>
                  <p className="text-[14.5px] text-brown/70">{l.title}</p>
                </li>
              ))}
            </ol>
            <div className="grid grid-cols-2 gap-3 self-start">
              <div className="col-span-2 overflow-hidden rounded-[24px]">
                <Image src="/images/lecture-gsb.jpg" alt="강의 현장" width={900} height={1200} className="h-[320px] w-full object-cover object-[50%_60%] transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-[20px]">
                <Image src="/images/gsb-poster-1.jpg" alt="성균관대 GSB 클로드 코드 워크샵 포스터" width={706} height={1000} className="h-auto w-full transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="overflow-hidden rounded-[20px]">
                <Image src="/images/gsb-poster-2.jpg" alt="성균관대 GSB 클로드 코드 워크샵 포스터 2" width={706} height={1000} className="h-auto w-full transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
          </div>
        )}

        {tab === "automation" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AUTOMATIONS.map((a, i) => (
              <div key={a.title} className="group rounded-[24px] border border-brown/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brown/30 hover:shadow-[0_24px_50px_-30px_rgba(97,66,21,.5)]">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[28px] italic leading-none text-butter-deep [-webkit-text-stroke:1px_#614215]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="chip">{a.tag}</span>
                </div>
                <p className="mt-6 text-[17px] font-bold text-brown-dark">{a.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-brown/70">{a.desc}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "consulting" && (
          <div className="grid gap-4 md:grid-cols-3">
            {CONSULTING.map((c) => (
              <div key={c.org} className="rounded-[24px] bg-brown p-8 text-butter-pale transition-transform duration-500 hover:-translate-y-1">
                <p className="font-serif text-[14px] italic text-butter/70">{c.period}</p>
                <p className="mt-3 text-[20px] font-bold text-butter">{c.org}</p>
                <p className="mt-1 text-[15px] font-semibold">{c.title}</p>
                <p className="mt-4 text-[14px] leading-relaxed text-butter-pale/70">{c.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
