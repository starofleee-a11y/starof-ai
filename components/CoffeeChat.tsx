"use client";
import { useEffect, useMemo, useState } from "react";
import type { DaySlots } from "@/lib/slots";

const TOPICS = ["업무 자동화가 막막해요", "AI 강의·스터디가 궁금해요", "1:1 AX 컨설팅을 고민 중이에요", "회사 AX 도입을 고민 중이에요", "기타"];
const WD = "일월화수목금토";

export default function CoffeeChat() {
  const [days, setDays] = useState<DaySlots[] | null>(null);
  const [live, setLive] = useState(false);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [result, setResult] = useState<{ when: string; link?: string; confirmed: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/availability", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: { live: boolean; days: DaySlots[] }) => {
        setDays(d.days);
        setLive(d.live);
        const first = d.days.find((x) => x.slots.length);
        if (first) setDay(first.date);
      })
      .catch(() => setDays([]));
  }, []);

  const current = useMemo(() => days?.find((d) => d.date === day), [days, day]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!day || !time) {
      setMsg("날짜와 시간을 골라주세요.");
      return;
    }
    const f = new FormData(e.currentTarget);
    setState("sending");
    setMsg("");
    const res = await fetch("/api/coffee-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: f.get("name"), email: f.get("email"), concern: f.get("concern"), topic: f.get("topic"), date: day, time }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) {
      setResult({ when: data.when, link: data.link, confirmed: data.confirmed });
      setState("done");
    } else {
      setState("error");
      setMsg(data.error || "전송에 실패했어요. 잠시 후 다시 시도해 주세요.");
      if (res?.status === 409) {
        setTime("");
        fetch("/api/availability", { cache: "no-store" }).then((r) => r.json()).then((d) => setDays(d.days)).catch(() => {});
      }
    }
  }

  if (state === "done" && result)
    return (
      <div className="card p-8 md:p-10">
        <p className="eyebrow">{result.confirmed ? "Confirmed" : "Received"}</p>
        <p className="mt-3 text-[22px] font-bold text-brown-dark">{result.confirmed ? "커피챗 예약이 확정됐어요." : "커피챗 신청이 접수됐어요."}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-brown/85">
          {result.when} · 30분 · 온라인
          <br />
          {result.confirmed ? "캘린더 초대와 미팅 링크를 메일로 보냈어요. 하루 전에 리마인드도 드릴게요." : "일정 확인 후 미팅 링크를 메일로 보내드릴게요."}
        </p>
        {result.link && (
          <a href={result.link} target="_blank" rel="noreferrer" className="btn-primary mt-6 !py-3 !text-[14px]">
            미팅 링크 열기
          </a>
        )}
      </div>
    );

  return (
    <form onSubmit={submit} className="card grid min-w-0 gap-7 p-6 md:p-8">
      <div className="min-w-0">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="label !mb-0">날짜</span>
          <span className="text-[12px] text-brown/60">{live ? "캘린더 기준 실시간" : "오늘부터 2주"}</span>
        </div>
        {days === null ? (
          <div className="h-[62px] animate-pulse rounded-xl bg-paper" />
        ) : (
          <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {days.map((d) => {
              const on = d.date === day;
              const off = d.slots.length === 0;
              const dd = Number(d.date.slice(8));
              return (
                <button
                  type="button"
                  key={d.date}
                  disabled={off}
                  onClick={() => {
                    setDay(d.date);
                    setTime("");
                  }}
                  className={`pick flex w-[54px] shrink-0 flex-col items-center !px-0 ${on ? "pick-on" : ""} ${d.weekday === 0 || d.weekday === 6 ? "text-[#B0702A]" : ""}`}
                >
                  <span className="text-[11px] opacity-60">{WD[d.weekday]}</span>
                  <span className="text-[16px] font-bold">{dd}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <span className="label">시간 <span className="font-normal text-brown/60">· 30분</span></span>
        {current && current.slots.length ? (
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5">
            {current.slots.map((t) => (
              <button type="button" key={t} onClick={() => setTime(t)} className={`pick ${t === time ? "pick-on" : ""}`}>
                {t}
              </button>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-paper px-4 py-3 text-[14px] text-brown/75">{days ? "날짜를 먼저 골라주세요." : "가능한 시간을 불러오는 중…"}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="cc-name">이름</label>
          <input id="cc-name" name="name" required className="field" placeholder="홍길동" />
        </div>
        <div>
          <label className="label" htmlFor="cc-email">메일</label>
          <input id="cc-email" name="email" type="email" required className="field" placeholder="you@example.com" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="cc-topic">나누고 싶은 이야기</label>
          <select id="cc-topic" name="topic" className="field" defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="cc-concern">자동화 고민 <span className="font-normal text-brown/60">· 선택</span></label>
          <textarea id="cc-concern" name="concern" rows={3} className="field resize-none" placeholder="예) 매주 월요일마다 엑셀 3개를 합쳐서 보고서를 만드는데, 2시간씩 걸려요." />
        </div>
      </div>

      {msg && <p className="-mt-2 text-[14px] font-medium text-[#B04A1A]">{msg}</p>}
      <button disabled={state === "sending" || !days} className="btn-primary w-full !py-4 text-[16px] disabled:opacity-60">
        {state === "sending" ? "예약하는 중…" : day && time ? `${Number(day.slice(5, 7))}/${Number(day.slice(8))} ${time} 예약하기` : "무료 커피챗 예약하기"}
      </button>
      <p className="-mt-3 text-center text-[12px] text-brown/65">온라인 미팅 링크가 메일로 가요 · 영업 전화는 하지 않아요</p>
    </form>
  );
}
