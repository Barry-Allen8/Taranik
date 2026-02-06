"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { Link } from "@/i18n/navigation";
import {
  Check,
  X,
  AlertTriangle,
  Lightbulb,
  Trophy,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

type ServiceKey = "ai_solutions" | "cloud" | "consulting";

type ServiceDetailTemplateProps = {
  serviceKey: ServiceKey;
  serviceIcon: LucideIcon;
  benefitKeys: string[];
  packageKeys: string[];
  trustIcons: LucideIcon[];
  showUseCases?: boolean;
};

export default function ServiceDetailTemplate({
  serviceKey,
  serviceIcon: ServiceIcon,
  benefitKeys,
  packageKeys,
  trustIcons,
  showUseCases = false,
}: ServiceDetailTemplateProps) {
  const t = useTranslations("services");

  const useCases = (() => {
    if (!showUseCases) return null;

    try {
      return t.raw(`${serviceKey}.use_cases.cases`) as Array<{
        title: string;
        description: string;
      }>;
    } catch {
      return null;
    }
  })();

  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <ServiceIcon className="w-4 h-4" />
              <span>{t(`${serviceKey}.title`)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t(`${serviceKey}.hero_title`)}
            </h1>
            <p className="text-xl md:text-2xl text-muted mb-4 max-w-2xl mx-auto">
              {t(`${serviceKey}.hero_subtitle`)}
            </p>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              {t(`${serviceKey}.hero_description`)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/contact">
                  {t(`${serviceKey}.hero_cta`)}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t(`${serviceKey}.who_its_for.title`)}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-secondary/30 bg-secondary/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-secondary">
                <Check className="w-6 h-6" />
                {t(`${serviceKey}.who_its_for.best_for_title`)}
              </h3>
              <ul className="space-y-4">
                {(t.raw(`${serviceKey}.who_its_for.best_for`) as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="border-2 border-muted/30 bg-muted/5">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-muted">
                <X className="w-6 h-6" />
                {t(`${serviceKey}.who_its_for.not_for_title`)}
              </h3>
              <ul className="space-y-4">
                {(t.raw(`${serviceKey}.who_its_for.not_for`) as string[]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t(`${serviceKey}.problem_solution.title`)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="relative border-l-4 border-l-red-500">
              <div className="absolute -top-4 left-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-4 text-red-500">
                  {t(`${serviceKey}.problem_solution.problem_title`)}
                </h3>
                <p className="text-muted">{t(`${serviceKey}.problem_solution.problem_text`)}</p>
              </div>
            </Card>
            <Card className="relative border-l-4 border-l-primary">
              <div className="absolute -top-4 left-4 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {t(`${serviceKey}.problem_solution.solution_title`)}
                </h3>
                <p className="text-muted">{t(`${serviceKey}.problem_solution.solution_text`)}</p>
              </div>
            </Card>
            <Card className="relative border-l-4 border-l-secondary">
              <div className="absolute -top-4 left-4 bg-secondary text-white w-10 h-10 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="pt-4">
                <h3 className="text-xl font-bold mb-4 text-secondary">
                  {t(`${serviceKey}.problem_solution.result_title`)}
                </h3>
                <p className="text-muted">{t(`${serviceKey}.problem_solution.result_text`)}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t(`${serviceKey}.trust_signals.title`)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {(t.raw(`${serviceKey}.trust_signals.items`) as Array<{ title: string; description: string }>).map(
              (item, i) => {
                const Icon = trustIcons[i] ?? Check;
                return (
                  <Card key={i} className="text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <p className="text-muted text-sm">{item.description}</p>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>

      {useCases && useCases.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t(`${serviceKey}.use_cases.title`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {useCases.map((useCase) => (
                <Card key={useCase.title}>
                  <h3 className="font-bold mb-2">{useCase.title}</h3>
                  <p className="text-muted text-sm">{useCase.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("what_you_get")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefitKeys.map((benefitKey) => (
              <Card key={benefitKey}>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{t(`${serviceKey}.benefits.${benefitKey}.title`)}</h3>
                    <p className="text-muted text-sm">{t(`${serviceKey}.benefits.${benefitKey}.description`)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t("packages")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packageKeys.map((packageKey, index) => {
              const isRecommended = index === 1;
              return (
                <Card
                  key={packageKey}
                  className={`relative ${isRecommended ? "border-2 border-primary shadow-xl scale-105" : ""}`}
                >
                  {isRecommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {t("popular")}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{t(`${serviceKey}.packages.${packageKey}.name`)}</h3>
                  <div className="text-3xl font-bold text-primary mb-6">{t(`${serviceKey}.packages.${packageKey}.price`)}</div>
                  <ul className="space-y-3 mb-6">
                    {(t.raw(`${serviceKey}.packages.${packageKey}.features`) as string[]).map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={isRecommended ? "primary" : "outline"} asChild>
                    <Link href="/contact">{t("order")}</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t(`${serviceKey}.faq.title`)}</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion
              items={
                (t.raw(`${serviceKey}.faq.items`) as { question: string; answer: string }[]).map((item) => ({
                  title: item.question,
                  content: item.answer,
                }))
              }
            />
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t(`${serviceKey}.cta_section.title`)}</h2>
            <p className="text-xl mb-8 text-white/90">{t(`${serviceKey}.cta_section.description`)}</p>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link href="/contact">
                {t(`${serviceKey}.cta_section.button`)}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
