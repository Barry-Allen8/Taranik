import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import { getServiceSchema } from "@/lib/schema";
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

export default async function CloudPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const schema = getServiceSchema({
    locale,
    name: t("cloud.title"),
    description: t("cloud.description"),
    path: ROUTE,
  });

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CloudPageClient />
    </>
  );
}
