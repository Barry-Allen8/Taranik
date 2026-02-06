import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import AboutPageClient from "./page.client";

const ROUTE = "/about";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "VektaDev team",
      "software engineers Poland",
      "custom web development company",
      "chatbot development partner",
      "mobile app development company",
    ],
  };
}

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <AboutPageClient />;
}
