"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/10 to-black" />
      <div className="scanline-overlay" />

      <div className="container relative z-10 text-center">
        <h2 className="glitch-text mb-8 text-5xl font-black text-white md:text-7xl">
          JOIN THE
          <br />
          <span className="text-primary">RESISTANCE</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-xs uppercase tracking-[0.16em] text-[#707070]">
          {t("description")}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="px-10">
            <Link href="/contact" locale={locale}>{t("button_primary")}</Link>
          </Button>
          <Link
            href="/portfolio"
            locale={locale}
            className="text-[10px] font-black uppercase tracking-[0.22em] text-secondary hover:text-primary"
          >
            {"// "}
            {t("button_secondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
