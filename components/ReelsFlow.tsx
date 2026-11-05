/**
 * 릴스 자동화 워크플로우 다이어그램 — 가로 한 줄. 노드가 차례로 노랗게 켜지고 점이 왼쪽에서 오른쪽으로 흘러요.
 * 노션 스크립트 → AI 이미지 → AI 영상 → TTS·자막 → 릴스 업로드
 * 갈색 카드 안에 들어가므로 바탕은 크림, 노드는 흰색, 포인트는 노랑으로 대비를 줘요. 모바일은 옆으로 스크롤.
 */
const NODES = [
  { t: "노션 스크립트", s: "후킹 서사 · 대본 자동 생성", i: "N" },
  { t: "AI 이미지", s: "인물 · 제품 컷 생성", i: "◐" },
  { t: "AI 영상", s: "컷을 영상으로 · 얼굴 합성", i: "▶" },
  { t: "TTS · 자막", s: "음성 · 자막 자동 입히기", i: "≋" },
  { t: "릴스 업로드", s: "썸네일 · 캡션까지 완성", i: "↑" },
];

export default function ReelsFlow() {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-butter/30 bg-butter-pale text-brown-dark">
      <div className="flex items-center justify-between px-4 pt-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brown">Reels Workflow · 자동</p>
        <p className="text-[10px] font-semibold text-brown/60"><span className="md:hidden">옆으로 밀어 보세요 →</span><span className="hidden md:inline">한 번 셋팅하면 다음 릴스부터 자동</span></p>
      </div>
      <div className="no-scrollbar w-full max-w-full overflow-x-auto">
        <ol className="relative flex min-w-[520px] items-stretch gap-1.5 px-3 pb-4 pt-3 md:min-w-0">
          {/* 가로 연결선과 흐르는 점 */}
          <span className="absolute left-7 right-7 top-[38px] h-[2px] bg-brown/20" aria-hidden />
          <span className="flow-dot-x absolute left-7 top-[34px] h-[10px] w-[10px] rounded-full bg-brown-dark shadow-[0_0_0_4px_rgba(255,235,81,.9)]" aria-hidden />
          {NODES.map((n, i) => (
            <li key={n.t} className="relative flex min-w-0 flex-1 flex-col items-center text-center" style={{ ["--i" as string]: i }}>
              <span className="flow-icon relative z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-brown-dark bg-white font-serif text-[15px] font-bold text-brown-dark">{n.i}</span>
              <span className="flow-node mt-2 w-full rounded-xl border border-brown/15 bg-white px-1.5 py-2 shadow-[0_6px_16px_-12px_rgba(46,31,8,.5)]">
                <span className="block text-[12px] font-extrabold leading-tight text-brown-dark">{n.t}</span>
                <span className="mt-0.5 block text-[10px] leading-snug text-brown/75">{n.s}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
