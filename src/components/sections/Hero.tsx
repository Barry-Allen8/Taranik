"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Sparkles, Target, Rocket, Handshake, ShieldCheck } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
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

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const heroImage =
    "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&crop=entropy&q=72&w=1400&h=1050&fm=avif";

  return (
    <LazyMotion features={domAnimation}>
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-violet-50/30">
      {/* Static gradient background - no animations for performance */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mesh gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(139,92,246,0.1),transparent)]" />
        
        {/* Static blobs - no animation for better mobile performance */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-accent/15 to-secondary/15 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container relative z-10 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left - Text Content */}
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <m.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-primary/10 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t("badge")}</span>
            </div>
          </m.div>

          <m.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight"
            >
              {t("title")}{" "}
              <span className="gradient-text drop-shadow-[0_0_25px_rgba(37,99,235,0.3)]">{t("title_gradient")}</span>
          </m.h1>

          <m.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {t("description")}
          </m.p>

          <m.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button size="lg" className="btn-shine group" asChild>
              <Link href="/contact" locale={locale}>
                  {t("cta_primary")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <a href="#services">
                  {t("cta_secondary")}
                  <span className="inline-block animate-bounce">↓</span>
                </a>
            </Button>
            </m.div>

            {/* Stats - simplified without hover animations */}
            <m.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Target, label: t("stats.individual"), color: "from-blue-500 to-cyan-500" },
                { icon: Rocket, label: t("stats.modern"), color: "from-orange-500 to-amber-500" },
                { icon: Handshake, label: t("stats.partnership"), color: "from-emerald-500 to-teal-500" },
                { icon: ShieldCheck, label: t("stats.quality"), color: "from-violet-500 to-purple-500" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs text-muted font-medium leading-tight">{stat.label}</div>
                  </div>
                );
              })}
            </m.div>
          </m.div>

          {/* Right - Hero Image (desktop only) */}
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative max-w-[560px] ml-auto">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 to-accent/30 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/70 shadow-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={heroImage}
                    alt="Team working on digital product strategy"
                    fill
                    priority
                    sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/55 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm font-medium text-white">{t("description")}</p>
              </div>
            </div>
          </m.div>
        </div>
      </div>
      {/* Scroll indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary/50 animate-[scrollDot_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
    </LazyMotion>
  );
}
