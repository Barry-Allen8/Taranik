"use client";

import Card from "@/components/ui/Card";
import { Award, Users, Zap, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

const featureKeys = [
  { key: "professionalism", icon: Award },
  { key: "speed", icon: Zap },
  { key: "reliability", icon: Shield },
  { key: "individual", icon: Users },
] as const;

export default function WhyUsSection() {
  const t = useTranslations("why_us");

  return (
    <section className="section bg-[#121022]">
      <div className="container">
        <div className="section-title">
          <h2>{t("title")}</h2>
          <p className="text-[#bcb5df]">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((feature) => (
            <Card key={feature.key} className="h-full border-[#2f2b48] bg-[#17152a]/95 text-center hover:border-primary/45">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-extrabold text-white">{t(`${feature.key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-[#bcb5df]">{t(`${feature.key}.description`)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
