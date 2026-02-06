import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { getLatestReviews } from "@/lib/reviews";

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => {
    const active = index < rating;
    return (
      <Star
        key={index}
        className={`w-4 h-4 ${active ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
      />
    );
  });
}

export default async function LatestReviewsSection({
  locale,
}: {
  locale: string;
}) {
  const [t, reviews] = await Promise.all([
    getTranslations({ locale, namespace: "reviews" }),
    getLatestReviews(3),
  ]);

  return (
    <section className="section bg-gradient-to-b from-white to-slate-50" aria-labelledby="latest-reviews-title">
      <div className="container">
        <div className="section-title">
          <h2 id="latest-reviews-title">{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="font-semibold" itemProp="author">
                  {review.author}
                </p>
                <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-4" itemProp="reviewBody">
                {review.text}
              </p>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{review.source}</span>
                <time dateTime={review.date}>{new Date(review.date).toLocaleDateString(locale)}</time>
              </div>
              {review.profileUrl && (
                <a
                  href={review.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-primary hover:underline"
                >
                  {t("view_source")}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
