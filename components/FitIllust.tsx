/**
 * "이런 분께 딱 맞아요" 타깃별 일러스트 — 손그림 느낌의 라인 드로잉 + 사이트 노랑(butter) 포인트.
 * 갈색 패널 위에 올라가므로 선은 크림색, 포인트는 노랑으로 그려요. (참고: 블루 라인 일러스트 → 사이트 무드로 변환)
 */
const YEL = "#FFEB51";
const INK = "#FFF6D9";

const base = { fill: "none", stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Blob({ d }: { d: string }) {
  return <path d={d} fill={YEL} opacity={0.92} />;
}

/** 01 얼굴 노출이 부담스러운 예비 크리에이터 — 폰 뒤에 숨은 사람, 화면엔 AI로 합성된 웃는 얼굴 */
function Hide() {
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Blob d="M136 36c18-4 40 2 44 20 4 20-2 56-8 72-8 10-40 10-48 0-6-20-10-54-2-74 2-10 6-14 14-18z" />
      {/* 뒤에 숨은 사람 */}
      <path {...base} d="M60 150c0-26 8-44 28-54" />
      <path {...base} d="M84 74c-12-2-22 6-22 20 0 12 8 22 20 24" />
      <path {...base} d="M74 90c2-2 6-2 8 0" />
      <path {...base} d="M62 66c6-8 16-10 26-6" />
      <path {...base} d="M24 150c4-22 14-40 36-50" />
      {/* 폰 */}
      <rect x="112" y="30" width="60" height="104" rx="10" {...base} />
      <path {...base} d="M134 38h16" />
      {/* 화면 속 웃는 얼굴 */}
      <circle cx="142" cy="78" r="18" {...base} />
      <path {...base} d="M134 76c1-2 3-2 4 0M146 76c1-2 3-2 4 0" />
      <path {...base} d="M134 86c4 4 12 4 16 0" />
      <path {...base} d="M126 62c4-10 10-14 18-16" />
      {/* 반짝임 */}
      <path {...base} d="M188 44l6-8M196 60l10-2M186 24l2-10" />
      {/* 폰 든 손 */}
      <path {...base} d="M112 120c-10 2-18 10-22 20M172 116c8 2 12 10 14 18" />
      <path {...base} d="M30 158h180" strokeWidth={2.5} opacity={0.5} />
    </svg>
  );
}

/** 02 촬영·모델 비용이 아까운 소상공인·마케터 — 제품 한 병을 들어 보이는 사람, 뒤엔 AI가 만든 광고 컷 */
function Shop() {
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Blob d="M150 38c22-6 50 4 56 24 6 22-6 48-24 56-18 8-44 0-52-16-8-20 2-56 20-64z" />
      {/* 사람 */}
      <circle cx="78" cy="56" r="20" {...base} />
      <path {...base} d="M70 54c1-2 3-2 4 0M84 54c1-2 3-2 4 0" />
      <path {...base} d="M70 64c4 4 12 4 16 0" />
      <path {...base} d="M58 48c4-14 22-18 34-10" />
      <path {...base} d="M46 152c0-28 10-50 32-58 22 8 32 30 32 58" />
      {/* 제품 든 팔 */}
      <path {...base} d="M100 104c14-10 30-18 46-26" />
      {/* 제품 병 */}
      <path {...base} d="M148 58h18v10l6 8v40c0 4-3 6-6 6h-18c-3 0-6-2-6-6V76l6-8z" />
      <path {...base} d="M150 90h14" />
      <path {...base} d="M150 98h10" />
      {/* 광고 컷 프레임 */}
      <path {...base} d="M178 34h40v34M178 34v10" />
      <path {...base} d="M190 24l4-8M206 22l0-10" />
      <path {...base} d="M30 158h180" strokeWidth={2.5} opacity={0.5} />
    </svg>
  );
}

/** 03 스크립트부터 제작까지 손으로 하느라 지친 크리에이터 — 서류 더미 vs 한 줄로 흐르는 자동화 */
function Tired() {
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Blob d="M132 96c30-10 66-6 80 10 8 12 2 30-12 36-26 6-60 8-78-2-12-10-8-36 10-44z" />
      {/* 지친 사람: 턱 괴고 */}
      <circle cx="66" cy="52" r="20" {...base} />
      <path {...base} d="M58 50l6 2M74 50l6 2" />
      <path {...base} d="M60 62c4-2 10-2 14 0" />
      <path {...base} d="M46 46c2-14 18-22 34-14" />
      <path {...base} d="M30 150c2-30 12-54 36-62" />
      <path {...base} d="M100 150c-2-18-8-36-20-48" />
      <path {...base} d="M40 100c6-14 18-20 26-14" />
      {/* 서류 더미 */}
      <path {...base} d="M106 150v-30h30v30M110 128h22M110 136h18" />
      <path {...base} d="M112 118l4-8h24l4 8" />
      {/* 흐르는 자동화 */}
      <circle cx="152" cy="118" r="5" {...base} />
      <circle cx="178" cy="118" r="5" {...base} />
      <circle cx="204" cy="118" r="5" {...base} />
      <path {...base} d="M158 118h14M184 118h14" />
      <path {...base} d="M210 118l10 0l-4-4M220 118l-4 4" />
      {/* 시계 */}
      <circle cx="186" cy="52" r="20" {...base} />
      <path {...base} d="M186 40v12l8 6" />
      <path {...base} d="M30 158h180" strokeWidth={2.5} opacity={0.5} />
    </svg>
  );
}

/** 04 AI 툴은 써봤지만 '내 콘텐츠'로 이어지지 않았던 분 — 흩어진 툴 조각이 내 릴스 한 편으로 모여요 */
function Tools() {
  return (
    <svg viewBox="0 0 240 170" className="h-full w-full" aria-hidden>
      <Blob d="M150 30c12-6 32-4 40 8 8 14 4 60-2 86-4 10-30 12-40 2-8-26-14-74 2-96z" />
      {/* 흩어진 조각 */}
      <rect x="22" y="28" width="22" height="22" rx="5" {...base} />
      <circle cx="74" cy="34" r="11" {...base} />
      <path {...base} d="M30 88l12-20 12 20z" />
      <path {...base} d="M66 70l16 16M82 70l-16 16" />
      <path {...base} d="M46 118c0-8 14-8 14 0s-14 8-14 0" />
      {/* 모이는 화살 */}
      <path {...base} d="M98 60c14 6 22 20 26 36M98 100c12-4 24-2 32 4" strokeDasharray="6 6" />
      {/* 사람 */}
      <circle cx="112" cy="130" r="14" {...base} />
      <path {...base} d="M106 128c1-2 3-2 4 0M116 128c1-2 3-2 4 0" />
      <path {...base} d="M106 136c3 3 9 3 12 0" />
      <path {...base} d="M100 124c2-10 14-14 24-8" />
      <path {...base} d="M90 158c2-10 10-18 22-18s20 8 22 18" />
      {/* 릴스 폰 */}
      <rect x="150" y="34" width="46" height="84" rx="9" {...base} />
      <path {...base} d="M167 66l16 10-16 10z" fill={INK} />
      <path {...base} d="M158 126c8 2 20 2 30 0" />
      <path {...base} d="M204 28l6-8M210 48l10-2M200 14l2-10" />
      <path {...base} d="M30 158h180" strokeWidth={2.5} opacity={0.5} />
    </svg>
  );
}

const SET = [Hide, Shop, Tired, Tools];

export default function FitIllust({ i }: { i: number }) {
  const C = SET[i % SET.length];
  return <C />;
}
