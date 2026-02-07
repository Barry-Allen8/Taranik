"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { Cookie, Shield } from "lucide-react";
import { type Locale } from "@/i18n";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const locale = useLocale() as Locale;
  const { hasConsent, isLoading, acceptAll, rejectNonEssential } = useCookieConsent();

  if (isLoading || hasConsent) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
    >
      <div className="container">
        <div className="cyber-panel border-slate-700/65 bg-[#081228]/92 p-4 md:p-5">
          <div className="mb-4 flex items-center gap-3 border-b border-slate-700/55 pb-3">
            <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 id="cookie-banner-title" className="futuristic-font text-base font-semibold text-slate-100">
              {t("title")}
            </h2>
          </div>

          <p id="cookie-banner-description" className="mb-4 text-sm leading-relaxed text-slate-300">
            {t("description")}
          </p>

          <div className="mb-5 flex items-start gap-2 rounded-xl border border-slate-700/55 bg-slate-900/45 p-3">
            <Shield className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-300">{t("essential_info")}</p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link href="/privacy" locale={locale} className="text-sm font-medium text-primary hover:text-primary/80">
              {t("privacy_link")}
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-full border border-slate-600 bg-slate-900/45 px-5 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-slate-400"
              >
                {t("reject")}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-full border border-primary bg-primary px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-primary-dark"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
