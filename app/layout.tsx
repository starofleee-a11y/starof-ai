import type { Metadata } from "next";
import { Manrope, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import { SITE } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});
const plexKr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-kr",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: { default: "Star of AI · AX 에이전시", template: "%s · Star of AI" },
  description:
    "AI 얼리어답터가 되는 지름길. 자동화 기초 강의, 1:1 AX 컨설팅, 기업 AX. 나의 업무가 자동으로 굴러가도록 시간과 돈이 벌리는 시스템을 설계합니다.",
  openGraph: {
    title: "Star of AI · AX 에이전시",
    description: "AI 얼리어답터가 되는 지름길. 자동화 기초 강의 · 1:1 AX 컨설팅 · 기업 AX",
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
    <html lang="ko" className={`${manrope.variable} ${plexKr.variable}`}>
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
