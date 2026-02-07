import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { getLatestReviews } from "@/lib/reviews";

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => {
    const active = index < rating;
    return (
      <Star
        key={index}
        className={`h-4 w-4 ${active ? "fill-amber-400 text-amber-400" : "text-[#4a4568]"}`}
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
    <section className="section bg-[#0f0e1d]" aria-labelledby="latest-reviews-title">
      <div className="container">
        <div className="section-title">
          <h2 id="latest-reviews-title">{t("title")}</h2>
          <p className="text-[#bcb5df]">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-[#2f2b48] bg-[#17152a]/95 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="font-semibold text-white" itemProp="author">
                  {review.author}
                </p>
                <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-[#c2bce4]" itemProp="reviewBody">
                {review.text}
              </p>

              <div className="flex items-center justify-between text-xs text-[#9790be]">
                <span>{review.source}</span>
                <time dateTime={review.date}>{new Date(review.date).toLocaleDateString(locale)}</time>
              </div>

              {review.profileUrl ? (
                <a
                  href={review.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-bold text-primary hover:underline"
                >
                  {t("view_source")}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
