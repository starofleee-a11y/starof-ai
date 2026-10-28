"use client";
import { useRef, type ReactNode } from "react";

/** 마우스를 따라 노란 빛이 움직이는 영역 (명함 앞면 그라디언트) */
export default function GlowArea({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--gx", `${50 + (x - 50) * 0.6}%`);
      el.style.setProperty("--gy", `${30 + (y - 50) * 0.5}%`);
    });
  };
  return (
    <div ref={ref} onPointerMove={onMove} className={`glow-bg grain relative ${className}`}>
      {children}
    </div>
  );
}
