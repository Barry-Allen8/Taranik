import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import AISolutionsPageClient from "./AISolutionsPageClient";

const ROUTE = "/services/ai-solutions";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("ai_solutions.metadata.title"),
    description: t("ai_solutions.metadata.description"),
    keywords: t("ai_solutions.metadata.keywords"),
    alternates: getSeoAlternates(locale, ROUTE),
    openGraph: {
      title: t("ai_solutions.metadata.title"),
      description: t("ai_solutions.metadata.description"),
      type: "website",
    },
  };
}

export default function AISolutionsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <AISolutionsPageClient />;
}
