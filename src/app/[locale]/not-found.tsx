"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Home, ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

export default function NotFound() {
  const t = useTranslations("not_found");
  const locale = useLocale() as Locale;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-[2rem] border border-slate-700/55 bg-[#081228]/88 p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">404</p>
        <div className="mb-6 text-8xl font-bold text-slate-100 md:text-9xl">404</div>
        <h1 className="mb-4 text-3xl text-slate-100 md:text-4xl">{t("title")}</h1>
        <p className="mb-8 text-base text-slate-400">{t("description")}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/" locale={locale}>
              <Home className="h-4 w-4" />
              {t("home")}
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/contact" locale={locale}>
              <ArrowLeft className="h-4 w-4" />
              {t("contact")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
