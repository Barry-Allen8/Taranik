"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { ExternalLink, Filter, PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { portfolioShowcase } from "@/data/portfolioShowcase";

export default function PortfolioPageClient() {
  const t = useTranslations("portfolio");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: t("all") },
    { key: "E-commerce", label: t("categories.ecommerce") },
    { key: "Website", label: t("categories.website") },
    { key: "Chatbot", label: t("categories.chatbot") },
    { key: "AI Solution", label: t("categories.ai_solution") },
    { key: "Mobile App", label: t("categories.mobile_app") },
  ];

  const filteredProjects = activeCategory === "all"
    ? portfolioShowcase
    : portfolioShowcase.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen">
      <section className="section border-b border-primary/15 bg-black">
        <div className="container">
          <div className="max-w-4xl">
            <span className="mb-4 inline-block border border-primary/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              {"// CLASSIFIED_PROJECTS"}
            </span>
            <h1 className="mb-5 text-5xl font-black text-white md:text-6xl">{t("title")}</h1>
            <p className="max-w-3xl text-xs uppercase tracking-[0.14em] text-[#5f5f5f]">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                  activeCategory === category.key
                    ? "border-primary bg-primary text-black"
                    : "border-[#1c1c1c] bg-black text-[#7a7a7a] hover:text-primary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} id={project.slug} className="group sharp-card border-[#171717] bg-black p-4">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden border border-[#1a1a1a]">
                  <Image
                    src={project.image}
                    alt={t(`projects.${project.key}.title`)}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover brightness-75 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mb-3 inline-block border border-primary/35 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                  {t(`categories.${project.categoryKey}`)}
                </div>

                <h2 className="mb-2 text-lg font-black text-white">{t(`projects.${project.key}.title`)}</h2>
                <p className="mb-4 text-xs uppercase tracking-[0.1em] text-[#6a6a6a]">
                  {t(`projects.${project.key}.description`)}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="border border-[#1f1f1f] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-[#8b8b8b]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-[#151515] pt-3 text-[10px] uppercase tracking-[0.12em]">
                  <span className="text-[#585858]">{project.year}</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("live_demo")}
                    </a>
                    {project.videoUrl ? (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-secondary hover:underline"
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        {t("video_demo")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-10 text-center text-xs uppercase tracking-[0.16em] text-[#676767]">{t("no_projects")}</div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
