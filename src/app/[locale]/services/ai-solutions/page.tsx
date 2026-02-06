import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import { getServiceSchema } from "@/lib/schema";
import AiSolutionsPageClient from "./AiSolutionsPageClient";

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

export default async function AiSolutionsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const schema = getServiceSchema({
    locale,
    name: t("ai_solutions.title"),
    description: t("ai_solutions.description"),
    path: ROUTE,
  });

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AiSolutionsPageClient />
    </>
  );
}
