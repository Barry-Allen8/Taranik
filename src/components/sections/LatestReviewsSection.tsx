import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { getLatestReviews } from "@/lib/reviews";

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => {
    const active = index < rating;
    return (
      <Star
        key={index}
        className={`h-4 w-4 ${active ? "fill-primary text-primary" : "text-slate-700"}`}
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
    <section className="section border-y border-slate-700/40 bg-[#030b1f]/55" aria-labelledby="latest-reviews-title">
      <div className="container">
        <div className="section-title">
          <h2 id="latest-reviews-title">{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="sharp-card border-slate-700/45 p-6"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div
                itemProp="itemReviewed"
                itemScope
                itemType="https://schema.org/LocalBusiness"
                hidden
              >
                <meta itemProp="name" content="VektaDev" />
              </div>

              <div className="mb-3 flex items-center justify-between gap-2">
                <p
                  className="text-sm font-semibold text-slate-100"
                  itemProp="author"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <span itemProp="name">{review.author}</span>
                </p>
                <div
                  className="flex items-center gap-1"
                  aria-label={`${review.rating} out of 5`}
                  itemProp="reviewRating"
                  itemScope
                  itemType="https://schema.org/Rating"
                >
                  <meta itemProp="ratingValue" content={String(review.rating)} />
                  <meta itemProp="bestRating" content="5" />
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-slate-300" itemProp="reviewBody">
                {review.text}
              </p>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{review.source}</span>
                <time dateTime={review.date} itemProp="datePublished">{new Date(review.date).toLocaleDateString(locale)}</time>
              </div>

              {review.profileUrl ? (
                <a
                  href={review.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-xs font-medium text-primary hover:text-primary-dark"
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
