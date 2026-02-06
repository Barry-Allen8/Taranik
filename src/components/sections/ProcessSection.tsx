"use client";

import { MessageSquare, Palette, Code, TestTube, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const stepKeys = [
  { key: "consultation", icon: MessageSquare },
  { key: "design", icon: Palette },
  { key: "development", icon: Code },
  { key: "testing", icon: TestTube },
  { key: "launch", icon: Rocket },
];

export default function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient spots */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: `${Math.random() * 5 + 2}px`,
              height: `${Math.random() * 5 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-40"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px', '0px 0px'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="section-title">
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-12">
            {stepKeys.map((step, index) => (
              <motion.div
                key={step.key}
                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex-1 lg:text-right">
                  <div
                    className={`inline-block ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                  >
                    <h3 className="text-2xl font-semibold mb-2">
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="text-muted max-w-md">
                      {t(`steps.${step.key}.description`)}
                    </p>
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary/20 rounded-full -z-10 animate-pulse" />
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
