"use client";

import Card from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function TermsPageClient() {
  const t = useTranslations("terms");

  return (
    <div className="min-h-screen">
      <section className="section border-b border-primary/15 bg-black">
        <div className="container">
          <div className="max-w-4xl">
            <span className="mb-4 inline-block border border-primary/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              {"// LEGAL_FRAMEWORK"}
            </span>
            <h1 className="mb-4 text-5xl font-black text-white md:text-6xl">{t("title")}</h1>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Card className="sharp-card border-[#171717] bg-black p-8 md:p-10">
              <div className="space-y-8 text-xs uppercase tracking-[0.1em] text-[#707070]">
                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("acceptance")}</h2>
                  <p>{t("acceptance_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("services_section")}</h2>
                  <p>{t("services_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("ip")}</h2>
                  <p>{t("ip_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("liability")}</h2>
                  <p>{t("liability_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("changes")}</h2>
                  <p>{t("changes_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("contact_title")}</h2>
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
