import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import ServicesPageClient from "./page.client";

const ROUTE = "/services";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("services.title"),
    description: t("services.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "IT services",
      "web development services",
      "chatbot development",
      "mobile app development",
      "software house Poland",
    ],
  };
}

export default function ServicesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ServicesPageClient />;
}
