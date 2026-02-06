"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ArrowUpRight, Globe, Bot, Cpu, TrendingUp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { type Locale } from "@/i18n";

const caseStudies = [
  {
    id: 1,
    slug: "ecommerce-platform",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&crop=entropy&q=70&w=1200&h=750&fm=webp",
    icon: Globe,
    category: "E-commerce",
    titleKey: "case_1_title",
    descriptionKey: "case_1_desc",
    results: [
      { value: "+150%", labelKey: "case_1_result_1" },
      { value: "2.5s", labelKey: "case_1_result_2" },
    ],
    technologies: ["Next.js", "Stripe", "PostgreSQL"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    slug: "ai-chatbot",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&crop=entropy&q=70&w=1200&h=750&fm=webp",
    icon: Bot,
    category: "AI & Chatbots",
    titleKey: "case_2_title",
    descriptionKey: "case_2_desc",
    results: [
      { value: "70%", labelKey: "case_2_result_1" },
      { value: "24/7", labelKey: "case_2_result_2" },
    ],
    technologies: ["Python", "OpenAI", "Telegram API"],
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 3,
    slug: "business-automation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&crop=entropy&q=70&w=1200&h=750&fm=webp",
    icon: Cpu,
    category: "Automation",
    titleKey: "case_3_title",
    descriptionKey: "case_3_desc",
    results: [
      { value: "85%", labelKey: "case_3_result_1" },
      { value: "3x", labelKey: "case_3_result_2" },
    ],
    technologies: ["Node.js", "React", "MongoDB"],
    color: "from-emerald-500 to-teal-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function CaseStudiesSection() {
  const t = useTranslations("cases");
  const locale = useLocale() as Locale;

  return (
    <section className="section bg-gradient-to-b from-white to-gray-50 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -90, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 9 + 7,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle geometric pattern */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(37,99,235,0.03)_1px,transparent_0)] bg-[size:40px_40px] opacity-50"
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px', '0px 0px'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("badge")}</span>
          </div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((study) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.id}
                variants={itemVariants}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={study.image}
                      alt={t(study.titleKey)}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${study.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                        {study.category}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br ${study.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {t(study.titleKey)}
                    </h3>
                    <p className="text-muted text-sm mb-4 flex-1">
                      {t(study.descriptionKey)}
                    </p>

                    {/* Results */}
                    <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                            {result.value}
                          </div>
                          <div className="text-xs text-muted">{t(result.labelKey)}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-xs font-medium text-muted rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link to portfolio */}
                    <Link
                      href="/portfolio"
                      locale={locale}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group/link"
                    >
                      {t("view_case")}
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            locale={locale}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 hover:bg-primary/10 text-primary font-medium rounded-full transition-all duration-300 group"
          >
            {t("view_all")}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
