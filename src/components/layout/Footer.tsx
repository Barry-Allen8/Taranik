"use client";

import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { type Locale } from "@/i18n";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const tServices = useTranslations("services_menu");
  const locale = useLocale() as Locale;
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container py-16 relative z-10">
        {/* Top CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-8 md:p-12 mb-16 backdrop-blur-sm border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("newsletter_title")}</h3>
              <p className="text-gray-300">{t("newsletter_desc")}</p>
            </div>
            <div>
              <form className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter_placeholder")}
                    className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 bg-primary hover:bg-primary-dark rounded-xl font-semibold flex items-center gap-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">{t("newsletter_button")}</span>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/" locale={locale} className="flex items-center gap-2 mb-4">
              <svg 
                viewBox="130 345 280 245" 
                className="h-10 w-auto"
                aria-label="VektaDev Logo"
              >
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <g fill="url(#footerLogoGradient)">
                  <polygon points="402.85 350.64 388.87 374.86 270.35 580.13 255.54 554.48 270.35 528.81 314.8 451.84 359.24 374.86 270.35 374.86 284.33 350.64 402.85 350.64"/>
                  <polygon points="315.63 399.08 270.35 477.49 270.32 477.43 255.5 503.09 240.69 528.75 225.9 503.13 151.84 374.86 137.86 350.64 167.48 350.64 181.46 374.86 240.71 477.47 255.52 451.81 270.33 426.15 270.35 426.18 286 399.08 315.63 399.08"/>
                  <polygon points="255.63 400.69 254.97 401.83 240.93 426.16 226.88 401.83 211.3 374.86 197.31 350.64 225.92 350.64 239.54 374.22 239.91 374.86 255.13 401.23 255.54 400.53 255.63 400.69"/>
                </g>
              </svg>
              <span className="text-xl font-bold gradient-text">VektaDev</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-primary"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              {t("services_title")}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/services/websites", key: "websites" },
                { href: "/services/chatbots", key: "chatbots" },
                { href: "/services/ai-solutions", key: "ai_solutions" },
                { href: "/services/mobile-apps", key: "mobile_apps" },
                { href: "/services/consulting", key: "consulting" },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    locale={locale}
                    className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {tServices(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full" />
              {t("company_title")}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/about", key: "about" },
                { href: "/portfolio", key: "portfolio" },
                { href: "/blog", key: "blog" },
                { href: "/courses", key: "courses" },
                { href: "/contact", key: "contact" },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    locale={locale}
                    className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full" />
              {t("contact_title")}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t("address")}</p>
                    <p className="text-sm">{t("working_hours")}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:+48500600700"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-white font-medium">+48 500 600 700</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@vektadev.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-white font-medium">contact@vektadev.com</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} VektaDev. {t("rights")}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacy" locale={locale} className="text-gray-500 hover:text-white transition-colors">
                {t("privacy")}
              </Link>
              <Link href="/terms" locale={locale} className="text-gray-500 hover:text-white transition-colors">
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
