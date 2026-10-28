import type { Metadata } from "next";
import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = { title: "결제 완료", robots: { index: false } };

export default function SuccessPage() {
  return (
    <section className="glow-bg flex min-h-screen items-center pb-24 pt-32">
      <div className="wrap max-w-[640px]">
        <Suspense>
          <SuccessClient />
        </Suspense>
      </div>
    </section>
  );
}
