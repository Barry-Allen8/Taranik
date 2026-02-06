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

const ambientOrbs = [
  { size: 140, left: "12%", top: "20%", duration: 12, delay: 0.2, x: 24, y: -18, scale: 1.2 },
  { size: 120, left: "34%", top: "72%", duration: 11, delay: 1.3, x: -20, y: -14, scale: 1.15 },
  { size: 160, left: "58%", top: "26%", duration: 13, delay: 2.1, x: 26, y: 16, scale: 1.25 },
  { size: 130, left: "76%", top: "68%", duration: 10, delay: 0.8, x: -18, y: 22, scale: 1.1 },
  { size: 110, left: "90%", top: "38%", duration: 12.5, delay: 2.6, x: 20, y: -20, scale: 1.18 },
];

export default function WhyUsSection() {
  const t = useTranslations("why_us");

  return (
    <section className="section bg-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_20%,rgba(37,99,235,0.18),transparent)]"
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
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(16,185,129,0.14),transparent)]"
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
        {ambientOrbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-xl"
            style={{
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: orb.left,
              top: orb.top,
            }}
            animate={{
              x: [0, orb.x, 0],
              y: [0, orb.y, 0],
              scale: [1, orb.scale, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              delay: orb.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />
      </div>

      <div className="container relative z-10">
        <div className="section-title">
          <h2 className="text-slate-100">{t("title")}</h2>
          <p className="text-slate-300">{t("description")}</p>
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
              <Card className="text-center h-full bg-slate-900/70 border border-slate-800 hover:border-slate-700">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-100">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-slate-300 text-sm">
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
