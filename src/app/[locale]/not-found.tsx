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
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-3xl border border-primary/20 bg-[#050505] p-8 text-center">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">{"// route_not_found"}</p>
        <div className="glitch-text mb-6 text-8xl font-black text-white md:text-9xl">404</div>
        <h1 className="mb-4 text-3xl font-black text-white md:text-4xl">{t("title")}</h1>
        <p className="mb-8 text-xs uppercase tracking-[0.12em] text-[#6a6a6a]">{t("description")}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/" locale={locale}>
              <Home className="h-4 w-4" />
              {t("home")}
            </Link>
          </Button>
          <Button variant="outline" asChild>
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
