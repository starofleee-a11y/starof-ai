import Link from "next/link";
import type { ProductId } from "@/lib/products";

export default function CheckoutButton({ product, qty = 1, className = "", children }: { product: ProductId; qty?: number; className?: string; children: React.ReactNode }) {
  return (
    <Link href={`/checkout?product=${product}&qty=${qty}`} className={className || "btn-primary"}>
      {children}
    </Link>
  );
}
