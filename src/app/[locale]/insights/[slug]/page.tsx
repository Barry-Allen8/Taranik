import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import { getInsightPost, getInsightSlugs } from "@/lib/insights";

export async function generateStaticParams() {
  const slugs = await getInsightSlugs();

  return slugs.flatMap((slug) => [{ locale: "en", slug }, { locale: "pl", slug }]);
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = await getInsightPost(locale, slug);

  if (!post) {
    return {
      title: "Insight not found | VektaDev",
    };
  }

  return {
    title: `${post.title} | Insights`,
    description: post.description,
    alternates: getSeoAlternates(locale, `/insights/${slug}`),
    keywords: post.tags,
  };
}

export default async function InsightPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);

  const post = await getInsightPost(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container max-w-4xl">
          <p className="text-sm text-muted mb-4">{post.author}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted">{post.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <article dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </section>
    </div>
  );
}
