import { locales, defaultLocale } from "@/i18n";

const BASE_URL = "https://vektadev.com";

/**
 * Generates the canonical URL for a given locale and route.
 * Uses the current localePrefix: "as-needed" convention:
 * - English (default): no prefix
 * - Other locales: /{locale} prefix
 */
export const getCanonicalUrl = (locale: string, route: string): string => {
    const normalizedRoute = route === "/" ? "" : route;
    const localePrefix = locale === defaultLocale ? "" : `/${locale}`;
    return `${BASE_URL}${localePrefix}${normalizedRoute}`;
};

/**
 * Generates hreflang alternates for all locales including x-default.
 * Returns object compatible with Next.js Metadata API alternates.languages
 */
export const getHreflangAlternates = (route: string): Record<string, string> => {
    const alternates: Record<string, string> = {};

    for (const locale of locales) {
        alternates[locale] = getCanonicalUrl(locale, route);
    }

    // x-default points to the default locale version
    alternates["x-default"] = getCanonicalUrl(defaultLocale, route);

    return alternates;
};

/**
 * Combined SEO alternates generator for Next.js Metadata API.
 * Returns the complete alternates object with canonical and languages.
 */
export const getSeoAlternates = (locale: string, route: string) => ({
    canonical: getCanonicalUrl(locale, route),
    languages: getHreflangAlternates(route),
});
