import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import ConsultingPageClient from "./ConsultingPageClient";

const ROUTE = "/services/consulting";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("consulting.metadata.title"),
    description: t("consulting.metadata.description"),
    keywords: t("consulting.metadata.keywords"),
    alternates: getSeoAlternates(locale, ROUTE),
    openGraph: {
      title: t("consulting.metadata.title"),
      description: t("consulting.metadata.description"),
      type: "website",
    },
  };
}

export default function ConsultingPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <ConsultingPageClient />;
}
