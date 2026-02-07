"use client";

import { MessageSquare, Palette, Code, TestTube, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

const stepKeys = [
  { key: "consultation", icon: MessageSquare },
  { key: "design", icon: Palette },
  { key: "development", icon: Code },
  { key: "testing", icon: TestTube },
  { key: "launch", icon: Rocket },
] as const;

export default function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="section border-y border-[#25213c] bg-[#0f0e1d]">
      <div className="container">
        <div className="section-title">
          <span className="mb-3 inline-block text-xs font-extrabold uppercase tracking-[0.15em] text-primary">
            {t("title")}
          </span>
          <h2>{t("title")}</h2>
          <p className="text-[#bcb5df]">{t("description")}</p>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-6">
            {stepKeys.map((step, index) => (
              <div key={step.key} className="group text-center">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#0f0e1d] bg-[#1a182e] shadow-xl transition-transform duration-300 group-hover:scale-105">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                <div className="rounded-2xl border border-[#2f2b48] bg-[#17152a]/90 p-5">
                  <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
                    {index + 1}
                  </p>
                  <h3 className="mb-2 text-lg font-extrabold text-white">{t(`steps.${step.key}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-[#bcb5df]">{t(`steps.${step.key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
