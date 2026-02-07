"use client";

import Button from "@/components/ui/Button";
import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-[2rem] border border-red-500/45 bg-[#081228]/88 p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">System Error</p>
        <div className="mb-6 text-7xl font-bold text-red-300">ERR</div>
        <h1 className="mb-4 text-3xl text-slate-100 md:text-4xl">{t("title")}</h1>
        <p className="mb-8 text-base text-slate-400">{t("description")}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            {t("try_again")}
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              {t("go_home")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
