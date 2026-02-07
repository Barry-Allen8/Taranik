"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { type Locale } from "@/i18n";

const caseStudies = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&crop=entropy&q=70&w=1400&h=900&fm=webp",
    titleKey: "case_1_title",
    descriptionKey: "case_1_desc",
    tags: ["Web3", "FinTech"],
    color: "text-primary",
    badgeColor: "bg-primary text-black",
    status: "VERIFIED_BUILD",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&crop=entropy&q=70&w=1400&h=900&fm=webp",
    titleKey: "case_2_title",
    descriptionKey: "case_2_desc",
    tags: ["BioTech", "LLM"],
    color: "text-secondary",
    badgeColor: "bg-secondary text-white",
    status: "NODE_ACTIVE",
  },
] as const;

export default function CaseStudiesSection() {
  const t = useTranslations("cases");
  const locale = useLocale() as Locale;

  return (
    <section className="section relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-grid opacity-75" />

      <div className="container relative z-10">
        <div className="mb-14">
          <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.28em] text-primary">
            {"// CLASSIFIED_PORTFOLIO"}
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">OPERATIONS</h2>
          <p className="mt-4 max-w-2xl text-xs uppercase tracking-[0.16em] text-[#5f5f5f]">{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 gap-9 lg:grid-cols-2">
          {caseStudies.map((study) => (
            <article key={study.id} className="group relative overflow-hidden border border-[#171717] bg-black">
              <div className="relative aspect-video">
                <Image
                  src={study.image}
                  alt={t(study.titleKey)}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover brightness-50 transition-all duration-700 group-hover:scale-110 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="translate-y-3 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className={`mb-2 text-3xl font-black ${study.color}`}>{t(study.titleKey)}</h3>
                  <p className="mb-5 text-xs uppercase tracking-[0.1em] text-[#787878] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {t(study.descriptionKey)}
                  </p>
                  <div className="flex gap-3">
                    {study.tags.map((tag, index) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${index === 0 ? study.badgeColor : "border border-[#4a4a4a] text-white"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`absolute right-4 top-4 text-[9px] font-bold uppercase tracking-[0.18em] ${study.color}`}>
                {study.status}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-right">
          <Link href="/portfolio" locale={locale} className="text-[10px] font-black uppercase tracking-[0.24em] text-primary hover:underline">
            [ {t("view_all")} ]
          </Link>
        </div>
      </div>
    </section>
  );
}
