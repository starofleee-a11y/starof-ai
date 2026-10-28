import type { Config } from "tailwindcss";

// 명함 컬러를 그대로 옮긴 브랜드 토큰
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF5",
        paper: "#FFF9E3",
        butter: { DEFAULT: "#FFEB51", soft: "#FFEC8C", deep: "#FFE855", pale: "#FFF6C7" },
        brown: { DEFAULT: "#614215", dark: "#3D2A0C", light: "#8A6A3A" },
        olive: "#70631F",
        // Starters(노랑) · Workers(올리브) · Company(브라운) 구분용 연한 바탕
        sage: { DEFAULT: "#70631F", pale: "#EEF0DA", soft: "#DDE3B8" },
        clay: { DEFAULT: "#8A5A1E", pale: "#F4E8D6", soft: "#E8D2B0" },
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "var(--font-noto-serif)", "serif"],
        kserif: ["var(--font-noto-serif)", "serif"],
      },
      maxWidth: { site: "1200px" },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
