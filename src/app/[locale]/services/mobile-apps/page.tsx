import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import MobileAppsPageClient from "./MobileAppsPageClient";

const ROUTE = "/services/mobile-apps";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("mobile_apps.metadata.title"),
    description: t("mobile_apps.metadata.description"),
    keywords: t("mobile_apps.metadata.keywords"),
    alternates: getSeoAlternates(locale, ROUTE),
    openGraph: {
      title: t("mobile_apps.metadata.title"),
      description: t("mobile_apps.metadata.description"),
      type: "website",
    },
  };
}

export default function MobileAppsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <MobileAppsPageClient />;
}
