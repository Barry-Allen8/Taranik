"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { TerminalSquare } from "lucide-react";
import { type Locale } from "@/i18n";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("navigation");
  const tServices = useTranslations("services_menu");
  const locale = useLocale() as Locale;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#111111] bg-black py-14">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <Link href="/" locale={locale} className="mb-5 inline-flex items-center gap-2 text-white">
              <TerminalSquare className="h-4 w-4 text-primary" />
              <span className="futuristic-font text-sm font-black tracking-[0.18em]">
                VEKTA<span className="text-primary">DEV</span>
              </span>
            </Link>
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#5f5f5f]">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-[#8a8a8a]">{"// Directives"}</h4>
            <ul className="space-y-2 text-[10px] uppercase tracking-[0.16em]">
              <li><Link href="/services/websites" locale={locale} className="cyber-link">{tServices("websites")}</Link></li>
              <li><Link href="/services/chatbots" locale={locale} className="cyber-link">{tServices("chatbots")}</Link></li>
              <li><Link href="/services/mobile-apps" locale={locale} className="cyber-link">{tServices("mobile_apps")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-[#8a8a8a]">{"// Network"}</h4>
            <ul className="space-y-2 text-[10px] uppercase tracking-[0.16em]">
              <li><Link href="/about" locale={locale} className="cyber-link">{tNav("about")}</Link></li>
              <li><Link href="/portfolio" locale={locale} className="cyber-link">{tNav("portfolio")}</Link></li>
              <li><Link href="/contact" locale={locale} className="cyber-link">{tNav("contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-[#8a8a8a]">{"// Coords"}</h4>
            <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-[#5f5f5f]">{t("address")}</p>
            <a href="mailto:hello@vektadev.com" className="text-[10px] uppercase tracking-[0.16em] text-primary hover:text-primary/80">
              hello@vektadev.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#111111] pt-6 md:flex-row">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#424242]">© {currentYear} VektaDev // all systems nominal</p>
          <div className="flex gap-7 text-[9px] uppercase tracking-[0.22em] text-[#424242]">
            <Link href="/privacy" locale={locale} className="cyber-link">{t("privacy")}</Link>
            <Link href="/terms" locale={locale} className="cyber-link">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
