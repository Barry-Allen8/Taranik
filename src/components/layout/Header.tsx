"use client";

import { useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, LayoutGrid } from "lucide-react";
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
          ? "border-slate-700/70 bg-[#030b1f]/88 py-3 shadow-[0_14px_50px_rgba(2,6,23,0.45)] backdrop-blur-xl"
          : "border-slate-700/45 bg-[#030b1f]/66 py-4 backdrop-blur-lg"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" locale={locale} className="inline-flex items-center gap-2 text-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/15">
              <LayoutGrid className="h-4 w-4 text-primary" />
            </div>
            <span className="futuristic-font text-lg font-bold tracking-tight">
              VEKTA<span className="text-primary">DEV</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-9 text-sm font-medium text-slate-300">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 transition-colors",
                  isServicesActive ? "text-primary" : "hover:text-primary"
                )}
              >
                {t("services")}
                <ChevronDown className="h-4 w-4" />
              </button>

              {servicesOpen ? (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-64 rounded-2xl border border-slate-700/70 bg-[#081228]/92 p-2 shadow-2xl shadow-black/45 backdrop-blur-xl">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        locale={locale}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-sm transition-colors",
                          isActive(service.href)
                            ? "bg-primary/20 text-primary"
                            : "text-slate-300 hover:bg-slate-800/60 hover:text-primary"
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
              className={cn(isActive("/portfolio") ? "text-primary" : "hover:text-primary")}
            >
              {t("portfolio")}
            </Link>
            <Link
              href="/about"
              locale={locale}
              className={cn(isActive("/about") ? "text-primary" : "hover:text-primary")}
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              locale={locale}
              className={cn(isActive("/contact") ? "text-primary" : "hover:text-primary")}
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <button
                className="rounded-full border border-slate-600 bg-slate-900/45 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-400"
                onClick={() => setLangOpen((open) => !open)}
                aria-label="Switch language"
              >
                {localeLabels[locale]}
              </button>
              {langOpen ? (
                <div className="absolute right-0 top-full mt-2 w-24 rounded-xl border border-slate-700/70 bg-[#081228]/95 p-1.5 shadow-xl shadow-black/35">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={cn(
                        "block w-full rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-colors",
                        locale === loc ? "bg-primary/25 text-primary" : "text-slate-300 hover:bg-slate-800/70"
                      )}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <Button asChild size="sm" className="px-5 py-2.5">
              <Link href="/contact" locale={locale}>{t("consultation")}</Link>
            </Button>
          </div>

          <button
            className="lg:hidden rounded-xl border border-slate-600 bg-slate-900/55 p-2.5 text-slate-200"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={cn("lg:hidden overflow-hidden transition-all duration-300", mobileOpen ? "max-h-[560px] pt-4" : "max-h-0 pt-0")}>
          <nav className="rounded-2xl border border-slate-700/60 bg-[#081228]/88 p-4 shadow-xl shadow-black/35 backdrop-blur-xl">
            <div className="mb-4 flex gap-2 border-b border-slate-700/55 pb-4">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold",
                    locale === loc ? "border-primary bg-primary/20 text-primary" : "border-slate-600 text-slate-300"
                  )}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>

            <p className="mb-2 text-xs font-semibold text-slate-400">{t("services")}</p>
            <div className="mb-5 space-y-1.5">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  locale={locale}
                  className={cn(
                    "block rounded-xl border px-3 py-2.5 text-sm",
                    isActive(service.href)
                      ? "border-primary/40 bg-primary/15 text-primary"
                      : "border-slate-700/60 text-slate-300"
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
                    "block rounded-lg px-2 py-2 text-sm transition-colors",
                    isActive(item.href) ? "text-primary" : "text-slate-200"
                  )}
                >
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
