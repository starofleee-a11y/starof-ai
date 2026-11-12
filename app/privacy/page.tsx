import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Star of AI가 수집하는 개인정보와 이용 목적, 보관 기간 안내.",
};

const UPDATED = "2026년 11월 12일";

const SECTIONS: { name: string; items: string[] }[] = [
  { name: "1. 수집하는 정보", items: [
    "무료 커피챗 신청: 이름, 이메일, 나누고 싶은 이야기, 자동화 고민(선택), 희망 일시",
    "강의·클래스 신청 및 결제: 이름, 이메일, 연락처, 직무, 신청 내용, 결제 정보(결제 승인 내역. 카드번호 등은 결제대행사가 처리하며 저희는 보관하지 않습니다)",
    "컨설팅·기업 문의, 자료 다운로드, 자동화 진단: 이름, 이메일, 연락처·회사명·규모(입력한 경우), 문의 내용",
  ] },
  { name: "2. 이용 목적", items: [
    "신청 접수 확인, 일정 안내, 미팅 링크와 리마인드 메일 발송",
    "강의·클래스 운영, 결제 처리 및 환불",
    "문의에 대한 회신과 상담",
    "소식·홍보 메일은 수신에 동의하신 분께만 보내며, 언제든 답장으로 수신거부할 수 있습니다.",
  ] },
  { name: "3. 보관 기간", items: [
    "신청·문의 정보는 목적을 달성한 뒤 1년 이내에 삭제합니다.",
    "결제·계약 관련 기록은 전자상거래법 등 관련 법령에 따라 5년간 보관합니다.",
    "삭제를 요청하시면 법령상 보관 의무가 있는 정보를 제외하고 바로 삭제합니다.",
  ] },
  { name: "4. 처리 위탁 및 이용 서비스", items: [
    "원활한 운영을 위해 다음 서비스를 이용하며, 이 과정에서 정보가 해당 서비스(국외 서버 포함)에 저장·처리될 수 있습니다.",
    "웹사이트 호스팅: Vercel · 일정 관리와 메일: Google(캘린더, Gmail, 스프레드시트) · 화상 미팅: Zoom · 업무 자동화: Zapier · 알림: Slack · 메일 발송: Resend · 결제: 토스페이먼츠",
    "위 목적 외에 개인정보를 제3자에게 판매하거나 제공하지 않습니다.",
  ] },
  { name: "5. Google 계정 정보의 이용", items: [
    "Star of AI 앱은 운영자 본인의 Google 캘린더에만 접근해, 커피챗 예약 가능 시간을 확인하고 예약 일정을 등록·취소합니다.",
    "방문자나 신청자의 Google 계정 데이터에는 접근하지 않으며, Google API로 받은 정보를 광고나 다른 목적에 사용하거나 제3자에게 넘기지 않습니다.",
  ] },
  { name: "6. 이용자의 권리와 문의", items: [
    "본인의 개인정보 열람, 정정, 삭제, 처리 정지를 언제든 요청할 수 있습니다.",
    `개인정보 보호책임자: 이경서 · ${SITE.email} · ${SITE.phone}. 요청은 1영업일 안에 회신드립니다.`,
    "방침이 바뀌면 이 페이지에 최종 수정일과 함께 공지합니다.",
  ] },
];

export default function PrivacyPage() {
  return (
    <div className="glow-bg">
      <section className="wrap pb-24 pt-36 md:pb-32 md:pt-44">
        <Reveal>
          <p className="eyebrow">Privacy Policy</p>
          <h1 className="h-display mt-4 text-[38px] md:text-[56px]">개인정보처리방침</h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-brown/90">Star of AI(상호 {SITE.company})는 신청·문의에 꼭 필요한 정보만 받고, 안내한 목적으로만 사용합니다.</p>
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
