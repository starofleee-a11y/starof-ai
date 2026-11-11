import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
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
  title: { default: "Star of AI · 마케팅 자동화 에이전시", template: "%s · Star of AI" },
  description:
    "콘텐츠 제작 99% 자동화하는 법을 알려드립니다. 마케팅 담당자 혹은 1인 사업가를 위한 최적의 마케팅 자동화 프로세스 구축. 1:1 마케팅 자동화 컨설팅, 자동화 기초 강의, 기업 AX.",
  openGraph: {
    title: "Star of AI · 마케팅 자동화 에이전시",
    description: "콘텐츠 제작 99% 자동화하는 법을 알려드립니다. 1:1 마케팅 자동화 컨설팅 · 자동화 기초 강의 · 기업 AX",
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
        <ScrollTop />
      </body>
    </html>
  );
}
