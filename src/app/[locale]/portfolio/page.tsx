import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import { portfolioShowcase } from "@/data/portfolioShowcase";
import { getPortfolioCaseSchema } from "@/lib/schema";
import PortfolioPageClient from "./page.client";

const ROUTE = "/portfolio";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("portfolio.title"),
    description: t("portfolio.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "portfolio web development",
      "chatbot case studies",
      "AI solution examples",
      "mobile app portfolio",
      "software project showcase",
    ],
  };
}

export default async function PortfolioPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "portfolio" });
  const schema = getPortfolioCaseSchema(
    portfolioShowcase.map((project) => ({
      locale,
      name: t(`projects.${project.key}.title`),
      description: t(`projects.${project.key}.description`),
      image: project.image,
      url: `https://vektadev.com/${locale}/portfolio#${project.slug}`,
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PortfolioPageClient />
    </>
  );
}
