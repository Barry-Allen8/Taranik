import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";
import { getCanonicalUrl, getHreflangAlternates } from "@/lib/seo";

// All static routes in the application
const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/mobile-apps",
  "/services/chatbots",
  "/services/ai-solutions",
  "/services/websites",
  "/services/consulting",
  "/services/cloud",
  "/contact",
  "/portfolio",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    for (const locale of locales) {
      const url = getCanonicalUrl(locale, route);
      const alternates = getHreflangAlternates(route);

      urls.push({
        url,
        lastModified: new Date(),
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return urls;
}
