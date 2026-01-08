import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { defaultLocale, locales } from "@/i18n";
import ContactPageClient from "./page.client";

const BASE_URL = "https://vektadev.com";
const ROUTE = "/contact";

const getLocalizedUrl = (locale: string, route: string) => {
  const normalizedRoute = route === "/" ? "" : route;
  const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${localePrefix}${normalizedRoute}`;
};

const getAlternates = (route: string) =>
  Object.fromEntries(locales.map((locale) => [locale, getLocalizedUrl(locale, route)]));

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: {
      canonical: getLocalizedUrl(locale, ROUTE),
      languages: getAlternates(ROUTE),
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
