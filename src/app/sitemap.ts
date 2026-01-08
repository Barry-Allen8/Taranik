import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n";

const BASE_URL = "https://vektadev.com";
const STATIC_ROUTES = ["/", "/about", "/services", "/contact", "/portfolio", "/privacy", "/terms"];

const buildUrl = (locale: string, route: string) => {
  const normalizedRoute = route === "/" ? "" : route;
  const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
  return `${BASE_URL}${localePrefix}${normalizedRoute}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    for (const locale of locales) {
      urls.push({
        url: buildUrl(locale, route),
      });
    }
  }

  return urls;
}
