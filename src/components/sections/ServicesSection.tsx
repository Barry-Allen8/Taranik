"use client";

import Card from "@/components/ui/Card";
import { Globe, Bot, Smartphone, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

const serviceKeys = [
  { key: "websites", icon: Globe, href: "/services/websites" },
  { key: "chatbots", icon: Bot, href: "/services/chatbots" },
  { key: "mobile_apps", icon: Smartphone, href: "/services/mobile-apps" },
] as const;

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="section relative overflow-hidden border-y border-[#25213c] bg-[#0f0e1d]">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/20 blur-[110px]" />

      <div className="container relative z-10">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[0.15em] text-primary">
              {t("title")}
            </span>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Engineering <span className="text-primary">Excellence</span>
            </h2>
            <p className="text-lg text-[#bcb5df]">{t("description")}</p>
          </div>

          <Link
            href="/services"
            locale={locale}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
          >
            {t("learn_more")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {serviceKeys.map((service) => {
            const Icon = service.icon;
            const features = (t.raw(`${service.key}.features`) as string[]).slice(0, 3);

            return (
              <Link key={service.key} href={service.href} locale={locale} className="group block h-full">
                <Card className="relative h-full overflow-hidden border-[#2f2b48] bg-[#17152a]/95 p-7 hover:border-primary/60">
                  <Icon className="pointer-events-none absolute -right-7 top-5 h-24 w-24 text-primary/10 transition-transform duration-500 group-hover:scale-110" />

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-extrabold text-white">{t(`${service.key}.title`)}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-[#bcb5df]">{t(`${service.key}.description`)}</p>

                  <ul className="mb-7 space-y-2">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm font-medium text-[#f1eeff]">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3">
                    {t("learn_more")}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
