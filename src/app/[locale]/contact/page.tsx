import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoAlternates } from "@/lib/seo";
import ContactPageClient from "./page.client";

const ROUTE = "/contact";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });
  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "contact software company",
      "book IT consultation",
      "web development quote",
      "AI project discovery call",
      "VektaDev contact",
    ],
  };
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <ContactPageClient />;
}
