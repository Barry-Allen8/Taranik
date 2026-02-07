"use client";

import { Award, Users, Zap, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

const featureKeys = [
  { key: "professionalism", icon: Award, idx: "A1" },
  { key: "speed", icon: Zap, idx: "A2" },
  { key: "reliability", icon: Shield, idx: "A3" },
  { key: "individual", icon: Users, idx: "A4" },
] as const;

export default function WhyUsSection() {
  const t = useTranslations("why_us");

  return (
    <section className="section bg-[#050505]">
      <div className="container">
        <div className="section-title">
          <h2>INTEL MATRIX</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((feature) => (
            <article key={feature.key} className="sharp-card border border-[#171717] bg-black p-6">
              <div className="mb-4 flex items-center justify-between">
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#525252]">{feature.idx}</span>
              </div>
              <h3 className="mb-3 text-base font-black text-white">{t(`${feature.key}.title`)}</h3>
              <p className="text-xs uppercase leading-relaxed tracking-[0.1em] text-[#646464]">
                {t(`${feature.key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
