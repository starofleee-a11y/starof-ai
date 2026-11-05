"use client";
import { useState } from "react";
import Link from "next/link";
import { STUDY } from "@/lib/study";
import { ONEDAY } from "@/lib/oneday";
import { PRODUCTS, FRIEND_DISCOUNT, calcAmount, hasFriendDiscount, won } from "@/lib/products";

const BANK = process.env.NEXT_PUBLIC_BANK_ACCOUNT; // 예: "카카오뱅크 3333-00-0000000 이경서"

type Kind = "study" | "oneday" | "consulting";

// 상품마다 다른 문구 · 체크 항목
const COPY: Record<Kind, { eyebrow: string; title: string; sub: string; topicLabel: string; topicPh: string; topicRequired: boolean; checks: { name: string; text: string }[]; submit: string; done: string }> = {
  study: {
    eyebrow: "Apply",
    title: `${STUDY.cohort} 신청`,
    sub: `신청 마감 ${STUDY.deadline} · 선정 결과 ${STUDY.resultDate}`,
    topicLabel: "자동화하고 싶은 실무 주제",
    topicPh: "예) 매주 월요일 영업 데이터를 엑셀로 정리해서 보고서로 만드는 일",
    topicRequired: true,
    checks: [
      { name: "pro", text: "클로드 Pro 구독을 첫 세션 전까지 준비할 수 있어요." },
      { name: "schedule", text: "4회 일정(11/8 · 11/15 · 11/18 · 11/22)에 모두 참여할 수 있어요." },
    ],
    submit: "스터디 신청하기",
    done: `선정 결과는 ${STUDY.resultDate} 남겨주신 번호로 카카오톡 팀 채팅 초대와 함께 알려드려요. 참가비는 지금 결제하거나, 선정 안내를 받은 뒤 결제하셔도 돼요.`,
  },
  oneday: {
    eyebrow: "Apply",
    title: `${ONEDAY.cohort} 신청`,
    sub: `${ONEDAY.date} · ${ONEDAY.mode} · 신청 마감 ${ONEDAY.deadline}`,
    topicLabel: "만들고 싶은 릴스 · 운영 중인 채널 (선택)",
    topicPh: "예) 카페 신메뉴 홍보 릴스, 인스타 @my_cafe 운영 중",
    topicRequired: false,
    checks: [{ name: "schedule", text: `${ONEDAY.date} 오프라인 수업에 참여할 수 있고, 개인 노트북을 가져올 수 있어요.` }],
    submit: "원데이 신청하기",
    done: "자리 확정과 준비 안내(툴 계정·사진 준비)는 남겨주신 메일로 보내드려요. 결제를 마치면 자리가 확정됩니다.",
  },
  consulting: {
    eyebrow: "Apply",
    title: "1:1 AX 컨설팅 신청",
    sub: "신청 후 1영업일 안에 연락드리고, 무료 커피챗 30분으로 범위를 먼저 확정해요.",
    topicLabel: "자동화하고 싶은 업무 (병목)",
    topicPh: "예) 매주 엑셀 3개를 합쳐 주간 보고서 PDF로 만들고 팀 슬랙에 공유하는 일",
    topicRequired: true,
    checks: [],
    submit: "1:1 컨설팅 신청하기",
    done: "1영업일 안에 남겨주신 연락처로 연락드려요. 커피챗에서 자동화 범위와 일정, 결제 시점을 같이 정합니다.",
  },
};

/** 스터디 · 원데이 · 1:1 컨설팅 신청서. bare=true면 팝업 안에서 쓰는 모양(카드 테두리 없음) */
export default function ApplyForm({ product, bare = false }: { product: Kind; bare?: boolean }) {
  const c = COPY[product];
  const p = PRODUCTS[product];
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [friend, setFriend] = useState(false);
  const [friendName, setFriendName] = useState("");
  const discount = friend && hasFriendDiscount(product);
  const amount = calcAmount(product, 1, discount);
  const checkoutHref = p.payable ? `/checkout?product=${product}&qty=1${discount ? `&friend=${encodeURIComponent(friendName.trim())}` : ""}` : "";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product,
        name: fd.get("name"),
        phone: fd.get("phone"),
        email: fd.get("email"),
        job: fd.get("job"),
        topic: fd.get("topic"),
        pro: fd.get("pro") === "on",
        schedule: fd.get("schedule") === "on",
        friend: discount,
        friendName: discount ? friendName.trim() : "",
      }),
    }).catch(() => null);
    if (res?.ok) setState("done");
    else {
      const d = res ? await res.json().catch(() => ({})) : {};
      setErr(d.error || "전송에 실패했어요. 잠시 후 다시 시도해 주세요.");
      setState("error");
    }
  }

  const shell = bare ? "grid gap-5" : "card grid gap-5 p-6 md:p-9";

  if (state === "done")
    return (
      <div className={bare ? "" : "card p-8 md:p-10"}>
        <p className="eyebrow">Received</p>
        <p className="mt-3 text-[22px] font-bold text-brown-dark">신청이 접수됐어요.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-brown/85">{c.done}</p>
        {p.payable ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href={checkoutHref} className="btn-primary !py-3.5">
              {won(amount)} 결제하기
            </Link>
            {BANK ? (
              <div className="rounded-xl bg-paper px-4 py-3 text-[13.5px] text-brown/90">
                <p className="font-semibold text-brown-dark">계좌이체</p>
                <p>{BANK}</p>
              </div>
            ) : (
              <Link href="/#coffee-chat" className="btn-ghost !py-3.5">궁금한 점은 커피챗으로</Link>
            )}
          </div>
        ) : (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/#coffee-chat" className="btn-primary !py-3.5">무료 커피챗 바로 예약</Link>
            <Link href="/consulting#cases" className="btn-ghost !py-3.5">AX 프로젝트 사례 보기</Link>
          </div>
        )}
        {discount && <p className="mt-4 text-[13px] text-brown/70">지인할인 적용 · 추천해 주신 분: <b className="font-semibold text-brown-dark">{friendName}</b></p>}
      </div>
    );

  return (
    <form onSubmit={submit} className={shell}>
      <div>
        <p className="eyebrow">{c.eyebrow}</p>
        <p className="mt-2 text-[20px] font-bold text-brown-dark">{c.title}</p>
        <p className="mt-1 text-[14px] text-brown/75">{c.sub}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor={`${product}-name`}>이름</label>
          <input id={`${product}-name`} name="name" required className="field" placeholder="홍길동" />
        </div>
        <div>
          <label className="label" htmlFor={`${product}-phone`}>연락처{product === "study" && <span className="font-normal text-brown/60"> · 카카오톡 초대용</span>}</label>
          <input id={`${product}-phone`} name="phone" required className="field" placeholder="010-0000-0000" />
        </div>
        <div>
          <label className="label" htmlFor={`${product}-email`}>메일</label>
          <input id={`${product}-email`} name="email" type="email" required className="field" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label" htmlFor={`${product}-job`}>하는 일</label>
          <input id={`${product}-job`} name="job" className="field" placeholder="예) 스타트업 마케터, 인사팀 3년차" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor={`${product}-topic`}>{c.topicLabel}</label>
          <textarea id={`${product}-topic`} name="topic" required={c.topicRequired} rows={3} className="field resize-none" placeholder={c.topicPh} />
        </div>
      </div>

      {c.checks.length > 0 && (
        <div className="space-y-2.5 rounded-xl bg-paper p-4 text-[14px] text-brown/90">
          {c.checks.map((k) => (
            <label key={k.name} className="flex items-start gap-3">
              <input type="checkbox" name={k.name} required className="mt-1 h-4 w-4 accent-brown" />
              {k.text}
            </label>
          ))}
        </div>
      )}

      {hasFriendDiscount(product) && (
        // 지인할인 — 체크하면 지인 성함 칸이 열리고 참가비가 바뀝니다
        <div className={`rounded-xl border p-4 transition-colors ${friend ? "border-brown bg-butter-pale" : "border-brown/15 bg-white"}`}>
          <label className="flex items-start gap-3 text-[14.5px] text-brown-dark">
            <input type="checkbox" name="friend" checked={friend} onChange={(e) => setFriend(e.target.checked)} className="mt-1 h-4 w-4 accent-brown" />
            <span>
              <b className="font-bold">지인할인</b> — 1기 수강생이나 Winter의 지인 추천으로 신청해요.
              <span className="ml-1.5 inline-block rounded-full bg-brown px-2 py-0.5 text-[12px] font-bold text-butter">-{won(FRIEND_DISCOUNT)}</span>
            </span>
          </label>
          {friend && (
            <div className="mt-3 pl-7">
              <label className="label" htmlFor={`${product}-friend`}>추천해 주신 지인 성함</label>
              <input id={`${product}-friend`} value={friendName} onChange={(e) => setFriendName(e.target.value)} required className="field" placeholder="예) 김예지" />
            </div>
          )}
        </div>
      )}

      {state === "error" && <p className="text-[14px] font-medium text-[#B04A1A]">{err}</p>}
      <button disabled={state === "sending"} className="btn-primary w-full !py-4 text-[16px] disabled:opacity-60">
        {state === "sending" ? "보내는 중…" : c.submit}
      </button>
      {p.payable && (
        <p className="-mt-1 text-center text-[13px] text-brown/75">
          참가비{" "}
          {discount ? (
            <>
              <s className="text-brown/45">{won(p.price)}</s> <b className="font-extrabold text-brown-dark">{won(amount)}</b>
              <span className="ml-1 text-[12px] font-semibold text-olive">지인할인 적용</span>
            </>
          ) : (
            <b className="font-bold text-brown-dark">{won(p.price)}</b>
          )}
          {product === "study" && <> · 4회 전부 참석 시 {won(STUDY.refund)} 환급</>}
          {product === "oneday" && <> · {ONEDAY.duration}</>}
        </p>
      )}
      {!p.payable && <p className="-mt-1 text-center text-[12px] text-brown/65">{p.priceLabel} / {p.unit} · 결제는 커피챗에서 범위를 확정한 뒤 진행해요.</p>}
    </form>
  );
}
