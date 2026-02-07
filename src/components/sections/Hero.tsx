"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

const heroCodeRows = [
  "const platform = createDigitalExperience();",
  "platform.deploy({ stack: 'nextjs', region: 'global' });",
  "platform.enable({ ai: true, analytics: true });",
  "status: production-ready",
];

export default function Hero() {
  const t = useTranslations("hero");
  const tServicesMenu = useTranslations("services_menu");
  const locale = useLocale() as Locale;

  return (
    <section className="relative overflow-hidden bg-[#121022] pb-20 pt-28 lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 bg-grid opacity-65" />
      <div className="pointer-events-none absolute -right-16 top-12 h-[420px] w-[420px] rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[280px] w-[280px] rounded-full bg-secondary/20 blur-[110px]" />

      <div className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.13em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {t("badge")}
            </div>

            <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {t("title")}<br />
              <span className="gradient-text">{t("title_gradient")}</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-[#c7c0eb] lg:mx-0">
              {t("description")}
            </p>

            <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="neon-glow w-full sm:w-auto">
                <Link href="/contact" locale={locale}>
                  {t("cta_primary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-[#3a3656] bg-[#17152a] text-white hover:border-primary/50 hover:bg-[#1f1d35] sm:w-auto"
              >
                <a href="#services">{t("cta_secondary")}</a>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[t("stats.individual"), t("stats.modern"), t("stats.partnership"), t("stats.quality")].map((label) => (
                <div key={label} className="rounded-xl border border-[#302b4a] bg-[#17152a]/90 px-3 py-3 text-center text-xs font-semibold text-[#e5e1ff]">
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-primary/30 via-secondary/15 to-transparent blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-[#353250] bg-[#151328] shadow-[0_40px_80px_rgba(5,4,15,0.55)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern interface preview"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  priority
                />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#130f24]/85 px-4 py-2.5 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="font-mono text-[11px] text-[#b8b1da]">vektadev/studio-console</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-[#130f24]/85 p-4 backdrop-blur-sm">
                  <div className="space-y-1.5 font-mono text-[11px] text-[#dfdbff] sm:text-xs">
                    {heroCodeRows.map((row) => (
                      <p key={row}>{row}</p>
                    ))}
                  </div>
                </div>

                <div className="absolute left-4 top-20 rounded-full border border-[#464061] bg-[#17152a]/85 px-3 py-1.5 text-[11px] font-semibold text-white">
                  {tServicesMenu("websites")}
                </div>
                <div className="absolute right-5 top-24 rounded-full border border-[#464061] bg-[#17152a]/85 px-3 py-1.5 text-[11px] font-semibold text-white">
                  {tServicesMenu("chatbots")}
                </div>
                <div className="absolute left-8 bottom-24 rounded-full border border-[#464061] bg-[#17152a]/85 px-3 py-1.5 text-[11px] font-semibold text-white">
                  {tServicesMenu("mobile_apps")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
