import { NextRequest, NextResponse } from "next/server";
import { notifySlack, sendMail, noticeToHtml, OWNER_EMAIL, clean, isEmail, escapeHtml } from "@/lib/notify";
import { recordToSheet } from "@/lib/sheets";
import { STUDY } from "@/lib/study";
import { ONEDAY } from "@/lib/oneday";
import { PRODUCTS, FRIEND_DISCOUNT, calcAmount, hasFriendDiscount, won } from "@/lib/products";

export const runtime = "nodejs";

type Kind = "study" | "oneday" | "consulting";
const KINDS: Kind[] = ["study", "oneday", "consulting"];

const META: Record<Kind, { emoji: string; label: string; footer: string; mailTitle: string; mailBody: string }> = {
  study: {
    emoji: "🎓",
    label: "스터디 신청",
    footer: `${STUDY.cohort} · 선정 결과는 ${STUDY.resultDate} 카카오톡으로 안내`,
    mailTitle: `${STUDY.cohort} 신청이 접수됐어요`,
    mailBody: `<p>${STUDY.cohort} 신청이 접수됐어요.<br>선정 결과는 <b>${STUDY.resultDate}</b> 남겨주신 번호로 카카오톡 팀 채팅 초대와 함께 알려드릴게요.</p><p style="font-size:14px">첫 세션 전까지 클로드 Pro 구독을 준비해 주세요.</p>`,
  },
  oneday: {
    emoji: "🎬",
    label: "원데이 신청",
    footer: `${ONEDAY.cohort} · ${ONEDAY.date} · 결제 완료 시 자리 확정`,
    mailTitle: `${ONEDAY.cohort} 신청이 접수됐어요`,
    mailBody: `<p>${ONEDAY.cohort} <b>「${ONEDAY.title}」</b> 신청이 접수됐어요.<br>일정은 <b>${ONEDAY.date}</b>, ${ONEDAY.place}예요.</p><p style="font-size:14px">결제를 마치면 자리가 확정되고, 툴 계정·사진 준비 안내를 수업 전에 다시 보내드릴게요.</p>`,
  },
  consulting: {
    emoji: "🧭",
    label: "1:1 컨설팅 신청",
    footer: "1영업일 안에 연락 → 무료 커피챗 30분으로 범위 확정",
    mailTitle: "1:1 AX 컨설팅 신청이 접수됐어요",
    mailBody: `<p>1:1 AX 컨설팅 신청이 접수됐어요.<br>1영업일 안에 남겨주신 연락처로 연락드리고, <b>무료 커피챗 30분</b>으로 자동화 범위와 일정을 먼저 정해요.</p>`,
  },
};

/** 스터디 · 원데이 · 1:1 컨설팅 신청서 → 슬랙 + 대표 메일 + 신청자 확인 메일 */
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({}));
  const product: Kind = KINDS.includes(b.product) ? b.product : "study";
  const friend = b.friend === true && hasFriendDiscount(product);
  const f = {
    name: clean(b.name, 50),
    phone: clean(b.phone, 30),
    email: clean(b.email, 120),
    job: clean(b.job, 100),
    topic: clean(b.topic, 1500),
    pro: b.pro === true ? "예" : "아니오",
    schedule: b.schedule === true ? "예" : "아니오",
    friendName: friend ? clean(b.friendName, 50) : "",
  };
  const topicRequired = product !== "oneday";
  if (!f.name || !f.phone || !isEmail(f.email) || (topicRequired && !f.topic)) {
    return NextResponse.json({ error: topicRequired ? "이름, 연락처, 메일, 자동화 주제를 확인해 주세요." : "이름, 연락처, 메일을 확인해 주세요." }, { status: 400 });
  }
  if (friend && !f.friendName) return NextResponse.json({ error: "지인할인을 선택하셨다면 추천해 주신 분의 성함을 적어 주세요." }, { status: 400 });

  const m = META[product];
  const p = PRODUCTS[product];
  const amount = calcAmount(product, 1, friend);
  const fields: [string, string | undefined][] = [
    ["이름", f.name],
    ["연락처", f.phone],
    ["메일", f.email],
    ["하는 일", f.job],
    [product === "oneday" ? "만들고 싶은 릴스 · 채널" : "자동화 주제", f.topic],
  ];
  if (product === "study") fields.push(["클로드 Pro 구독", f.pro], ["4회 전부 참석 가능", f.schedule]);
  if (product === "oneday") fields.push(["일정 참여 · 노트북 지참", f.schedule]);
  if (p.payable) fields.push(["참가비", friend ? `${won(amount)} (지인할인 -${won(FRIEND_DISCOUNT)} · 추천: ${f.friendName})` : won(amount)]);

  const notice = {
    emoji: m.emoji,
    title: `${m.label} · ${f.name}${friend ? " · 지인할인" : ""}`,
    fields,
    footer: m.footer,
  };
  const priceLine = p.payable
    ? `<p style="font-size:14px">참가비는 <b>${won(amount)}</b>${friend ? ` (지인할인 적용, 추천: ${escapeHtml(f.friendName)})` : ""}이에요.</p>`
    : "";
  await Promise.all([
    notifySlack(notice),
    sendMail({ to: OWNER_EMAIL(), subject: `[${m.label}] ${f.name} · ${f.job || f.email}`, html: noticeToHtml(notice), replyTo: f.email }),
    sendMail({
      to: f.email,
      subject: `[Star of AI] ${m.mailTitle}`,
      html: `<div style="font-family:Pretendard,Apple SD Gothic Neo,sans-serif;color:#3D2A0C;line-height:1.75;padding:28px;background:#FFFDF5">
        <p style="font-size:12px;letter-spacing:.2em;color:#70631F;margin:0 0 12px">STAR OF AI · ${product.toUpperCase()}</p>
        <h2 style="color:#614215;margin:0 0 16px">${escapeHtml(f.name)}님, 신청 감사해요 ✨</h2>
        ${m.mailBody}${priceLine}
        <p style="margin-top:28px;font-size:13px;color:#8A6A3A">Star of AI · 이경서(Winter)</p></div>`,
    }),
    recordToSheet({
      kind: product,
      name: f.name,
      email: f.email,
      phone: f.phone,
      job: f.job,
      detail: f.topic,
      amount: p.payable ? amount : undefined,
      friend: f.friendName,
      extra:
        product === "study"
          ? `클로드 Pro ${f.pro} · 4회 참석 ${f.schedule}`
          : product === "oneday"
            ? `일정 참여·노트북 ${f.schedule}`
            : "",
    }),
  ]);
  return NextResponse.json({ ok: true });
}
