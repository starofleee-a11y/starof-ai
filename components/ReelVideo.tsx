"use client";
import { useEffect, useRef } from "react";

/** 소리 없이 자동 재생되는 세로 릴스 클립. (muted는 서버 렌더에 안 실리므로 ref로 다시 지정) */
export default function ReelVideo({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    // 화면에 보일 때만 재생해서 데이터를 아껴요
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline autoPlay preload="metadata" className={`h-full w-full object-cover ${className}`} />;
}
