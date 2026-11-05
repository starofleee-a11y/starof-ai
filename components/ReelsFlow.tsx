/**
 * 릴스 자동화 워크플로우 다이어그램 — 세로 9:16 프레임, CSS 애니메이션으로 노드가 차례로 켜지고 점이 흘러요.
 * 노션 스크립트 → AI 이미지 → AI 영상 → TTS·자막 → 릴스 업로드
 */
const NODES = [
  { t: "노션 스크립트", s: "후킹 서사 · 대본 자동 생성", i: "N" },
  { t: "AI 이미지", s: "인물 · 제품 컷 생성", i: "◐" },
  { t: "AI 영상", s: "컷을 영상으로 · 얼굴 합성", i: "▶" },
  { t: "TTS · 자막", s: "음성 · 자막 자동 입히기", i: "≋" },
  { t: "릴스 업로드", s: "썸네일 · 캡션까지 완성", i: "↑" },
];

export default function ReelsFlow({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-brown-dark p-4 text-butter-pale ${compact ? "" : "aspect-[9/16]"}`}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-butter/70">Reels Workflow · 자동</p>
      <ol className="relative my-2 flex flex-1 flex-col justify-between">
        {/* 세로 연결선과 흐르는 점 */}
        <span className="absolute bottom-5 left-[17px] top-5 w-px bg-butter/20" aria-hidden />
        <span className="flow-dot absolute left-[14px] top-5 h-[7px] w-[7px] rounded-full bg-butter shadow-[0_0_12px_rgba(255,235,81,.9)]" aria-hidden />
        {NODES.map((n, i) => (
          <li key={n.t} className="flow-node relative flex items-center gap-3" style={{ ["--i" as string]: i }}>
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-butter/40 bg-brown-dark font-serif text-[15px] font-semibold text-butter">{n.i}</span>
            <span className="min-w-0 rounded-xl border border-butter/15 bg-white/5 px-3 py-2">
              <span className="block text-[12.5px] font-bold leading-tight text-butter">{n.t}</span>
              <span className="block text-[10.5px] leading-snug text-butter-pale/70">{n.s}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="text-[10px] text-butter-pale/60">한 번 셋팅하면 다음 릴스부터 자동으로</p>
    </div>
  );
}
