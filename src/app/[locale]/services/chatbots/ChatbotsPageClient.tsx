"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { Link } from "@/i18n/navigation";
import {
  Check,
  Bot,
  X,
  AlertTriangle,
  Lightbulb,
  Trophy,
  Settings,
  Database,
  BarChart3,
  Users,
  ChevronRight,
  MessageCircle,
  Send,
  Smartphone,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function ChatbotsPageClient() {
  const t = useTranslations("services");

  const benefits = ["support", "instant", "cost", "integration"];
  const trustIcons = [Settings, Database, BarChart3, Users];

  const packages = [
    { key: "basic", recommended: false },
    { key: "business", recommended: true },
    { key: "ai", recommended: false },
  ];

  const platformIcons = [
    { key: "telegram", icon: Send, color: "text-primary" },
    { key: "whatsapp", icon: MessageCircle, color: "text-secondary" },
    { key: "viber", icon: Smartphone, color: "text-primary" },
    { key: "website", icon: Bot, color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen">
      <section className="section border-b border-slate-700/45">
        <div className="container">
          <div className="max-w-5xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              <Bot className="h-3.5 w-3.5" />
              <span>{t("chatbots.title")}</span>
            </div>
            <h1 className="mb-6 text-5xl text-slate-100 md:text-6xl">{t("chatbots.hero_title")}</h1>
            <p className="mb-3 max-w-4xl text-lg leading-relaxed text-slate-400">{t("chatbots.hero_subtitle")}</p>
            <p className="mb-8 max-w-4xl text-base leading-relaxed text-slate-400">{t("chatbots.hero_description")}</p>
            <Button size="lg" asChild className="px-10">
              <Link href="/contact">
                {t("chatbots.hero_cta")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-[#030b1f]/45">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("chatbots.platforms.title")}</h2>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {platformIcons.map((platform) => {
              const Icon = platform.icon;
              return (
                <Card key={platform.key} className="border-slate-700/45 bg-slate-900/45 py-7 text-center">
                  <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 ${platform.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-medium text-slate-100">{t(`chatbots.platforms.${platform.key}`)}</h3>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("chatbots.who_its_for.title")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 lg:grid-cols-2">
            <Card className="border-primary/35 bg-slate-900/45">
              <h3 className="mb-5 flex items-center gap-2 text-xl text-primary">
                <Check className="h-5 w-5" />
                {t("chatbots.who_its_for.best_for_title")}
              </h3>
              <ul className="space-y-3">
                {(t.raw("chatbots.who_its_for.best_for") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-slate-700/55 bg-slate-900/45">
              <h3 className="mb-5 flex items-center gap-2 text-xl text-slate-200">
                <X className="h-5 w-5" />
                {t("chatbots.who_its_for.not_for_title")}
              </h3>
              <ul className="space-y-3">
                {(t.raw("chatbots.who_its_for.not_for") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-[#030b1f]/45">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl text-slate-100">{t("chatbots.problem_solution.title")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-red-500/45 bg-slate-900/45">
              <AlertTriangle className="mb-4 h-5 w-5 text-red-300" />
              <h3 className="mb-3 text-xl text-red-300">{t("chatbots.problem_solution.problem_title")}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{t("chatbots.problem_solution.problem_text")}</p>
            </Card>
            <Card className="border-primary/45 bg-slate-900/45">
              <Lightbulb className="mb-4 h-5 w-5 text-primary" />
              <h3 className="mb-3 text-xl text-primary">{t("chatbots.problem_solution.solution_title")}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{t("chatbots.problem_solution.solution_text")}</p>
            </Card>
            <Card className="border-secondary/45 bg-slate-900/45">
              <Trophy className="mb-4 h-5 w-5 text-secondary" />
              <h3 className="mb-3 text-xl text-secondary">{t("chatbots.problem_solution.result_title")}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{t("chatbots.problem_solution.result_text")}</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("what_you_get")}</h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {benefits.map((key) => (
              <Card key={key} className="border-slate-700/45 bg-slate-900/45">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 text-lg text-slate-100">{t(`chatbots.benefits.${key}.title`)}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{t(`chatbots.benefits.${key}.description`)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#030b1f]/45">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("chatbots.trust_signals.title")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {(t.raw("chatbots.trust_signals.items") as { title: string; description: string }[]).map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <Card key={item.title} className="border-slate-700/45 bg-slate-900/45 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-lg text-slate-100">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("packages")}</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-7 md:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.key} className={`relative border bg-slate-900/45 ${pkg.recommended ? "border-primary" : "border-slate-700/45"}`}>
                {pkg.recommended ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary bg-primary px-3 py-1 text-xs font-semibold text-slate-950">
                    {t("popular")}
                  </div>
                ) : null}
                <h3 className="mb-2 text-2xl text-slate-100">{t(`chatbots.packages.${pkg.key}.name`)}</h3>
                <div className="mb-6 text-2xl font-semibold text-primary">{t(`chatbots.packages.${pkg.key}.price`)}</div>
                <ul className="mb-6 space-y-2">
                  {(t.raw(`chatbots.packages.${pkg.key}.features`) as string[]).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
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

      <section className="section bg-[#030b1f]/45">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl text-slate-100">{t("chatbots.faq.title")}</h2>
          <div className="mx-auto max-w-4xl">
            <Accordion
              items={(t.raw("chatbots.faq.items") as { question: string; answer: string }[]).map((item) => ({
                title: item.question,
                content: item.answer,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-700/45 bg-[#07122a]/78 p-10 text-center">
            <h2 className="mb-6 text-4xl text-slate-100">{t("chatbots.cta_section.title")}</h2>
            <p className="mb-8 text-base leading-relaxed text-slate-300">{t("chatbots.cta_section.description")}</p>
            <Button size="lg" asChild className="px-10">
              <Link href="/contact">
                {t("chatbots.cta_section.button")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
