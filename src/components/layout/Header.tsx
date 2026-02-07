"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useTranslations, useLocale } from "next-intl";
import { locales, type Locale } from "@/i18n";

const localeLabels: Record<Locale, string> = {
  pl: "PL",
  en: "EN",
};

export default function Header() {
  const t = useTranslations("navigation");
  const tServices = useTranslations("services_menu");
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: tServices("websites"), href: "/services/websites" },
    { name: tServices("chatbots"), href: "/services/chatbots" },
    { name: tServices("mobile_apps"), href: "/services/mobile-apps" },
  ];

  const getPathWithoutLocale = () => {
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      return "/" + segments.slice(2).join("/") || "/";
    }
    return pathname;
  };

  const router = useRouter();
  const pathWithoutLocale = getPathWithoutLocale();
  const isServicesActive = pathWithoutLocale.startsWith("/services");

  const isActive = (href: string) => {
    if (href === "/") {
      return pathWithoutLocale === "/" || pathWithoutLocale === "";
    }
    return pathWithoutLocale.startsWith(href);
  };

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathWithoutLocale || "/", { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-primary/30 bg-black/95 py-3"
          : "border-primary/20 bg-black/88 py-4"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" locale={locale} className="inline-flex items-center gap-2 text-white">
            <TerminalSquare className="h-5 w-5 text-primary" />
            <span className="futuristic-font text-lg font-black tracking-[0.18em]">
              VEKTA<span className="text-primary">DEV</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9 text-[10px] font-bold uppercase tracking-[0.22em]">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={cn(
                  "inline-flex items-center gap-1 transition-colors",
                  isServicesActive ? "text-primary" : "text-white hover:text-primary"
                )}
              >
                {"// "}
                {t("services")}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {servicesOpen ? (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-60 border border-primary/30 bg-[#050505] p-1">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        locale={locale}
                        className={cn(
                          "block px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors",
                          isActive(service.href)
                            ? "bg-primary text-black"
                            : "text-[#8a8a8a] hover:text-primary"
                        )}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <Link
              href="/portfolio"
              locale={locale}
              className={cn(isActive("/portfolio") ? "text-primary" : "text-white hover:text-primary")}
            >
              {"// "}
              {t("portfolio")}
            </Link>
            <Link
              href="/about"
              locale={locale}
              className={cn(isActive("/about") ? "text-primary" : "text-white hover:text-primary")}
            >
              {"// "}
              {t("about")}
            </Link>
            <Link
              href="/contact"
              locale={locale}
              className={cn(isActive("/contact") ? "text-primary" : "text-white hover:text-primary")}
            >
              {"// "}
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                className="border border-primary/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-black"
                onClick={() => setLangOpen((open) => !open)}
              >
                {localeLabels[locale]}
              </button>
              {langOpen ? (
                <div className="absolute right-0 top-full mt-2 border border-primary/30 bg-[#050505] p-1">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={cn(
                        "block w-full px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                        locale === loc ? "bg-primary text-black" : "text-[#8a8a8a] hover:text-primary"
                      )}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <Button asChild size="sm" className="px-5 py-2 text-[10px]">
              <Link href="/contact" locale={locale}>{t("consultation")}</Link>
            </Button>
          </div>

          <button
            className="lg:hidden rounded-md border border-primary/40 p-2 text-primary"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={cn("lg:hidden overflow-hidden transition-all duration-300", mobileOpen ? "max-h-[540px] pt-4" : "max-h-0 pt-0")}>
          <nav className="border border-primary/20 bg-[#050505] p-4">
            <div className="mb-4 flex gap-2 border-b border-primary/20 pb-4">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]",
                    locale === loc ? "border-primary bg-primary text-black" : "border-primary/30 text-primary"
                  )}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>

            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#666666]">
              {"// "}
              {t("services")}
            </p>
            <div className="mb-5 space-y-1">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  locale={locale}
                  className={cn(
                    "block border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em]",
                    isActive(service.href)
                      ? "border-primary bg-primary text-black"
                      : "border-[#1a1a1a] text-[#8a8a8a]"
                  )}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <div className="space-y-1">
              {[
                { href: "/portfolio", label: t("portfolio") },
                { href: "/about", label: t("about") },
                { href: "/contact", label: t("contact") },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  locale={locale}
                  className={cn(
                    "block px-1 py-2 text-[11px] font-bold uppercase tracking-[0.18em]",
                    isActive(item.href) ? "text-primary" : "text-white"
                  )}
                >
                  {"// "}
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
