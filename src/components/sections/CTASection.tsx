"use client";

import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;

  return (
    <section className="section relative overflow-hidden bg-gradient-to-r from-primary via-accent to-secondary">
      {/* Animated hexagon overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
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
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons-cta)" />
        </svg>
      </motion.div>

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
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
        className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
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
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"
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
              className="bg-white text-primary hover:bg-gray-100 btn-shine"
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
              className="border-white text-white hover:bg-white hover:text-primary"
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
