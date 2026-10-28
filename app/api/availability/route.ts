import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getAvailability();
  return NextResponse.json(data, { headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=300" } });
}
