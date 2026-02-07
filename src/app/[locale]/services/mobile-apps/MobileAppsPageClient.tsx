"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { Link } from "@/i18n/navigation";
import {
  Check,
  Smartphone,
  X,
  AlertTriangle,
  Lightbulb,
  Trophy,
  Code2,
  Store,
  HeadphonesIcon,
  Palette,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function MobileAppsPageClient() {
  const t = useTranslations("services");

  const benefits = [
    { key: "native" },
    { key: "cross" },
    { key: "ux" },
    { key: "support" },
  ];

  const trustIcons = [Code2, Store, HeadphonesIcon, Palette];

  const packages = [
    { key: "mvp", recommended: false },
    { key: "standard", recommended: true },
    { key: "enterprise", recommended: false },
  ];

  return (
    <div className="min-h-screen">
      <section className="section border-b border-primary/15 bg-black">
        <div className="container">
          <div className="max-w-5xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-primary/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              <Smartphone className="h-3.5 w-3.5" />
              <span>{t("mobile_apps.title")}</span>
            </div>
            <h1 className="mb-6 text-5xl font-black text-white md:text-6xl">{t("mobile_apps.hero_title")}</h1>
            <p className="mb-3 max-w-4xl text-xs uppercase tracking-[0.14em] text-[#666666]">{t("mobile_apps.hero_subtitle")}</p>
            <p className="mb-8 max-w-4xl text-xs uppercase tracking-[0.14em] text-[#666666]">{t("mobile_apps.hero_description")}</p>
            <Button size="lg" asChild className="px-10">
              <Link href="/contact">
                {t("mobile_apps.hero_cta")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-black text-white">{t("mobile_apps.who_its_for.title")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-2">
            <Card className="sharp-card border-primary/35 bg-black">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-black text-primary">
                <Check className="h-5 w-5" />
                {t("mobile_apps.who_its_for.best_for_title")}
              </h3>
              <ul className="space-y-3">
                {(t.raw("mobile_apps.who_its_for.best_for") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs uppercase tracking-[0.1em] text-[#828282]">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="sharp-card border-[#272727] bg-black">
              <h3 className="mb-5 flex items-center gap-2 text-lg font-black text-[#a0a0a0]">
                <X className="h-5 w-5" />
                {t("mobile_apps.who_its_for.not_for_title")}
              </h3>
              <ul className="space-y-3">
                {(t.raw("mobile_apps.who_its_for.not_for") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs uppercase tracking-[0.1em] text-[#666666]">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-black">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-black text-white">{t("mobile_apps.problem_solution.title")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="sharp-card border-red-500/40 bg-[#050505]">
              <AlertTriangle className="mb-4 h-5 w-5 text-red-400" />
              <h3 className="mb-3 text-lg font-black text-red-400">{t("mobile_apps.problem_solution.problem_title")}</h3>
              <p className="text-xs uppercase tracking-[0.1em] text-[#6f6f6f]">{t("mobile_apps.problem_solution.problem_text")}</p>
            </Card>
            <Card className="sharp-card border-primary/40 bg-[#050505]">
              <Lightbulb className="mb-4 h-5 w-5 text-primary" />
              <h3 className="mb-3 text-lg font-black text-primary">{t("mobile_apps.problem_solution.solution_title")}</h3>
              <p className="text-xs uppercase tracking-[0.1em] text-[#6f6f6f]">{t("mobile_apps.problem_solution.solution_text")}</p>
            </Card>
            <Card className="sharp-card border-secondary/40 bg-[#050505]">
              <Trophy className="mb-4 h-5 w-5 text-secondary" />
              <h3 className="mb-3 text-lg font-black text-secondary">{t("mobile_apps.problem_solution.result_title")}</h3>
              <p className="text-xs uppercase tracking-[0.1em] text-[#6f6f6f]">{t("mobile_apps.problem_solution.result_text")}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-black text-white">{t("mobile_apps.trust_signals.title")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(t.raw("mobile_apps.trust_signals.items") as { title: string; description: string }[]).map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <Card key={item.title} className="sharp-card border-[#171717] bg-black text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-primary/35 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-black text-white">{item.title}</h3>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#6c6c6c]">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-black">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-black text-white">{t("what_you_get")}</h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.key} className="sharp-card border-[#171717] bg-[#050505]">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 text-base font-black text-white">{t(`mobile_apps.benefits.${benefit.key}.title`)}</h3>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#6b6b6b]">{t(`mobile_apps.benefits.${benefit.key}.description`)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-black text-white">{t("packages")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.key} className={`sharp-card relative border bg-black ${pkg.recommended ? "border-primary" : "border-[#171717]"}`}>
                {pkg.recommended ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 border border-primary bg-primary px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black">
                    {t("popular")}
                  </div>
                ) : null}
                <h3 className="mb-2 text-2xl font-black text-white">{t(`mobile_apps.packages.${pkg.key}.name`)}</h3>
                <div className="mb-6 text-2xl font-black text-primary">{t(`mobile_apps.packages.${pkg.key}.price`)}</div>
                <ul className="mb-6 space-y-2">
                  {(t.raw(`mobile_apps.packages.${pkg.key}.features`) as string[]).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs uppercase tracking-[0.1em] text-[#727272]">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={pkg.recommended ? "primary" : "outline"} asChild>
                  <Link href="/contact">{t("order")}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-black">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl font-black text-white">{t("mobile_apps.faq.title")}</h2>
          <div className="mx-auto max-w-4xl">
            <Accordion
              items={(t.raw("mobile_apps.faq.items") as { question: string; answer: string }[]).map((item) => ({
                title: item.question,
                content: item.answer,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-black via-primary/10 to-black">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-black text-white">{t("mobile_apps.cta_section.title")}</h2>
            <p className="mb-8 text-xs uppercase tracking-[0.16em] text-[#787878]">{t("mobile_apps.cta_section.description")}</p>
            <Button size="lg" asChild className="px-10">
              <Link href="/contact">
                {t("mobile_apps.cta_section.button")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
