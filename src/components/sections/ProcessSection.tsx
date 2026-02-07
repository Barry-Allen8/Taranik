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
    <section className="section border-y border-slate-700/40 bg-[#030b1f]/45" id="process">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl text-slate-100 md:text-5xl">{t("title")}</h2>
          <p className="mx-auto max-w-2xl text-base text-slate-400">{t("description")}</p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-5">
          <div className="absolute left-10 right-10 top-9 hidden h-px bg-slate-700/50 md:block" />

          {stepKeys.map((step, index) => (
            <div key={step.key} className="relative z-10 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </div>

              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Step {index + 1}</p>
              <h3 className="mb-2 text-base text-slate-100">{t(`steps.${step.key}.title`)}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{t(`steps.${step.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
