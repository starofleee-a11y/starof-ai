/** 후기 문장에서 **이 부분** 처럼 표시한 곳을 굵게(hl이면 노랑 하이라이트까지) 보여줘요 */
export default function Quote({ text, hl = false, className = "" }: { text: string; hl?: boolean; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") ? (
          <b key={i} className={`font-bold text-brown-dark ${hl ? "rounded-[3px] bg-butter/70 box-decoration-clone px-0.5" : ""} ${className}`}>{p.slice(2, -2)}</b>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
