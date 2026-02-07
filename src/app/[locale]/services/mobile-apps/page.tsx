import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import { getServiceSchema } from "@/lib/schema";
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

export default async function MobileAppsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const schema = getServiceSchema({
    locale,
    name: t("mobile_apps.title"),
    description: t("mobile_apps.description"),
    path: ROUTE,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MobileAppsPageClient />
    </>
  );
}
