import type { ReactNode } from "react";

/** 스크롤해서 화면에 들어오면 노란 형광펜이 칠해지는 키워드 (.reveal.in / .in 안에서 작동) */
export default function Hl({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <mark className="hl" style={{ ["--hd" as string]: `${delay}ms` }}>
      {children}
    </mark>
  );
}
