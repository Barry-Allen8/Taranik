import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";
import { localePrefix } from "./i18n/navigation";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
