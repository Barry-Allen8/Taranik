"use client";

import Card from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function PrivacyPageClient() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen">
      <section className="section border-b border-primary/15 bg-black">
        <div className="container">
          <div className="max-w-4xl">
            <span className="mb-4 inline-block border border-primary/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              {"// DATA_PROTOCOLS"}
            </span>
            <h1 className="mb-4 text-5xl font-black text-white md:text-6xl">{t("title")}</h1>
            <p className="text-xs uppercase tracking-[0.14em] text-[#666666]">{t("last_updated")}</p>
          </div>
        </div>
      </section>

      <section className="section bg-[#050505]">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Card className="sharp-card border-[#171717] bg-black p-8 md:p-10">
              <div className="space-y-8 text-xs uppercase tracking-[0.1em] text-[#707070]">
                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("intro.title")}</h2>
                  <p>{t("intro.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("controller.title")}</h2>
                  <p className="mb-3">{t("controller.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("controller.details") as string[]).map((item) => (
                      <li key={item}><span className="mr-2 text-primary">&gt;&gt;</span>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("collection.title")}</h2>
                  <p className="mb-3">{t("collection.text")}</p>
                  <ul className="space-y-2 mb-3">
                    {(t.raw("collection.items") as string[]).map((item) => (
                      <li key={item}><span className="mr-2 text-primary">&gt;&gt;</span>{item}</li>
                    ))}
                  </ul>
                  <h3 className="mb-2 text-base font-black text-primary">{t("collection.automatic_title")}</h3>
                  <p>{t("collection.automatic_text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("purpose.title")}</h2>
                  <p className="mb-3">{t("purpose.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("purpose.items") as string[]).map((item) => (
                      <li key={item}><span className="mr-2 text-primary">&gt;&gt;</span>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("legal_basis.title")}</h2>
                  <p className="mb-3">{t("legal_basis.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("legal_basis.items") as string[]).map((item) => (
                      <li key={item}><span className="mr-2 text-primary">&gt;&gt;</span>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("third_parties.title")}</h2>
                  <p className="mb-3">{t("third_parties.text")}</p>
                  <ul className="space-y-2 mb-3">
                    {(t.raw("third_parties.items") as string[]).map((item) => (
                      <li key={item}><span className="mr-2 text-primary">&gt;&gt;</span>{item}</li>
                    ))}
                  </ul>
                  <p className="text-[#8f8f8f]">{t("third_parties.note")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("cookies.title")}</h2>
                  <p>{t("cookies.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("retention.title")}</h2>
                  <p>{t("retention.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("rights.title")}</h2>
                  <p className="mb-3">{t("rights.text")}</p>
                  <ul className="space-y-2 mb-3">
                    {(t.raw("rights.items") as string[]).map((item) => (
                      <li key={item}><span className="mr-2 text-primary">&gt;&gt;</span>{item}</li>
                    ))}
                  </ul>
                  <p className="text-primary">{t("rights.exercise")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("security.title")}</h2>
                  <p>{t("security.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("changes.title")}</h2>
                  <p>{t("changes.text")}</p>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("contact.title")}</h2>
                  <p className="mb-3">{t("contact.text")}</p>
                  <ul className="space-y-2">
                    {(t.raw("contact.details") as string[]).map((item) => (
                      <li key={item}><span className="mr-2 text-primary">&gt;&gt;</span>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="mb-3 text-xl font-black text-white">{t("complaints.title")}</h2>
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
