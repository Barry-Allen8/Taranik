import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import WebsitesPageClient from "./WebsitesPageClient";

const ROUTE = "/services/websites";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("websites.metadata.title"),
    description: t("websites.metadata.description"),
    keywords: t("websites.metadata.keywords"),
    alternates: getSeoAlternates(locale, ROUTE),
    openGraph: {
      title: t("websites.metadata.title"),
      description: t("websites.metadata.description"),
      type: "website",
    },
  };
}

export default function WebsitesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <WebsitesPageClient />;
}
