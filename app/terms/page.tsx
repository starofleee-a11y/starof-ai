import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "서비스 이용약관",
  description: "Star of AI 웹사이트와 강의·클래스·컨설팅 서비스 이용약관.",
};

const UPDATED = "2026년 11월 12일";

const SECTIONS: { name: string; items: string[] }[] = [
  { name: "1. 서비스 내용", items: [
    "Star of AI는 AI 자동화 강의·클래스, 1:1 마케팅 자동화 컨설팅, 기업 대상 교육·컨설팅, 무료 커피챗 상담을 제공합니다.",
    "각 서비스의 일정, 가격, 구성은 해당 상품 페이지에 안내된 내용을 따릅니다.",
  ] },
  { name: "2. 신청과 결제", items: [
    "강의·클래스는 신청서 제출 후 안내에 따라 결제하면 신청이 확정됩니다.",
    "컨설팅·기업 서비스는 커피챗 또는 문의로 범위를 정한 뒤 별도 계약으로 진행합니다.",
    "신청 시 입력하는 정보는 정확해야 하며, 잘못된 정보로 생긴 불이익은 신청자에게 책임이 있습니다.",
  ] },
  { name: "3. 취소와 환불", items: [
    "결제 취소와 환불 기준은 환불 정책 페이지(/refund)를 따릅니다.",
    "무료 커피챗은 일정이 어려워지면 안내 메일에 답장으로 미리 알려주세요.",
  ] },
  { name: "4. 자료와 저작권", items: [
    "강의 교안, 영상, 템플릿 등 제공 자료의 저작권은 Star of AI에 있습니다.",
    "제공 자료는 수강생 본인의 학습과 업무에 사용할 수 있으며, 사전 동의 없이 복제·배포·재판매할 수 없습니다.",
  ] },
  { name: "5. 책임의 범위", items: [
    "강의와 컨설팅은 방법과 설계를 안내하는 서비스로, 특정 매출이나 성과를 보장하지 않습니다.",
    "수업에서 사용하는 외부 도구(유료 구독 포함)의 요금, 정책 변경, 장애는 해당 서비스 제공자의 책임 범위입니다.",
    "주최 측 사정으로 일정이 변경·취소되면 미리 안내드리고 환불 정책에 따라 처리합니다.",
  ] },
  { name: "6. 기타", items: [
    "개인정보는 개인정보처리방침(/privacy)에 따라 처리합니다.",
    "약관이 바뀌면 이 페이지에 최종 수정일과 함께 공지합니다.",
    `문의: ${SITE.email} · ${SITE.phone}`,
  ] },
];

export default function TermsPage() {
  return (
    <div className="glow-bg">
      <section className="wrap pb-24 pt-36 md:pb-32 md:pt-44">
        <Reveal>
          <p className="eyebrow">Terms of Service</p>
          <h1 className="h-display mt-4 text-[38px] md:text-[56px]">서비스 이용약관</h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-brown/90">Star of AI(상호 {SITE.company})가 운영하는 웹사이트와 강의·클래스·컨설팅 서비스를 이용할 때 적용되는 약관입니다.</p>
          <p className="mt-2 text-[13px] text-brown/60">최종 수정 {UPDATED}</p>
        </Reveal>

        <div className="mt-14 grid gap-5">
          {SECTIONS.map((r, i) => (
            <Reveal key={r.name} delay={Math.min(i, 4) * 60}>
              <section className="rounded-3xl border border-brown/15 bg-white p-6 md:p-8">
                <h2 className="text-[20px] font-bold text-brown-dark md:text-[22px]">{r.name}</h2>
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
