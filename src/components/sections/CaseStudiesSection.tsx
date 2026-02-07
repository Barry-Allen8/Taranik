"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { type Locale } from "@/i18n";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&crop=entropy&q=70&w=1400&h=900&fm=webp",
    titleKey: "case_1_title",
    descriptionKey: "case_1_desc",
    tags: ["Web3", "FinTech"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&crop=entropy&q=70&w=1400&h=900&fm=webp",
    titleKey: "case_2_title",
    descriptionKey: "case_2_desc",
    tags: ["BioTech", "LLM"],
  },
] as const;

export default function CaseStudiesSection() {
  const t = useTranslations("cases");
  const locale = useLocale() as Locale;

  return (
    <section className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15" />

      <div className="container relative z-10">
        <div className="mb-14">
          <span className="mb-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t("badge")}
          </span>
          <h2 className="text-4xl text-slate-100 md:text-5xl">{t("title")}</h2>
          <p className="mt-4 max-w-2xl text-base text-slate-400">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-9 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <article key={study.id} className="group sharp-card relative overflow-hidden border-slate-700/45">
              <div className="relative aspect-video overflow-hidden rounded-[1.25rem]">
                <Image
                  src={study.image}
                  alt={t(study.titleKey)}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="mb-2 text-2xl text-slate-100 transition-colors group-hover:text-primary">{t(study.titleKey)}</h3>
                <p className="mb-4 max-w-xl text-sm leading-relaxed text-slate-300">{t(study.descriptionKey)}</p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-600/70 bg-slate-900/55 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  <ArrowUpRight className="ml-auto h-4 w-4 text-primary" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-right">
          <Link href="/portfolio" locale={locale} className="text-sm font-medium text-primary hover:text-primary-dark">
            {t("view_all")}
          </Link>
        </div>
      </div>
    </section>
  );
}
