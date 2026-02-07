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
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-3xl border border-red-500/35 bg-[#050505] p-8 text-center">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-red-400">{"// system_fault"}</p>
        <div className="mb-6 text-7xl font-black text-red-400">ERR</div>
        <h1 className="mb-4 text-3xl font-black text-white md:text-4xl">{t("title")}</h1>
        <p className="mb-8 text-xs uppercase tracking-[0.12em] text-[#6a6a6a]">{t("description")}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={reset}>
            <RefreshCw className="h-4 w-4" />
            {t("try_again")}
          </Button>
          <Button variant="outline" asChild>
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
