import type { Metadata } from "next";
import DiagnosisResult from "@/components/DiagnosisResult";

export const metadata: Metadata = { title: "자동화 진단 결과", robots: { index: false } };

export default function DiagnosisPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow-bg absolute inset-0" style={{ ["--gx" as string]: "80%", ["--gy" as string]: "10%" }} />
      <div className="wrap relative py-28 md:py-36">
        <DiagnosisResult />
      </div>
    </section>
  );
}
