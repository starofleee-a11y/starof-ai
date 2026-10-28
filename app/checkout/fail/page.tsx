import Link from "next/link";

export default async function FailPage({ searchParams }: { searchParams: Promise<{ message?: string; code?: string }> }) {
  const { message, code } = await searchParams;
  return (
    <section className="glow-bg flex min-h-screen items-center pb-24 pt-32">
      <div className="wrap max-w-[640px]">
        <div className="card p-10 text-center">
          <p className="text-[20px] font-bold text-brown-dark">결제가 취소되었거나 실패했어요</p>
          <p className="mt-3 text-[15px] text-brown/70">{message || "다시 시도해 주세요."}</p>
          {code && <p className="mt-1 text-[12px] text-brown/40">{code}</p>}
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/" className="btn-ghost">홈으로</Link>
            <Link href="/contact" className="btn-primary">문의하기</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
