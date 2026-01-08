import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import AISolutionsPageClient from "./AISolutionsPageClient";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("ai_solutions.metadata.title"),
    description: t("ai_solutions.metadata.description"),
    keywords: t("ai_solutions.metadata.keywords"),
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
