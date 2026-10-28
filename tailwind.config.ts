import type { Config } from "tailwindcss";

// 명함 컬러를 그대로 옮긴 브랜드 토큰
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF5",
        paper: "#FFF9E3",
        butter: { DEFAULT: "#FFEB51", soft: "#FFEC8C", deep: "#FFE855", pale: "#FFF6C7" },
        brown: { DEFAULT: "#614215", dark: "#3D2A0C", light: "#8A6A3A" },
        olive: "#70631F",
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "var(--font-noto-serif)", "serif"],
        kserif: ["var(--font-noto-serif)", "serif"],
      },
      maxWidth: { site: "1200px" },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        twinkle: {
          "0%,100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(.82) rotate(45deg)", opacity: ".7" },
        },
        floaty: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
