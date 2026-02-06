import type { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { getInsightSlugs } from "@/lib/insights";

const BASE_URL = "https://vektadev.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = [
    "",
    "/about",
    "/contact",
    "/portfolio",
    "/insights",
    "/privacy",
    "/terms",
    "/services",
    "/services/websites",
    "/services/chatbots",
    "/services/mobile-apps",
  ];

  const insightSlugs = await getInsightSlugs();
  const insightRoutes = insightSlugs.map((slug) => `/insights/${slug}`);
  const routes = [...baseRoutes, ...insightRoutes];

  const localizedRoutes = locales.flatMap((locale) =>
    routes.map((route) => `/${locale}${route}`)
  );

  return localizedRoutes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));
}
