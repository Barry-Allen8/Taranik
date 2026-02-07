import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { getLatestReviews } from "@/lib/reviews";

function renderStars(rating: number) {
  return Array.from({ length: 5 }).map((_, index) => {
    const active = index < rating;
    return (
      <Star
        key={index}
        className={`h-3.5 w-3.5 ${active ? "fill-primary text-primary" : "text-[#313131]"}`}
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
    <section className="section border-y border-primary/10 bg-[#050505]" aria-labelledby="latest-reviews-title">
      <div className="container">
        <div className="section-title">
          <h2 id="latest-reviews-title">CLIENT FEEDBACK</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="sharp-card border border-[#161616] bg-black p-6"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white" itemProp="author">
                  {review.author}
                </p>
                <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5`}>
                  {renderStars(review.rating)}
                </div>
              </div>

              <p className="mb-5 text-xs uppercase leading-relaxed tracking-[0.08em] text-[#6d6d6d]" itemProp="reviewBody">
                {review.text}
              </p>

              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.1em] text-[#4f4f4f]">
                <span>{review.source}</span>
                <time dateTime={review.date}>{new Date(review.date).toLocaleDateString(locale)}</time>
              </div>

              {review.profileUrl ? (
                <a
                  href={review.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:underline"
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
