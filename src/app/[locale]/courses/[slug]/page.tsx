"use client";

import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Accordion from "@/components/ui/Accordion";
import { Clock, BookOpen, Award, Check, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Course mapping from slug to translation key
const courseMapping: Record<string, { key: string; lessons: number; prices: { standard: number; premium: number } }> = {
  "web-development-fundamentals": { key: "web_dev", lessons: 30, prices: { standard: 5000, premium: 8000 } },
  "ai-chatbots-development": { key: "ai_chatbots", lessons: 20, prices: { standard: 6000, premium: 9500 } },
};

export default function CoursePage({ params }: { params: { slug: string } }) {
  const t = useTranslations("courses");
  const tCommon = useTranslations("common");
  const courseData = courseMapping[params.slug];

  if (!courseData) {
    notFound();
  }

  const courseKey = courseData.key;
  
  // Get translated arrays using t.raw()
  const benefits = t.raw(`course_list.${courseKey}.benefits`) as string[];
  const targetAudience = t.raw(`course_list.${courseKey}.targetAudience`) as string[];
  
  // Get modules
  const modules = [
    {
      title: t(`course_list.${courseKey}.modules.module1.title`),
      lessons: t.raw(`course_list.${courseKey}.modules.module1.lessons`) as string[],
    },
    {
      title: t(`course_list.${courseKey}.modules.module2.title`),
      lessons: t.raw(`course_list.${courseKey}.modules.module2.lessons`) as string[],
    },
    {
      title: t(`course_list.${courseKey}.modules.module3.title`),
      lessons: t.raw(`course_list.${courseKey}.modules.module3.lessons`) as string[],
    },
  ];
  
  // Get pricing
  const pricing = [
    {
      name: t(`course_list.${courseKey}.pricing.standard.name`),
      price: courseData.prices.standard,
      features: t.raw(`course_list.${courseKey}.pricing.standard.features`) as string[],
      recommended: false,
    },
    {
      name: t(`course_list.${courseKey}.pricing.premium.name`),
      price: courseData.prices.premium,
      features: t.raw(`course_list.${courseKey}.pricing.premium.features`) as string[],
      recommended: true,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t(`course_list.${courseKey}.title`)}
            </h1>
            <p className="text-xl text-muted mb-8">
              {t(`course_list.${courseKey}.description`)}
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{t(`course_list.${courseKey}.duration`)}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>{courseData.lessons} {t("lessons")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>{t(`course_list.${courseKey}.format`)}</span>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">{t("enroll")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t("for_whom")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetAudience.map((audience, idx) => (
              <Card key={idx} className="text-center">
                <User className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p>{audience}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t("benefits")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <span className="text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t("instructor")}</h2>
          <Card className="max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-16 h-16 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {t(`course_list.${courseKey}.instructor.name`)}
                </h3>
                <p className="text-primary mb-4">
                  {t(`course_list.${courseKey}.instructor.experience`)}
                </p>
                <p className="text-muted">
                  {t(`course_list.${courseKey}.instructor.bio`)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t("pricing")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricing.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative ${plan.recommended ? "border-2 border-primary" : ""}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                    {t("recommended")}
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary mb-6">
                  {plan.price} {tCommon("currency")}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.recommended ? "primary" : "outline"}
                  asChild
                >
                  <Link href="/contact">{t("choose")}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">{t("program")}</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion
              items={modules.map((module) => ({
                title: module.title,
                content: (
                  <ul className="space-y-2">
                    {module.lessons.map((lesson, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
