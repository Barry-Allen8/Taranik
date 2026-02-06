"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const partners = [
  { name: "Microsoft", logo: "M" },
  { name: "Google", logo: "G" },
  { name: "AWS", logo: "AWS" },
  { name: "Vercel", logo: "▲" },
  { name: "Stripe", logo: "S" },
  { name: "OpenAI", logo: "◐" },
];

export default function TrustedBySection() {
  const t = useTranslations("trusted");

  return (
    <section className="py-12 bg-slate-950 border-y border-slate-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            {t("title")}
          </p>
        </motion.div>

        {/* Logo carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set */}
            {[...partners, ...partners].map((partner, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 mx-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-32 h-16 flex items-center justify-center rounded-lg bg-slate-900/70 border border-slate-800 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 group">
                  <span className="text-2xl font-bold text-slate-500 group-hover:text-primary transition-colors">
                    {partner.logo}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "OpenAI"].map(
            (tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 text-sm font-medium bg-slate-900/70 text-slate-300 rounded-full border border-slate-800 hover:border-primary/30 hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
