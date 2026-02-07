"use client";

import { usePathname } from "next/navigation";
import CookieBanner from "@/components/ui/CookieBanner";
import { locales } from "@/i18n";
import { cn } from "@/lib/utils";

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
      <div aria-hidden="true" className={cn("page-ambient-bg", isHomePage && "opacity-80")} />
      {children}
      <CookieBanner />
    </div>
  );
}
