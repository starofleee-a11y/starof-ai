import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const notoSerif = Noto_Serif_KR({
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: "Star of AI · AI 자동화 전문 컨설팅", template: "%s · Star of AI" },
  description:
    "클로드 코드 스터디 과외, 개인 자동화 워크플로우 셋팅 대행, 기업 AX 강의·컨설팅. 누적 260명 이상이 들은 AI 자동화 강의, Star of AI.",
  openGraph: {
    title: "Star of AI · AI 자동화 전문 컨설팅",
    description: "반복 업무는 AI에게, 당신은 더 중요한 일에. 클로드 코드 스터디 · 자동화 셋팅 대행 · 기업 AX",
    url: SITE.domain,
    siteName: "Star of AI",
    locale: "ko_KR",
    type: "website",
    images: ["/images/og.jpg"],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${notoSerif.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
