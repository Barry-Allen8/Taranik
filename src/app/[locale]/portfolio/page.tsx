import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
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
  };
}

export default function PortfolioPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <PortfolioPageClient />;
}
