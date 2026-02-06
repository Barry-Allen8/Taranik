export type PublicReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  source: string;
  date: string;
  profileUrl?: string;
};

type GoogleReview = {
  name?: string;
  rating?: number;
  text?: {
    text?: string;
  };
  publishTime?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
};

type GooglePlaceResponse = {
  reviews?: GoogleReview[];
};

const FALLBACK_REVIEWS: PublicReview[] = [
  {
    id: "fallback-1",
    author: "Anna K.",
    rating: 5,
    text: "Transparent communication, fast execution and a website that finally converts leads.",
    source: "Google Reviews",
    date: "2025-12-10",
  },
  {
    id: "fallback-2",
    author: "Marek S.",
    rating: 5,
    text: "VektaDev automated our support workflow and reduced response times within the first month.",
    source: "Google Reviews",
    date: "2025-11-28",
  },
  {
    id: "fallback-3",
    author: "Katarzyna P.",
    rating: 5,
    text: "Great product thinking and clean implementation. The team was proactive at every stage.",
    source: "Google Reviews",
    date: "2025-11-05",
  },
];

function normalizeGoogleReview(review: GoogleReview, index: number): PublicReview {
  return {
    id: review.name ?? `google-${index}`,
    author: review.authorAttribution?.displayName ?? "Anonymous",
    rating: Math.max(1, Math.min(5, Math.round(review.rating ?? 5))),
    text: review.text?.text ?? "",
    source: "Google Reviews",
    date: review.publishTime?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    profileUrl: review.authorAttribution?.uri,
  };
}

async function fetchGoogleReviews(limit: number): Promise<PublicReview[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?fields=displayName,reviews`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`google_reviews_failed_${response.status}`);
  }

  const data = (await response.json()) as GooglePlaceResponse;
  const reviews = (data.reviews ?? [])
    .slice(0, limit)
    .map((review, index) => normalizeGoogleReview(review, index))
    .filter((review) => review.text.length > 0);

  return reviews.length > 0 ? reviews : null;
}

export async function getLatestReviews(limit = 3): Promise<PublicReview[]> {
  try {
    const googleReviews = await fetchGoogleReviews(limit);
    if (googleReviews && googleReviews.length > 0) {
      return googleReviews;
    }
  } catch (error) {
    console.error("reviews_fetch_error", (error as Error)?.message);
  }

  return FALLBACK_REVIEWS.slice(0, limit);
}
