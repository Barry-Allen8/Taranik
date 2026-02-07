"use client";

import { usePathname } from "next/navigation";
import CookieBanner from "@/components/ui/CookieBanner";
import { locales } from "@/i18n";

/**
 * Client-side layout wrapper.
 * Renders client-only components like CookieBanner that require
 * browser APIs (localStorage, etc.) and should not be server-rendered.
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const pathSegments = normalizedPath.split("/").filter(Boolean);
  const isLocaleHome = pathSegments.length === 1
    && locales.some((locale) => locale === pathSegments[0]);
  const isHomePage = normalizedPath === "/" || isLocaleHome;

  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      {!isHomePage ? (
        <div aria-hidden="true" className="page-ambient-bg">
          <div className="blob-1" />
          <div className="blob-2" />
          <div className="blob-3" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>
      ) : null}
      {children}
      <CookieBanner />
    </div>
  );
}
