import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import TermsPageClient from "./page.client";

const ROUTE = "/terms";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("terms.title"),
    description: t("terms.description"),
    alternates: getSeoAlternates(locale, ROUTE),
  };
}

export default function TermsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <TermsPageClient />;
}
