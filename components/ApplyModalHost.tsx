"use client";
import { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";
import ApplyForm from "./ApplyForm";
import InquiryForm from "./InquiryForm";
import CoffeeChat, { CONSULTING_TOPIC } from "./CoffeeChat";
import { APPLY_OPEN, APPLY_STATE, type ApplyKind } from "@/lib/apply";

const LABEL: Record<ApplyKind, string> = {
  study: "자동화 기초 클래스 신청",
  oneday: "AI 콘텐츠 제작 원데이 신청",
  consulting: "1:1 마케팅 자동화 컨설팅 신청",
  enterprise: "기업 AX 문의",
};

/**
 * 페이지마다 하나씩 두는 신청 팝업. openApply() 이벤트나 주소의 ?apply=1 로 열려요.
 * 예) /study?apply=1 → 스터디 신청 팝업이 바로 열린 상태로 시작
 */
export default function ApplyModalHost({ kind }: { kind: ApplyKind }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const want = (e as CustomEvent<ApplyKind | undefined>).detail;
      if (!want || want === kind) setOpen(true);
    };
    window.addEventListener(APPLY_OPEN, onOpen);
    if (new URLSearchParams(window.location.search).get("apply")) setOpen(true);
    return () => window.removeEventListener(APPLY_OPEN, onOpen);
  }, [kind]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(APPLY_STATE, { detail: open }));
  }, [open]);

  return (
    <Modal open={open} onClose={close} label={LABEL[kind]}>
      {kind === "enterprise" ? (
        <>
          <p className="eyebrow">Contact</p>
          <p className="mt-2 text-[22px] font-bold text-brown-dark">기업 강의 · 컨설팅 문의</p>
          <p className="mb-5 mt-1 text-[14px] text-brown/75">남겨주신 내용은 바로 대표 메일과 슬랙으로 전달돼요. 1영업일 안에 맞춤 제안서로 회신드립니다.</p>
          <InquiryForm defaultType="기업 AI 원데이 강의" compact bare />
        </>
      ) : kind === "consulting" ? (
        <>
          {/* 컨설팅 신청도 커피챗과 같은 예약 폼으로 받아요 (주제만 컨설팅으로 미리 선택) */}
          <p className="eyebrow">Free Coffee Chat</p>
          <p className="mt-2 text-[22px] font-bold text-brown-dark">1:1 마케팅 자동화 컨설팅 신청</p>
          <p className="mb-5 mt-1 text-[14px] text-brown/75">먼저 30분 무료 커피챗으로 범위를 같이 정해요. 편한 시간을 골라주세요.</p>
          {open && <CoffeeChat defaultTopic={CONSULTING_TOPIC} bare />}
        </>
      ) : (
        <ApplyForm product={kind} bare />
      )}
    </Modal>
  );
}
