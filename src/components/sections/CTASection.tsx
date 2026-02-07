"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { CalendarDays } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-primary/8" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-3xl -translate-x-1/2 bg-primary/15 blur-[110px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[#c4bde7] md:text-xl">
            {t("description")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="neon-glow w-full sm:w-auto">
              <Link href="/contact" locale={locale}>{t("button_primary")}</Link>
            </Button>
            <Link
              href="/portfolio"
              locale={locale}
              className="inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-primary"
            >
              {t("button_secondary")}
              <CalendarDays className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
