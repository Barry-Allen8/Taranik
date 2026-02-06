import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSeoAlternates } from "@/lib/seo";
import { getInsightsList } from "@/lib/insights";
import { type Locale, locales, defaultLocale } from "@/i18n";

const ROUTE = "/insights";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("insights.title"),
    description: t("insights.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "web performance insights",
      "AI automation strategy",
      "Next.js best practices",
      "conversion optimization",
      "digital product insights",
    ],
  };
}

export default async function InsightsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const [posts, t] = await Promise.all([
    getInsightsList(locale),
    getTranslations({ locale, namespace: "insights" }),
  ]);
  const normalizedLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;

  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-100">{t("title")}</h1>
            <p className="text-xl text-slate-300">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 animate-fade-in-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex items-center justify-between gap-3 mb-3 text-xs text-slate-400">
                  <span>{post.author}</span>
                  <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(locale)}</time>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-slate-100">{post.title}</h2>
                <p className="text-slate-300 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200 border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/insights/${post.slug}`} locale={normalizedLocale} className="text-primary font-medium hover:underline">
                  {t("read_article")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
