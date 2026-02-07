"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { type Locale } from "@/i18n";

const caseStudies = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&crop=entropy&q=70&w=1400&h=900&fm=webp",
    category: "E-commerce",
    titleKey: "case_1_title",
    descriptionKey: "case_1_desc",
    tags: ["SaaS", "Web App"],
    className: "",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&crop=entropy&q=70&w=1400&h=900&fm=webp",
    category: "AI",
    titleKey: "case_2_title",
    descriptionKey: "case_2_desc",
    tags: ["Chatbot", "Automation"],
    className: "",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&crop=entropy&q=70&w=1800&h=900&fm=webp",
    category: "Automation",
    titleKey: "case_3_title",
    descriptionKey: "case_3_desc",
    tags: ["Dashboard", "Enterprise"],
    className: "md:col-span-2",
  },
] as const;

export default function CaseStudiesSection() {
  const t = useTranslations("cases");
  const locale = useLocale() as Locale;

  return (
    <section className="section relative overflow-hidden bg-[#121022]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_8%,rgba(82,57,243,0.18),transparent_40%)]" />

      <div className="container relative z-10">
        <div className="mb-12">
          <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.15em] text-primary">{t("badge")}</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">{t("title")}</h2>
          <p className="mt-4 max-w-2xl text-lg text-[#bcb5df]">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              className={`group relative overflow-hidden rounded-2xl border border-[#2f2a48] ${study.className}`}
            >
              <div className="relative aspect-video">
                <Image
                  src={study.image}
                  alt={t(study.titleKey)}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d1d]/95 via-[#0f0d1d]/55 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-primary/35 bg-primary/20 px-3 py-1 text-xs font-bold text-white">
                    {study.category}
                  </span>
                  {study.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mb-2 text-2xl font-extrabold text-white">{t(study.titleKey)}</h3>
                <p className="mb-4 max-w-2xl text-sm text-[#dbd6ff]">{t(study.descriptionKey)}</p>

                <Link
                  href="/portfolio"
                  locale={locale}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all group-hover:gap-3"
                >
                  {t("view_case")}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portfolio"
            locale={locale}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
          >
            {t("view_all")}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
