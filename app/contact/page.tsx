import type { Metadata } from "next";
import GlowArea from "@/components/GlowArea";
import InquiryForm from "@/components/InquiryForm";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "직접 문의", description: "강의·자동화·AX 컨설팅 문의. 1영업일 안에 회신드립니다." };

export default function ContactPage() {
  return (
    <GlowArea>
      <section className="wrap grid gap-12 pb-24 pt-36 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:pb-32 md:pt-44">
        <Reveal>
          <p className="font-serif text-[18px] italic text-olive">Contact</p>
          <h1 className="h-display mt-4 text-[38px] md:text-[56px]">무엇이든<br />편하게 물어보세요</h1>
          <p className="mt-6 text-[16px] leading-relaxed text-brown/80">
            강의, 자동화 셋팅, 기업 AX 컨설팅 무엇이든 좋아요. 남겨주신 내용은 바로 대표에게 전달되고, 1영업일 안에 메일로 회신드립니다.
          </p>
          <div className="mt-10 space-y-3 text-[15px] text-brown/80">
            <p><span className="mr-3 text-brown/50">메일</span><a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p><span className="mr-3 text-brown/50">전화</span>{SITE.phone}</p>
            <p><span className="mr-3 text-brown/50">인스타</span><a className="underline underline-offset-4" href={SITE.instagram} target="_blank" rel="noreferrer">{SITE.instagramHandle}</a></p>
          </div>
          <div className="mt-10 rounded-3xl border border-brown/10 bg-white/70 p-6">
            <p className="font-semibold text-brown-dark">아직 뭘 물어볼지 모르겠다면?</p>
            <p className="mt-1 text-[14px] text-brown/70">30분 무료 커피챗에서 같이 정리해 드려요.</p>
            <Link href="/#coffee-chat" className="btn-yellow mt-4 !py-2.5 !text-[14px]">무료 커피챗 예약 ☕</Link>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <InquiryForm defaultType="기타 문의" />
        </Reveal>
      </section>
    </GlowArea>
  );
}
