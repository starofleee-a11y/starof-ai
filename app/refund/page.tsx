import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { PRODUCTS, STUDY_REFUND, won } from "@/lib/products";

export const metadata: Metadata = {
  title: "환불 정책",
  description: "Star of AI 강의·클래스·컨설팅의 결제 취소 및 환불 정책.",
};

const UPDATED = "2026년 11월 5일";

/** 상품별 환불 규정 — 결제 전에 꼭 읽어볼 수 있도록 한 페이지에 모았어요. 푸터에서만 링크해요. */
const RULES = [
  {
    name: PRODUCTS.study.name,
    sub: `${won(PRODUCTS.study.price)} · ${PRODUCTS.study.unit}`,
    items: [
      "신청서 제출 후 선정 안내를 받은 뒤 결제합니다. 선정 안내 및 결제(입금) 이후에는 환불이 불가합니다.",
      `4회 전부 참석하시면 마지막 회차 당일 ${won(STUDY_REFUND)}을 계좌이체로 환급해 드립니다. 한 번이라도 결석하면 환급 대상에서 제외됩니다.`,
      "지인할인으로 결제한 경우에도 같은 규정이 적용됩니다.",
      `수강 가능 시점: ${PRODUCTS.study.access}.`,
    ],
  },
  {
    name: PRODUCTS.oneday.name,
    sub: `${won(PRODUCTS.oneday.price)} · ${PRODUCTS.oneday.unit}`,
    items: [
      "수업 신청 후 결제하시면 환불이 불가합니다. 일정을 꼭 확인하고 신청해 주세요.",
      "사전에 안내드린 툴 설치·구독을 마치지 않아 실습에 참여하지 못한 경우에도 환불 사유가 되지 않습니다.",
      `수강 가능 시점: ${PRODUCTS.oneday.access}.`,
    ],
  },
  {
    name: `${PRODUCTS.consulting.name} · ${PRODUCTS.enterprise.name}`,
    sub: "워크플로우·프로젝트 단위 계약",
    items: [
      "컨설팅·기업 상품은 홈페이지 결제창(PG)을 통한 결제가 발생하지 않습니다. 홈페이지에서 결제할 수 있는 상품은 강의(자동화 기초 강의, AI 콘텐츠 제작 원데이)뿐입니다.",
      "무료 커피챗으로 범위를 확정한 뒤 계약·정산이 진행되며, 환불 조건은 계약 시 서면으로 안내드리는 내용을 따릅니다.",
      "착수(첫 세션 또는 설계 전달) 전에는 전액 환불, 착수 이후에는 진행된 범위를 제외한 금액을 환불합니다.",
    ],
  },
];

const COMMON = [
  "주최 측 사정으로 수업이 취소되거나 일정이 변경되어 참석이 어려운 경우에는 결제 수단으로 전액 환불해 드립니다.",
  "환불은 결제한 수단(카드 결제 취소 또는 계좌이체)으로 처리되며, 카드 결제 취소는 카드사 사정에 따라 영업일 기준 3~7일이 걸릴 수 있습니다.",
  `환불 및 결제 관련 문의는 ${SITE.email} 또는 ${SITE.phone}로 보내주세요. 1영업일 안에 회신드립니다.`,
];

export default function RefundPage() {
  return (
    <div className="glow-bg">
      <section className="wrap pb-24 pt-36 md:pb-32 md:pt-44">
        <Reveal>
          <p className="eyebrow">Refund Policy</p>
          <h1 className="h-display mt-4 text-[38px] md:text-[56px]">환불 정책</h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-brown/90">
            Star of AI(상호 {SITE.company})가 운영하는 강의·클래스·컨설팅의 결제 취소와 환불 기준입니다. 결제 전에 꼭 확인해 주세요.
          </p>
          <p className="mt-2 text-[13px] text-brown/60">최종 수정 {UPDATED}</p>
        </Reveal>

        <div className="mt-14 grid gap-5">
          {RULES.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <section className="rounded-3xl border border-brown/15 bg-white p-6 md:p-8">
                <h2 className="text-[20px] font-bold text-brown-dark md:text-[22px]">{r.name}</h2>
                <p className="mt-1 text-[13.5px] text-brown/65">{r.sub}</p>
                <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-brown/90">
                  {r.items.map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brown" />
                      <span className="break-keep">{t}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
          <Reveal delay={240}>
            <section className="rounded-3xl bg-brown-dark p-6 text-butter-pale md:p-8">
              <h2 className="text-[20px] font-bold text-butter md:text-[22px]">공통 사항</h2>
              <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-butter-pale/90">
                {COMMON.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-butter" />
                    <span className="break-keep">{t}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-10 text-[14px] text-brown/70">
            사업자 정보 · 상호 {SITE.company} · 대표 이경서 · {SITE.address} · {SITE.email} · <Link href="/contact" className="underline underline-offset-4">직접 문의</Link>
          </p>
        </Reveal>
      </section>
    </div>
  );
}
