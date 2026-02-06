import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import PrivacyPageClient from "./page.client";

const ROUTE = "/privacy";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("privacy.title"),
    description: t("privacy.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "privacy policy",
      "GDPR compliance",
      "data protection",
      "personal data rights",
      "VektaDev privacy",
    ],
  };
}

export default function PrivacyPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <PrivacyPageClient />;
}
