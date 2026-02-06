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

const floatingParticles = [
  { size: 3, left: "9%", top: "20%", duration: 10, delay: 0.2 },
  { size: 5, left: "18%", top: "72%", duration: 12.5, delay: 1.3 },
  { size: 4, left: "29%", top: "44%", duration: 11.2, delay: 2.1 },
  { size: 3, left: "38%", top: "83%", duration: 13.3, delay: 0.7 },
  { size: 5, left: "47%", top: "26%", duration: 10.8, delay: 1.8 },
  { size: 4, left: "58%", top: "58%", duration: 12.9, delay: 2.6 },
  { size: 3, left: "67%", top: "34%", duration: 11.5, delay: 0.9 },
  { size: 5, left: "76%", top: "78%", duration: 13.8, delay: 2.3 },
  { size: 4, left: "87%", top: "50%", duration: 10.4, delay: 1.4 },
  { size: 3, left: "95%", top: "18%", duration: 12.2, delay: 2.9 },
];

export default function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="section bg-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient spots */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-secondary/12 to-primary/10 rounded-full blur-3xl"
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
        {floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:100px_100px] opacity-35"
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
          <h2 className="text-slate-100">{t("title")}</h2>
          <p className="text-slate-300">{t("description")}</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2" />

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
                    className={`inline-block rounded-2xl border border-slate-800 bg-slate-900/60 p-6 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                      }`}
                  >
                    <h3 className="text-2xl font-semibold mb-2 text-slate-100">
                      {t(`steps.${step.key}.title`)}
                    </h3>
                    <p className="text-slate-300 max-w-md">
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
