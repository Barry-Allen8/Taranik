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

const floatingParticles = [
  { size: 6, left: "8%", top: "22%", duration: 16, delay: 0 },
  { size: 7, left: "16%", top: "72%", duration: 19, delay: 1.2 },
  { size: 5, left: "24%", top: "46%", duration: 15, delay: 2.4 },
  { size: 8, left: "32%", top: "18%", duration: 21, delay: 0.8 },
  { size: 6, left: "40%", top: "84%", duration: 18, delay: 3.2 },
  { size: 5, left: "48%", top: "34%", duration: 17, delay: 1.5 },
  { size: 7, left: "56%", top: "64%", duration: 20, delay: 2.7 },
  { size: 6, left: "64%", top: "14%", duration: 16, delay: 0.4 },
  { size: 8, left: "72%", top: "52%", duration: 22, delay: 2.1 },
  { size: 5, left: "80%", top: "28%", duration: 15, delay: 3.5 },
  { size: 6, left: "88%", top: "70%", duration: 18, delay: 1.8 },
  { size: 7, left: "94%", top: "40%", duration: 19, delay: 2.9 },
];

const glowingOrbs = [
  { size: 18, left: "12%", top: "30%", duration: 8, delay: 0.3 },
  { size: 22, left: "22%", top: "58%", duration: 10, delay: 1.4 },
  { size: 16, left: "36%", top: "24%", duration: 7, delay: 2.2 },
  { size: 24, left: "51%", top: "68%", duration: 9, delay: 0.9 },
  { size: 14, left: "63%", top: "36%", duration: 8, delay: 1.7 },
  { size: 20, left: "74%", top: "20%", duration: 11, delay: 2.8 },
  { size: 18, left: "83%", top: "62%", duration: 9, delay: 0.5 },
  { size: 15, left: "92%", top: "44%", duration: 7, delay: 1.9 },
];

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as Locale;
  const heroImage =
    "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&crop=entropy&q=72&w=1400&h=1050&fm=avif";

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated mesh gradient */}
          <m.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.28),transparent)]"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <m.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(16,185,129,0.12),transparent)]"
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Animated floating blobs */}
          <m.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/25 to-accent/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <m.div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 30, -20, 0],
              scale: [1, 0.9, 1.15, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <m.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-3xl"
            animate={{
              x: [0, 20, -30, 0],
              y: [0, -20, 40, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />

          {/* Animated grid pattern */}
          <m.div
            className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px', '0px 0px'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating particles */}
          {floatingParticles.map((particle, i) => (
            <m.div
              key={i}
              className="absolute rounded-full bg-sky-300/20"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Additional small glowing orbs */}
          {glowingOrbs.map((orb, i) => (
            <m.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-sm"
              style={{
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                left: orb.left,
                top: orb.top,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                delay: orb.delay,
                ease: "easeInOut",
              }}
            />
          ))}
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/70 backdrop-blur-sm rounded-full shadow-lg border border-primary/30 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-slate-100">{t("badge")}</span>
                </div>
              </m.div>

              <m.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight text-slate-100"
              >
                {t("title")}{" "}
                <span className="gradient-text drop-shadow-[0_0_25px_rgba(37,99,235,0.3)]">{t("title_gradient")}</span>
              </m.h1>

              <m.p
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0"
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
                      className="text-center p-4 rounded-xl bg-slate-900/70 backdrop-blur-sm border border-slate-700 shadow-sm hover:shadow-lg hover:border-slate-600 hover:bg-slate-900 hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-xs text-slate-300 font-medium leading-tight">{stat.label}</div>
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
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/35 to-accent/35 blur-3xl" />
                <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 shadow-2xl">
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
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-950/70 px-4 py-3 backdrop-blur-sm border border-slate-700/70">
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
