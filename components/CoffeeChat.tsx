"use client";
import { useMemo, useState } from "react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK; // 예: "starofai/coffee-chat"

const TOPICS = ["업무 자동화가 막막해요", "AI 강의·스터디가 궁금해요", "회사 AX 도입을 고민 중이에요", "기타"];
const TIMES = ["10:00", "11:00", "14:00", "15:00", "16:00", "19:30", "20:30"];

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0) out.push(new Date(d)); // 일요일 제외
  }
  return out;
}
const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
const wd = (d: Date) => "일월화수목금토"[d.getDay()];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function CoffeeChat() {
  if (CAL_LINK) {
    // Cal.com이 연결되면: 실시간 빈 시간 · 줌 링크 자동 생성 · 24시간 전 리마인드 · 취소/변경 버튼 메일이 모두 자동
    return (
      <div className="overflow-hidden rounded-[28px] border border-brown/10 bg-white shadow-[0_30px_60px_-30px_rgba(97,66,21,.35)]">
        <iframe
          title="무료 커피챗 예약"
          src={`https://cal.com/${CAL_LINK}?embed=true&theme=light&layout=month_view&brandColor=%23614215`}
          className="h-[720px] w-full"
          loading="lazy"
        />
      </div>
    );
  }
  return <RequestForm />;
}

function RequestForm() {
  const days = useMemo(() => nextDays(10), []);
  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

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
      body: JSON.stringify({
        name: f.get("name"),
        email: f.get("email"),
        concern: f.get("concern"),
        topic,
        date: day,
        time,
      }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    if (res?.ok) setState("done");
    else {
      setState("error");
      setMsg(data.error || "전송에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  }

  if (state === "done")
    return (
      <div className="card p-10 text-center">
        <p className="font-serif text-5xl italic text-brown">Thank you</p>
        <p className="mt-4 text-[17px] font-semibold text-brown-dark">커피챗 신청이 접수됐어요.</p>
        <p className="mt-2 text-[15px] text-brown/70">
          {day} {time} 일정 확인 후 줌 링크를 메일로 보내드릴게요.
          <br />
          미팅 하루 전에 리마인드 메일도 함께 드려요.
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="card grid min-w-0 gap-6 !bg-cream p-6 md:p-8">
      <div className="min-w-0">
        <span className="label">1. 날짜를 골라주세요</span>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {days.map((d) => {
            const v = iso(d);
            const on = v === day;
            return (
              <button
                type="button"
                key={v}
                onClick={() => setDay(v)}
                className={`flex w-[64px] shrink-0 flex-col items-center rounded-2xl border py-3 transition-all ${
                  on ? "border-brown bg-brown text-butter shadow-lg" : "border-brown/15 bg-white text-brown hover:border-brown/40"
                } ${d.getDay() === 6 ? "text-[#B0702A]" : ""}`}
              >
                <span className="text-[11px] opacity-70">{wd(d)}</span>
                <span className="text-[16px] font-bold">{fmt(d)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <span className="label">2. 시간을 골라주세요 (30분)</span>
        <div className="flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTime(t)}
              className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-all ${
                t === time ? "border-brown bg-butter text-brown-dark" : "border-brown/15 bg-white text-brown hover:border-brown/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <span className="label">3. 어떤 이야기를 나누고 싶으세요?</span>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-2 text-[13.5px] transition-all ${
                t === topic ? "border-brown bg-brown text-butter" : "border-brown/15 bg-white text-brown hover:border-brown/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="label" htmlFor="cc-name">이름</label>
          <input id="cc-name" name="name" required className="field" placeholder="홍길동" />
        </div>
        <div>
          <label className="label" htmlFor="cc-email">메일 (줌 링크를 보내드려요)</label>
          <input id="cc-email" name="email" type="email" required className="field" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="cc-concern">자동화 고민을 편하게 적어주세요</label>
        <textarea
          id="cc-concern"
          name="concern"
          rows={4}
          className="field resize-none"
          placeholder="예) 매주 월요일마다 엑셀 3개를 합쳐서 보고서를 만드는데, 2시간씩 걸려요."
        />
      </div>
      {msg && <p className="text-[14px] font-medium text-[#B04A1A]">{msg}</p>}
      <button disabled={state === "sending"} className="btn-primary w-full !py-4 text-[16px] disabled:opacity-60">
        {state === "sending" ? "보내는 중…" : "무료 커피챗 예약하기"}
      </button>
      <p className="-mt-2 text-center text-[12px] text-brown/50">30분 · 온라인(줌) · 영업 전화는 하지 않아요</p>
    </form>
  );
}
