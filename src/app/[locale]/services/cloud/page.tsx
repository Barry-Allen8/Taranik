import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import CloudPageClient from "./CloudPageClient";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("cloud.metadata.title"),
    description: t("cloud.metadata.description"),
    keywords: t("cloud.metadata.keywords"),
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
