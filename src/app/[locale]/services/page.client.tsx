"use client";

import Card from "@/components/ui/Card";
import { Globe, Bot, Smartphone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const serviceKeys = [
  { key: "websites", icon: Globe, href: "/services/websites", code: "0x001" },
  { key: "chatbots", icon: Bot, href: "/services/chatbots", code: "0x002" },
  { key: "mobile_apps", icon: Smartphone, href: "/services/mobile-apps", code: "0x003" },
] as const;

export default function ServicesPageClient() {
  const t = useTranslations("services");

  return (
    <div className="min-h-screen">
      <section className="section border-b border-primary/15 bg-black">
        <div className="container">
          <div className="max-w-4xl">
            <span className="mb-4 inline-block border border-primary/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              {"// CORE_OPERATIONS"}
            </span>
            <h1 className="mb-5 text-5xl font-black text-white md:text-6xl">{t("title")}</h1>
            <p className="max-w-3xl text-xs uppercase tracking-[0.14em] text-[#5f5f5f]">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {serviceKeys.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.key} href={service.href} className="group">
                  <Card className="sharp-card h-full border-[#181818] bg-black p-7 hover:border-primary/50">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.14em] text-[#4d4d4d]">{service.code}</span>
                    </div>

                    <h2 className="mb-3 text-xl font-black text-white">{t(`${service.key}.title`)}</h2>
                    <p className="mb-5 text-xs uppercase tracking-[0.1em] text-[#6b6b6b]">
                      {t(`${service.key}.description`)}
                    </p>

                    <ul className="space-y-2">
                      {(t.raw(`${service.key}.features`) as string[]).map((feature) => (
                        <li key={feature} className="text-[10px] uppercase tracking-[0.12em] text-[#8a8a8a]">
                          <span className="mr-2 text-primary">&gt;&gt;</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
