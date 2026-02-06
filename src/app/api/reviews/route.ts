import { NextResponse } from "next/server";
import { getLatestReviews } from "@/lib/reviews";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = Number(url.searchParams.get("limit") ?? "3");
  const limit = Number.isFinite(limitParam)
    ? Math.max(1, Math.min(6, Math.floor(limitParam)))
    : 3;

  const reviews = await getLatestReviews(limit);

  return NextResponse.json(
    {
      source: process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID
        ? "google_places"
        : "fallback",
      reviews,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
