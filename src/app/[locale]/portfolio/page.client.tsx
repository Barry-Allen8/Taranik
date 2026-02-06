"use client";

import { useState } from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { ExternalLink, Filter, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
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
        : portfolioShowcase.filter((p) => p.category === activeCategory);

    return (
        <div className="min-h-screen">
            <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
                        <p className="text-xl text-muted">{t("description")}</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                        <Filter className="w-5 h-5 text-muted" />
                        {categories.map((category) => (
                            <button
                                key={category.key}
                                onClick={() => setActiveCategory(category.key)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.key
                                        ? "bg-primary text-white"
                                        : "bg-card hover:bg-primary/10"
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                id={project.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                            >
                                <Card className="group cursor-pointer h-full">
                                    <div className="relative w-full aspect-[4/3] rounded-lg mb-4 overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={t(`projects.${project.key}.title`)}
                                            fill
                                            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                                            priority={idx === 0}
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                                        {t(`categories.${project.categoryKey}`)}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {t(`projects.${project.key}.title`)}
                                    </h3>
                                    <p className="text-muted mb-4 text-sm">
                                        {t(`projects.${project.key}.description`)}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="px-2 py-1 bg-card text-xs rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-border">
                                        <span className="text-sm text-muted">{project.year}</span>
                                        <div className="flex items-center gap-4">
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                {t("live_demo")}
                                            </a>
                                            {project.videoUrl && (
                                                <a
                                                    href={project.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                                >
                                                    <PlayCircle className="w-4 h-4" />
                                                    {t("video_demo")}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted text-lg">{t("no_projects")}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
