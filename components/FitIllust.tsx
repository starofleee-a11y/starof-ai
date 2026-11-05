/**
 * "이런 분께 딱 맞아요" 타깃별 일러스트 — 굵은 검정 라인 + 포인트 컬러 한 가지(참고 일러스트의 블루 → 사이트 노랑).
 * 갈색 패널 위에 크림색 카드로 올라가요. 머리카락은 검정 면, 얼굴·옷은 크림, 포인트는 노랑.
 */
const Y = "#FFEB51"; // 포인트 (참고 이미지의 블루 자리)
const K = "#2E1F08"; // 라인 (브라운 다크 — 검정 역할)
const C = "#FFFCEF"; // 살결·옷 (크림)
const G = "#D8D0BE"; // 회색 보조선

const L = { fill: "none", stroke: K, strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** 01 — 거울 속 다른 얼굴을 보는 사람 (체크 셔츠) : 내 얼굴 대신 AI 합성 얼굴로 등장 */
function Mirror() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="fi-shirt1"><path d="M52 300C52 228 80 190 118 176L134 196 152 172C194 184 220 220 224 300Z" /></clipPath>
      </defs>
      {/* 거울 프레임 */}
      <path d="M212 44h76v172" fill="none" stroke={Y} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M212 44v44" fill="none" stroke={Y} strokeWidth={5} strokeLinecap="round" />
      <path d="M232 200h30" fill="none" stroke={Y} strokeWidth={5} strokeLinecap="round" />
      <circle cx="268" cy="164" r="4" fill="none" stroke={K} strokeWidth={3} />
      {/* 거울 속 얼굴 (AI로 바뀐 얼굴) */}
      <path {...L} d="M224 108c-4-28 10-50 36-50 24 0 36 22 32 50-3 22-18 38-36 38s-29-16-32-38z" />
      <path {...L} d="M226 92c6-22 22-32 42-30 10 1 18 6 22 14" />
      <path {...L} d="M250 100c2-3 6-3 8 0" />
      <path {...L} d="M262 108c4 3 4 9 0 13" />
      <path {...L} d="M248 128c6 4 14 4 20-1" />
      {/* 속도선 */}
      <path d="M60 92l34-12M50 116l38-8" fill="none" stroke={Y} strokeWidth={4} strokeLinecap="round" />
      {/* 셔츠 (체크) */}
      <path d="M52 300C52 228 80 190 118 176L134 196 152 172C194 184 220 220 224 300Z" fill={Y} />
      <g clipPath="url(#fi-shirt1)" stroke={C} strokeWidth={4}>
        <path d="M84 170v140M118 170v140M152 170v140M186 170v140" />
        <path d="M40 206h200M40 240h200M40 274h200" />
      </g>
      <path {...L} d="M52 300C52 228 80 190 118 176L134 196 152 172C194 184 220 220 224 300" />
      <path {...L} d="M118 176l-10 20 26 0M152 172l12 18-28 6" />
      <circle cx="135" cy="222" r="3" fill={K} /><circle cx="135" cy="252" r="3" fill={K} />
      <path {...L} d="M68 232c10-8 22-8 30 0" />
      {/* 목 */}
      <path {...L} d="M122 150l-4 28M150 148l2 26" />
      {/* 얼굴 */}
      <path d="M100 76c2-30 24-46 50-42 26 4 36 28 34 56-2 30-18 52-40 52-24 0-46-24-44-66z" fill={C} />
      <path {...L} d="M100 76c2-30 24-46 50-42 26 4 36 28 34 56-2 30-18 52-40 52-24 0-46-24-44-66z" />
      {/* 머리 (검정 면) */}
      <path d="M96 100c-8-40 12-70 50-72 24-1 40 12 44 30-10-8-22-10-34-6-14 4-22 2-30 10-10 10-14 24-16 42-6-2-10-4-14-4z" fill={K} />
      <path {...L} d="M70 80l14 6M72 60l10 8" />
      {/* 이목구비 — 오른쪽을 봄 */}
      <path {...L} d="M158 92c2-3 6-3 8 0" />
      <path {...L} d="M172 104c6 4 6 12 0 16" />
      <path {...L} d="M158 134c6 3 12 2 16-2" />
      <path {...L} d="M104 108c-6-2-10 2-9 8 1 5 5 8 10 7" />
    </svg>
  );
}

/** 02 — 안경 쓰고 종이와 펜을 든 사람 : 제품·홍보 기획을 직접 챙기는 소상공인·마케터 */
function Planner() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
      {/* 글줄 */}
      <path d="M226 92h52M226 112h52M226 132h36" fill="none" stroke={G} strokeWidth={4} strokeLinecap="round" />
      {/* 셔츠 */}
      <path d="M40 300c4-76 44-116 92-124l24 10 26-10c48 8 84 50 88 124z" fill={Y} />
      <path {...L} d="M40 300c4-76 44-116 92-124l24 10 26-10c48 8 84 50 88 124" />
      <path {...L} d="M132 176l16 24 8-14 8 14 18-24" />
      {/* 종이 */}
      <path d="M62 206l96-14 16 108H78z" fill={C} />
      <path {...L} d="M62 206l96-14 16 108" />
      <path {...L} d="M86 236l50-6M90 256l40-5" />
      {/* 왼손 — 종이 모서리 */}
      <path d="M44 236c-8 10-6 26 4 34 10 8 26 6 32-2l6-26-8-14z" fill={C} />
      <path {...L} d="M44 236c-8 10-6 26 4 34 10 8 26 6 32-2M46 246l20-4M48 262l20-2" />
      {/* 오른손 + 펜 */}
      <path d="M196 212c14-6 30 2 34 16 4 16-6 30-20 32-14 2-28-8-28-24 0-10 6-20 14-24z" fill={C} />
      <path {...L} d="M196 212c14-6 30 2 34 16 4 16-6 30-20 32-14 2-28-8-28-24M190 236l22-2M192 250l20 0" />
      <path d="M216 206l20 46" fill="none" stroke={K} strokeWidth={8} strokeLinecap="round" />
      <path d="M236 252l6 14" fill="none" stroke={K} strokeWidth={4} strokeLinecap="round" />
      {/* 목 */}
      <path {...L} d="M134 150l-2 26M166 150l2 26" />
      {/* 얼굴 */}
      <path d="M106 86c0-30 20-48 46-48s46 18 46 48c0 36-18 68-46 68s-46-32-46-68z" fill={C} />
      <path {...L} d="M106 86c0-30 20-48 46-48s46 18 46 48c0 36-18 68-46 68s-46-32-46-68z" />
      {/* 회색 머리 */}
      <path d="M104 92c-4-36 16-58 48-58 30 0 50 20 48 50-8-10-18-14-30-12-10 2-18 8-28 6-10-2-18-4-26 2-6 4-10 8-12 12z" fill={G} />
      <path {...L} d="M104 92c-4-36 16-58 48-58 30 0 50 20 48 50" />
      <path {...L} d="M196 46l10-10" />
      {/* 안경 (노랑) */}
      <g fill="none" stroke={Y} strokeWidth={5} strokeLinecap="round">
        <circle cx="130" cy="96" r="15" /><circle cx="170" cy="96" r="15" /><path d="M145 96h10M115 94l-10-4M185 94l12-4" />
      </g>
      <path {...L} d="M127 96c2-2 5-2 7 0M167 96c2-2 5-2 7 0" />
      <path {...L} d="M150 104c4 4 4 10 0 14" />
      <path {...L} d="M138 132c8 6 18 6 26 0" />
    </svg>
  );
}

/** 03 — 두 손 모으고 눈 감은 긴 머리 사람 (줄무늬 옷, 반짝임) : 손으로 다 하느라 지친, '좀 편해졌으면' */
function Wish() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="fi-top3"><path d="M118 300c0-62 24-100 60-112 36 10 68 46 72 112z" /></clipPath>
      </defs>
      {/* 반짝임 */}
      <path {...L} d="M56 104h20M66 94v20M236 60h18M245 51v18" strokeWidth={3} />
      <circle cx="64" cy="68" r="4" fill={K} /><circle cx="258" cy="118" r="4" fill={K} /><circle cx="236" cy="156" r="3" fill={K} />
      {/* 뒷머리 — 긴 검정 머리 */}
      <path d="M84 300c-8-80-8-170 18-220 22-42 92-44 108 0 14 38 8 90-14 130l-12-10c10-30 12-60 2-86-10-26-52-28-68-2-18 32-10 100-6 188z" fill={K} />
      {/* 옷 (크림 + 노랑 줄무늬) */}
      <path d="M118 300c0-62 24-100 60-112 36 10 68 46 72 112z" fill={C} />
      <g clipPath="url(#fi-top3)">
        <path d="M100 214h170v14H100zM100 246h170v14H100zM100 278h170v14H100z" fill={Y} />
      </g>
      <path {...L} d="M118 300c0-62 24-100 60-112 36 10 68 46 72 112" />
      {/* 목걸이 */}
      <path {...L} d="M166 190c6 10 18 10 24 0" strokeWidth={3} /><circle cx="178" cy="200" r="4" fill={C} stroke={K} strokeWidth={3} />
      {/* 두 손 (기도 모양) */}
      <path d="M140 270c-6-40 8-74 24-92 16 18 30 52 24 92-14 10-34 10-48 0z" fill={C} />
      <path {...L} d="M140 270c-6-40 8-74 24-92 16 18 30 52 24 92M156 206l-4 56M172 206l4 56" />
      {/* 얼굴 */}
      <path d="M116 100c0-34 20-54 48-54s48 20 48 54c0 34-20 62-48 62s-48-28-48-62z" fill={C} />
      <path {...L} d="M116 100c0-34 20-54 48-54s48 20 48 54c0 34-20 62-48 62s-48-28-48-62z" />
      {/* 앞머리 */}
      <path d="M114 96c-2-36 22-58 50-58s52 20 50 56c-10-14-24-18-40-14-10 2-16 8-26 6-12-2-24 0-34 10z" fill={K} />
      {/* 감은 눈 · 코 · 미소 */}
      <path {...L} d="M140 108c4-5 10-5 14 0M172 108c4-5 10-5 14 0" />
      <path {...L} d="M164 112c4 4 4 10 0 14" />
      <path {...L} d="M150 140c8 6 20 6 28 0" />
    </svg>
  );
}

/** 04 — 고개 들어 위를 보는 옆모습, 곱슬 노랑 머리, 날개 낙서 : AI 툴은 써봤지만 내 콘텐츠로는 아직 */
function Dream() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" aria-hidden>
      {/* 날개 낙서 + 지그재그 */}
      <path {...L} d="M206 176c8-32 32-54 50-44 16 10 6 40-18 48M214 196c18-2 40 4 48 20 6 14-8 26-24 22" strokeWidth={3} />
      <path d="M200 262l12 16 12-16 12 16 12-16 12 16 12-16" fill="none" stroke={Y} strokeWidth={4} strokeLinejoin="round" />
      {/* 반짝 별 */}
      <path d="M70 44l6 12 12 6-12 6-6 12-6-12-12-6 12-6z" fill="none" stroke={K} strokeWidth={3} strokeLinejoin="round" />
      {/* 곱슬 머리 (노랑) */}
      <g fill={Y} stroke={K} strokeWidth={4}>
        <circle cx="166" cy="64" r="26" /><circle cx="196" cy="92" r="28" /><circle cx="192" cy="134" r="26" /><circle cx="170" cy="164" r="22" /><circle cx="200" cy="172" r="18" />
      </g>
      {/* 몸 (검정 상의) */}
      <path d="M56 300c8-70 40-112 76-124l16-2c32 12 56 56 60 126z" fill={K} />
      <path d="M126 184c-12 40-12 80-8 116" fill="none" stroke={C} strokeWidth={3} strokeLinecap="round" />
      {/* 목 */}
      <path d="M126 150l-2 30 26-6-4-30z" fill={C} />
      <path {...L} d="M126 150l-2 30M148 146l2 28" />
      {/* 얼굴 옆모습 — 왼쪽 위를 봄 */}
      <path d="M150 56c-24-4-46 10-52 36-2 10 2 18-4 26 6 2 8 8 6 14-2 6 0 12 6 16 8 6 20 6 32 2l16-6-2-82z" fill={C} />
      <path {...L} d="M150 56c-24-4-46 10-52 36-2 10 2 18-4 26 6 2 8 8 6 14-2 6 0 12 6 16 8 6 20 6 32 2" />
      <path {...L} d="M110 98c4-4 10-4 14-2" />
      <path {...L} d="M104 90c6-6 14-8 22-6" strokeWidth={3} />
      <path {...L} d="M100 136c4 3 10 3 14 0" />
      {/* 앞머리 라인 + 머리핀 */}
      <path d="M150 56c-14-2-30 4-40 16 10-2 18 0 24 6 6-8 12-12 16-22z" fill={Y} stroke={K} strokeWidth={4} strokeLinejoin="round" />
      <path {...L} d="M150 92l18-4" strokeWidth={3} />
      <path {...L} d="M160 110c6 2 10 8 8 14" strokeWidth={3} />
    </svg>
  );
}

const SET = [Mirror, Planner, Wish, Dream];

export default function FitIllust({ i }: { i: number }) {
  const Pic = SET[i % SET.length];
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-cream">
      <Pic />
    </div>
  );
}
