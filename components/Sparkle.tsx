/** 명함 뒷면의 네 갈래 반짝임 */
export default function Sparkle({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 0C21.2 10.2 24.6 15.8 40 20C24.6 24.2 21.2 29.8 20 40C18.8 29.8 15.4 24.2 0 20C15.4 15.8 18.8 10.2 20 0Z"
        fill={color}
      />
    </svg>
  );
}
