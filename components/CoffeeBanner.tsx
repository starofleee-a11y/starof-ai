import Link from "next/link";
import Reveal from "./Reveal";

/** 결제 없이 바로 무료 커피챗으로 이어지는 배너 */
export default function CoffeeBanner({ title, desc }: { title?: React.ReactNode; desc?: string }) {
  return (
    <Reveal>
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-brown p-8 text-butter-pale md:flex-row md:items-center md:p-10">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-butter/80">Free coffee chat</p>
          <p className="mt-3 font-kserif text-[24px] font-bold leading-tight text-butter md:text-[30px]">{title ?? "먼저 30분, 무료로 이야기해요"}</p>
          <p className="mt-2 max-w-xl text-[15px] text-butter-pale/85">{desc ?? "결제 전에 자동화 가능한 범위와 기대 효과를 같이 봅니다. 맞지 않으면 그 자리에서 솔직하게 말씀드려요."}</p>
        </div>
        <Link href="/#coffee-chat" className="btn-yellow shrink-0 !px-7 !py-4">
          무료 커피챗 예약
        </Link>
      </div>
    </Reveal>
  );
}
