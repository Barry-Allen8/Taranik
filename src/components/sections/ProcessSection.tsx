"use client";

import { MessageSquare, Palette, Code, TestTube, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

const stepKeys = [
  { key: "consultation", icon: MessageSquare, code: "01_SCAN" },
  { key: "design", icon: Palette, code: "02_FORGE" },
  { key: "development", icon: Code, code: "03_CODE" },
  { key: "testing", icon: TestTube, code: "04_TEST" },
  { key: "launch", icon: Rocket, code: "05_SYNC" },
] as const;

export default function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="section border-y border-primary/15 bg-black" id="process">
      <div className="container">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
            SYSTEM <span className="text-primary">PROTOCOLS</span>
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#646464]">{t("description")}</p>
        </div>

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-6">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-[#1f1f1f] md:block" />

          {stepKeys.map((step) => (
            <div key={step.key} className="group relative text-center">
              <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-[#272727] bg-black transition-colors group-hover:border-primary">
                <step.icon className="h-5 w-5 text-primary" />
              </div>

              <h3 className="mb-2 text-xs font-black tracking-[0.2em] text-white">{step.code}</h3>
              <p className="mx-auto max-w-[220px] text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#6f6f6f]">
                {t(`steps.${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
