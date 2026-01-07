import { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vektadev.com";

  // Static page paths (blog removed - not localized yet)
  const staticPaths = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/websites", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/chatbots", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/ai-solutions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/consulting", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/mobile-apps", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/cloud", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Generate URLs for all locales (only pl and en)
  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: locale === defaultLocale ? page.priority : page.priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}${page.path}`])
        ),
      },
    }))
  );

  return staticPages;
}
