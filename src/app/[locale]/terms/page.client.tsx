"use client";

import Card from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function TermsPageClient() {
  const t = useTranslations("terms");

  return (
    <div className="min-h-screen">
      <section className="section border-b border-slate-700/45">
        <div className="container">
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              Terms of Use
            </span>
            <h1 className="mb-4 text-5xl text-slate-100 md:text-6xl">{t("title")}</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Card className="border-slate-700/45 bg-slate-900/45 p-8 md:p-10">
              <div className="space-y-8 text-sm leading-relaxed text-slate-300">
                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("acceptance")}</h2>
                  <p>{t("acceptance_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("services_section")}</h2>
                  <p>{t("services_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("ip")}</h2>
                  <p>{t("ip_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("liability")}</h2>
                  <p>{t("liability_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("changes")}</h2>
                  <p>{t("changes_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("contact_title")}</h2>
                  <p>{t("contact_text")}</p>
                </section>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
