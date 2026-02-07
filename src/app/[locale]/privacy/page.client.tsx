"use client";

import Card from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function PrivacyPageClient() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen">
      <section className="section border-b border-slate-700/45">
        <div className="container">
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              Privacy
            </span>
            <h1 className="mb-4 text-5xl text-slate-100 md:text-6xl">{t("title")}</h1>
            <p className="text-sm text-slate-400">{t("last_updated")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Card className="border-slate-700/45 bg-slate-900/45 p-8 md:p-10">
              <div className="space-y-8 text-sm leading-relaxed text-slate-300">
                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("intro.title")}</h2>
                  <p>{t("intro.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("controller.title")}</h2>
                  <p className="mb-3">{t("controller.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("controller.details") as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("collection.title")}</h2>
                  <p className="mb-3">{t("collection.text")}</p>
                  <ul className="mb-3 space-y-2">
                    {(t.raw("collection.items") as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="mb-2 text-lg text-primary">{t("collection.automatic_title")}</h3>
                  <p>{t("collection.automatic_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("purpose.title")}</h2>
                  <p className="mb-3">{t("purpose.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("purpose.items") as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("legal_basis.title")}</h2>
                  <p className="mb-3">{t("legal_basis.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("legal_basis.items") as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("third_parties.title")}</h2>
                  <p className="mb-3">{t("third_parties.text")}</p>
                  <ul className="mb-3 space-y-2">
                    {(t.raw("third_parties.items") as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-slate-400">{t("third_parties.note")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("cookies.title")}</h2>
                  <p>{t("cookies.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("retention.title")}</h2>
                  <p>{t("retention.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("rights.title")}</h2>
                  <p className="mb-3">{t("rights.text")}</p>
                  <ul className="mb-3 space-y-2">
                    {(t.raw("rights.items") as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-primary">{t("rights.exercise")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("security.title")}</h2>
                  <p>{t("security.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("changes.title")}</h2>
                  <p>{t("changes.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("contact.title")}</h2>
                  <p className="mb-3">{t("contact.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("contact.details") as string[]).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-2xl text-slate-100">{t("complaints.title")}</h2>
                  <p>{t("complaints.text")}</p>
                </section>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
