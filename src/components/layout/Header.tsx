"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Code2 } from "lucide-react";
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
  const [mobileMenuOpenPath, setMobileMenuOpenPath] = useState<string | null>(null);
  const [servicesOpenPath, setServicesOpenPath] = useState<string | null>(null);
  const [langOpenPath, setLangOpenPath] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isMobileMenuOpen = mobileMenuOpenPath === pathname;
  const servicesOpen = servicesOpenPath === pathname;
  const langOpen = langOpenPath === pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!langOpen) {
        return;
      }

      const target = event.target as HTMLElement;
      if (!target.closest('[data-lang-switcher]')) {
        setLangOpenPath(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [langOpen]);

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

  const isActive = (href: string) => {
    if (href === "/") {
      return pathWithoutLocale === "/" || pathWithoutLocale === "";
    }
    return pathWithoutLocale.startsWith(href);
  };

  const isServicesActive = pathWithoutLocale.startsWith("/services");

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathWithoutLocale || "/", { locale: newLocale });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-[#2d2a45] bg-[#121022]/90 py-3 shadow-[0_20px_45px_rgba(5,4,14,0.55)] backdrop-blur-xl"
          : "border-[#201d35]/70 bg-[#121022]/75 py-4 backdrop-blur-md"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" locale={locale} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">VektaDev</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpenPath(pathname)}
              onMouseLeave={() => setServicesOpenPath(null)}
            >
              <button
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-semibold transition-colors",
                  isServicesActive ? "text-primary" : "text-[#e9e6ff] hover:text-primary"
                )}
              >
                {t("services")}
                <ChevronDown className="h-4 w-4" />
              </button>

              {servicesOpen ? (
                <div className="absolute left-0 top-full pt-3">
                  <div className="w-56 overflow-hidden rounded-xl border border-[#2d2a45] bg-[#1a182e]/95 shadow-2xl backdrop-blur">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        locale={locale}
                        className={cn(
                          "block px-4 py-3 text-sm font-medium transition-colors",
                          isActive(service.href)
                            ? "bg-primary text-white"
                            : "text-[#d3cefa] hover:bg-primary/20 hover:text-white"
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
              className={cn(
                "text-sm font-semibold transition-colors",
                isActive("/portfolio") ? "text-primary" : "text-[#e9e6ff] hover:text-primary"
              )}
            >
              {t("portfolio")}
            </Link>
            <Link
              href="/about"
              locale={locale}
              className={cn(
                "text-sm font-semibold transition-colors",
                isActive("/about") ? "text-primary" : "text-[#e9e6ff] hover:text-primary"
              )}
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              locale={locale}
              className={cn(
                "text-sm font-semibold transition-colors",
                isActive("/contact") ? "text-primary" : "text-[#e9e6ff] hover:text-primary"
              )}
            >
              {t("contact")}
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button asChild className="neon-glow h-10 px-5 text-sm">
              <Link href="/contact" locale={locale}>{t("consultation")}</Link>
            </Button>

            <div className="relative" data-lang-switcher>
              <button
                onClick={() => setLangOpenPath((current) => (current === pathname ? null : pathname))}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold tracking-wider transition-all",
                  langOpen
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-[#3a3656] text-[#d3cefa] hover:border-primary/60 hover:text-primary"
                )}
              >
                {localeLabels[locale]}
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", langOpen && "rotate-180")} />
              </button>

              {langOpen ? (
                <div className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#2d2a45] bg-[#1a182e] shadow-xl">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        switchLocale(loc);
                        setLangOpenPath(null);
                      }}
                      className={cn(
                        "block w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors",
                        locale === loc
                          ? "bg-primary text-white"
                          : "text-[#d3cefa] hover:bg-primary/20 hover:text-white"
                      )}
                    >
                      {localeLabels[loc]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <button
            className="lg:hidden rounded-lg p-2 text-[#e9e6ff] hover:bg-[#1f1d35]"
            onClick={() => setMobileMenuOpenPath((current) => (current === pathname ? null : pathname))}
            aria-label="Toggle menu"
          >
            <div className="relative h-6 w-6">
              <Menu
                className={cn(
                  "absolute inset-0 h-6 w-6 transition-all duration-300",
                  isMobileMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 h-6 w-6 transition-all duration-300",
                  isMobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                )}
              />
            </div>
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          className={cn(
            "overflow-hidden transition-all duration-500 lg:hidden",
            isMobileMenuOpen ? "mt-4 max-h-[720px] opacity-100" : "mt-0 max-h-0 opacity-0"
          )}
        >
          <nav className="rounded-2xl border border-[#2d2a45] bg-[#181629] p-4">
            <div className="mb-4 flex gap-2 border-b border-[#2d2a45] pb-4">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => switchLocale(loc)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-colors",
                    locale === loc ? "bg-primary text-white" : "bg-[#242039] text-[#d3cefa]"
                  )}
                >
                  {localeLabels[loc]}
                </button>
              ))}
            </div>

            <div className="border-b border-[#2d2a45] pb-2">
              <button
                className={cn(
                  "flex w-full items-center justify-between py-3 text-left text-sm font-semibold",
                  isServicesActive ? "text-primary" : "text-[#ece9ff]"
                )}
                onClick={() => setServicesOpenPath((current) => (current === pathname ? null : pathname))}
              >
                {t("services")}
                <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  servicesOpen ? "max-h-[280px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="space-y-1 pb-2 pl-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      locale={locale}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive(service.href)
                          ? "bg-primary/20 text-primary"
                          : "text-[#d3cefa] hover:bg-[#232038]"
                      )}
                      onClick={() => setMobileMenuOpenPath(null)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1 py-3">
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
                    "block rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                    isActive(item.href)
                      ? "bg-primary/20 text-primary"
                      : "text-[#ece9ff] hover:bg-[#232038]"
                  )}
                  onClick={() => setMobileMenuOpenPath(null)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Button className="mt-3 w-full" asChild>
              <Link href="/contact" locale={locale} onClick={() => setMobileMenuOpenPath(null)}>
                {t("consultation")}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
