import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import CloudPageClient from "./CloudPageClient";

const ROUTE = "/services/cloud";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("cloud.metadata.title"),
    description: t("cloud.metadata.description"),
    keywords: t("cloud.metadata.keywords"),
    alternates: getSeoAlternates(locale, ROUTE),
    openGraph: {
      title: t("cloud.metadata.title"),
      description: t("cloud.metadata.description"),
      type: "website",
    },
  };
}

export default function CloudPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <CloudPageClient />;
}
