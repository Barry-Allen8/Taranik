"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;

  return (
    <header className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24">
      <div className="absolute inset-0 bg-grid" />
      <div className="scanline-overlay" />

      <div className="pointer-events-none absolute left-8 top-24 hidden data-overlay lg:block">
        SYS.STATUS: ACTIVE
        <br />
        UPLINK: STABLE
        <br />
        ENCRYPTION: AES-256
        <br />
        LATENCY: 14MS
      </div>

      <div className="pointer-events-none absolute bottom-20 right-8 hidden text-right data-overlay lg:block">
        LOCATION: 37.7749 N
        <br />
        THREAT_LEVEL: NULL
        <br />
        LOAD_CORE: 42%
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="text-center lg:text-left">
            <div className="mb-8 inline-flex items-center gap-2 border border-primary px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              <span className="h-1.5 w-1.5 bg-primary shadow-[0_0_8px_#39ff14]" />
              {t("badge")}
            </div>

            <h1 className="glitch-text mb-7 text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("title")}
              <br />
              <span className="gradient-text">{t("title_gradient")}</span>
            </h1>

            <p className="mx-auto mb-10 max-w-xl text-sm leading-relaxed uppercase tracking-[0.08em] text-[#777777] lg:mx-0">
              {t("description")}
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="px-10">
                <Link href="/contact" locale={locale}>{t("cta_primary")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="px-10"
              >
                <a href="#services">{t("cta_secondary")}</a>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[t("stats.individual"), t("stats.modern"), t("stats.partnership"), t("stats.quality")].map((label) => (
                <div key={label} className="border border-[#161616] bg-[#050505] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8a8a8a]">
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[530px]">
            <div className="sharp-card relative overflow-hidden border border-primary/35 bg-black p-1">
              <div className="relative aspect-square overflow-hidden border border-[#1b1b1b]">
                <Image
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
                  alt="Abstract cybernetic architecture"
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  className="object-cover grayscale brightness-75 transition duration-700 hover:grayscale-0 hover:brightness-100"
                  priority
                />
              </div>

              <div className="absolute -right-3 top-6 border border-primary/45 bg-black px-3 py-2 text-[9px] uppercase tracking-[0.16em] text-primary">
                X: 142.09
                <br />
                Y: -88.11
                <br />
                Z: 1042.8
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
