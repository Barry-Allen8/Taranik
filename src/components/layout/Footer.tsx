"use client";

import { Link } from "@/i18n/navigation";
import { Facebook, Instagram, Linkedin, Github, Mail, MapPin, Phone, ArrowRight, Send, Check, Code2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { type Locale } from "@/i18n";
import { useState } from "react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const tServices = useTranslations("services_menu");
  const locale = useLocale() as Locale;
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    setEmail("");
    setIsLoading(false);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <footer className="border-t border-[#25213c] bg-[#0b0a16] pt-16 pb-8">
      <div className="container">
        <div className="mb-14 rounded-2xl border border-[#2f2b48] bg-primary/10 p-8 md:p-10">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-2xl font-extrabold text-white md:text-3xl">{t("newsletter_title")}</h3>
              <p className="text-[#c4bde7]">{t("newsletter_desc")}</p>
            </div>

            <form onSubmit={handleNewsletterSubmit}>
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("newsletter_placeholder")}
                  required
                  className="w-full rounded-xl border border-[#403a63] bg-[#17152a] px-4 py-3 text-white placeholder:text-[#9a93bf] focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-bold text-white transition-colors ${
                    isSubmitted ? "bg-emerald-500" : "bg-primary hover:bg-primary-dark"
                  } ${isLoading ? "cursor-wait opacity-80" : ""}`}
                >
                  {isSubmitted ? <Check className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                  <span className="hidden sm:inline">
                    {isSubmitted ? t("newsletter_success") : t("newsletter_button")}
                  </span>
                </button>
              </div>
              {isSubmitted ? <p className="mt-3 text-sm text-emerald-400">{t("newsletter_success_message")}</p> : null}
            </form>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" locale={locale} className="mb-4 inline-flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold">VektaDev</span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-[#a59fc9]">{t("description")}</p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "https://facebook.com/vektadev", label: "Facebook" },
                { icon: Instagram, href: "https://instagram.com/vektadev", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com/company/vektadev", label: "LinkedIn" },
                { icon: Github, href: "https://github.com/vektadev", label: "GitHub" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2f2b48] bg-[#17152a] text-[#c7c1e8] transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white">{t("services_title")}</h4>
            <ul className="space-y-2 text-sm text-[#a59fc9]">
              {[
                { href: "/services/websites", key: "websites" },
                { href: "/services/chatbots", key: "chatbots" },
                { href: "/services/mobile-apps", key: "mobile_apps" },
              ].map((item) => (
                <li key={item.key}>
                  <Link href={item.href} locale={locale} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                    <ArrowRight className="h-3.5 w-3.5" />
                    {tServices(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white">{t("company_title")}</h4>
            <ul className="space-y-2 text-sm text-[#a59fc9]">
              {[
                { href: "/about", key: "about" },
                { href: "/portfolio", key: "portfolio" },
                { href: "/contact", key: "contact" },
              ].map((item) => (
                <li key={item.key}>
                  <Link href={item.href} locale={locale} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                    <ArrowRight className="h-3.5 w-3.5" />
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-[0.12em] text-white">{t("contact_title")}</h4>
            <ul className="space-y-3 text-sm text-[#a59fc9]">
              <li>
                <a
                  href="https://maps.google.com/?q=ul.+Michała+Kajki+10-12,+10-547+Olsztyn,+Poland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3"
                >
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{t("address")}</span>
                </a>
              </li>
              <li>
                <a href="tel:+48537890776" className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+48 537 890 776</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@vektadev.com" className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>hello@vektadev.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#25213c] pt-6 text-sm md:flex-row">
          <p className="text-[#8f88b5]">© {currentYear} VektaDev. {t("rights")}</p>
          <div className="flex gap-6 text-[#8f88b5]">
            <Link href="/privacy" locale={locale} className="transition-colors hover:text-primary">
              {t("privacy")}
            </Link>
            <Link href="/terms" locale={locale} className="transition-colors hover:text-primary">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
