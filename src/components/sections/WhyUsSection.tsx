"use client";

import Card from "@/components/ui/Card";
import { Award, Users, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const featureKeys = [
  { key: "professionalism", icon: Award },
  { key: "speed", icon: Zap },
  { key: "reliability", icon: Shield },
  { key: "individual", icon: Users },
];

export default function WhyUsSection() {
  const t = useTranslations("why_us");

  return (
    <section className="section bg-card relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_20%,rgba(37,99,235,0.08),transparent)]"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(139,92,246,0.06),transparent)]"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Floating orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-xl"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
              scale: [1, Math.random() * 0.4 + 0.8, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-50" />
      </div>

      <div className="container relative z-10">
        <div className="section-title">
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureKeys.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center h-full bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-muted text-sm">
                  {t(`${feature.key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
