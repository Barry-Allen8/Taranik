"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-primary/10 to-emerald-900/20" />
      <div className="container relative z-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-700/45 bg-[#07122a]/78 px-6 py-14 text-center shadow-2xl shadow-black/35 backdrop-blur-xl md:px-12">
          <h2 className="mb-6 text-4xl text-slate-100 md:text-6xl">{t("title")}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-300">{t("description")}</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="px-10">
              <Link href="/contact" locale={locale}>{t("button_primary")}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="px-10">
              <Link href="/portfolio" locale={locale}>{t("button_secondary")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
