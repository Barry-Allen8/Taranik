"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

const floatingParticles = [
  { size: 3, left: "7%", top: "18%", duration: 6.2, delay: 0.3 },
  { size: 4, left: "16%", top: "72%", duration: 7.1, delay: 1.2 },
  { size: 5, left: "27%", top: "38%", duration: 5.8, delay: 2.1 },
  { size: 3, left: "36%", top: "80%", duration: 6.9, delay: 0.9 },
  { size: 4, left: "45%", top: "24%", duration: 7.4, delay: 1.8 },
  { size: 5, left: "55%", top: "60%", duration: 6.1, delay: 2.5 },
  { size: 3, left: "64%", top: "32%", duration: 7.2, delay: 1.1 },
  { size: 4, left: "73%", top: "76%", duration: 5.9, delay: 2.2 },
  { size: 5, left: "82%", top: "44%", duration: 6.7, delay: 0.7 },
  { size: 3, left: "90%", top: "20%", duration: 7.3, delay: 1.6 },
  { size: 4, left: "95%", top: "66%", duration: 6.4, delay: 2.8 },
  { size: 5, left: "99%", top: "50%", duration: 5.6, delay: 0.4 },
];

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;

  return (
    <section className="section relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-y border-slate-800">
      {/* Animated hexagon overlay */}
      <motion.div
        className="absolute inset-0 opacity-25"
        animate={{
          backgroundPosition: ['0px 0px', '100px 86.8px', '0px 0px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons-cta" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon
                points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
                fill="none"
                stroke="rgba(59,130,246,0.5)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons-cta)" />
        </svg>
      </motion.div>

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Additional floating particles */}
      {floatingParticles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-sky-300/20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -60, 0],
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

      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-slate-100 text-slate-900 hover:bg-white btn-shine"
              asChild
            >
              <Link href="/contact" locale={locale}>
                {t("button_primary")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-100 text-slate-100 hover:bg-slate-100 hover:text-slate-900"
              asChild
            >
              <Link href="/portfolio" locale={locale}>{t("button_secondary")}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
