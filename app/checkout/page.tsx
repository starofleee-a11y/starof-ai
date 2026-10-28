import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = { title: "결제하기", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="glow-bg min-h-screen pb-24 pt-32 md:pt-40">
      <div className="wrap max-w-[1000px]">
        <Suspense>
          <CheckoutClient />
        </Suspense>
      </div>
    </section>
  );
}
