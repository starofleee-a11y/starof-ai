"use client";
import { useState } from "react";
import Link from "next/link";

export default function LeadMagnet({
  product,
  file,
  fileName,
  title,
  desc,
  cover,
}: {
  product: string;
  file: string;
  fileName: string;
  title: string;
  desc: string;
  cover?: React.ReactNode;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: f.get("name"),
        phone: f.get("phone"),
        email: f.get("email"),
        smsConsent: f.get("smsConsent") === "on",
        product,
        file: fileName,
      }),
    }).catch(() => null);
    setState("done");
    const a = document.createElement("a");
    a.href = file;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div className="rounded-2xl bg-butter-deep p-6 md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        <div className="order-2 md:order-1">
          <p className="eyebrow">Free PDF</p>
          <h3 className="h-display mt-3 text-[26px] md:text-[32px]">{title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-brown/90">{desc}</p>
          {state === "done" ? (
            <div className="mt-6 rounded-xl bg-white/80 p-5">
              <p className="font-semibold text-brown-dark">다운로드가 시작됐어요.</p>
              <a href={file} download={fileName} className="mt-2 inline-block text-[14px] text-brown underline underline-offset-4">
                안 받아졌다면 여기를 눌러주세요
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 grid gap-2.5">
              <div className="grid gap-2.5 sm:grid-cols-2">
                <input name="name" required placeholder="이름" className="field !bg-white/90" />
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  pattern="0\d{1,2}-?\d{3,4}-?\d{4}"
                  title="010-0000-0000 형식으로 입력해 주세요"
                  placeholder="휴대폰 번호 (010-0000-0000)"
                  className="field !bg-white/90"
                />
              </div>
              <div className="grid gap-2.5 sm:grid-cols-[1fr_auto]">
                <input name="email" type="email" required placeholder="메일 주소" className="field !bg-white/90" />
                <button disabled={state === "sending"} className="btn-primary whitespace-nowrap disabled:opacity-60">
                  {state === "sending" ? "준비 중…" : "무료로 받기"}
                </button>
              </div>
              <div className="mt-1 space-y-1.5 text-[13px] leading-relaxed text-brown/80">
                <label className="flex items-start gap-2">
                  <input type="checkbox" name="privacyConsent" required className="mt-[3px] h-4 w-4 shrink-0 accent-brown" />
                  <span className="break-keep">
                    <b className="font-semibold text-brown-dark">(필수)</b> 자료 발송과 안내를 위해 이름·휴대폰 번호·메일을 수집하고 1년 동안 보관하는 데 동의해요.{" "}
                    <Link href="/privacy" target="_blank" className="underline underline-offset-2">자세히</Link>
                  </span>
                </label>
                <label className="flex items-start gap-2">
                  <input type="checkbox" name="smsConsent" className="mt-[3px] h-4 w-4 shrink-0 accent-brown" />
                  <span className="break-keep">
                    <b className="font-semibold text-brown-dark">(선택)</b> 강의 오픈·할인 같은 소식을 문자와 메일로 받아볼게요. 언제든 수신거부할 수 있어요.
                  </span>
                </label>
              </div>
            </form>
          )}
        </div>
        <div className="order-1 md:order-2">{cover}</div>
      </div>
    </div>
  );
}
