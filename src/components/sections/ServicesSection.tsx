"use client";

import { Globe, Bot, Smartphone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

const serviceKeys = [
  { key: "websites", href: "/services/websites", icon: Globe, index: "0x001", accent: "text-primary", bar: "w-[86%] bg-primary shadow-[0_0_8px_#39ff14]" },
  { key: "chatbots", href: "/services/chatbots", icon: Bot, index: "0x002", accent: "text-secondary", bar: "w-[72%] bg-secondary shadow-[0_0_8px_#bc13fe]" },
  { key: "mobile_apps", href: "/services/mobile-apps", icon: Smartphone, index: "0x003", accent: "text-primary", bar: "w-full bg-primary shadow-[0_0_8px_#39ff14]" },
] as const;

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="section relative overflow-hidden border-y border-primary/15 bg-black">
      <div className="absolute inset-0 bg-grid opacity-80" />

      <div className="container relative z-10">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              CORE <span className="text-primary">DIRECTIVES</span>
            </h2>
            <p className="text-xs uppercase tracking-[0.16em] text-[#666666]">
              {t("description")}
            </p>
          </div>

          <Link
            href="/services"
            locale={locale}
            className="text-[10px] font-black uppercase tracking-[0.24em] text-primary hover:underline"
          >
            [ VIEW_ALL_ASSETS ]
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {serviceKeys.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.key} href={service.href} locale={locale} className="group sharp-card border border-[#181818] bg-[#050505] p-8 transition-all hover:border-primary/60">
                <div className="mb-7 flex items-start justify-between">
                  <Icon className={`h-7 w-7 ${service.accent}`} />
                  <span className="text-[10px] font-bold text-[#494949]">{service.index}</span>
                </div>

                <h3 className={`mb-3 text-xl font-black ${service.accent}`}>{t(`${service.key}.title`)}</h3>
                <p className="mb-7 text-xs uppercase leading-relaxed tracking-[0.08em] text-[#646464]">
                  {t(`${service.key}.description`)}
                </p>

                <div className="space-y-2">
                  <div className="h-[4px] w-full bg-[#111111]">
                    <div className={`h-full ${service.bar}`} />
                  </div>
                  <p className={`text-[9px] font-bold uppercase tracking-[0.22em] ${service.accent}`}>
                    {(t.raw(`${service.key}.features`) as string[])[0]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
