"use client";

import Card from "@/components/ui/Card";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-muted">{t("last_updated")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="prose prose-lg max-w-none">
              {/* 1. Introduction */}
              <h2>{t("intro.title")}</h2>
              <p>{t("intro.text")}</p>

              {/* 2. Data Controller */}
              <h2>{t("controller.title")}</h2>
              <p>{t("controller.text")}</p>
              <ul>
                {(t.raw("controller.details") as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* 3. Data We Collect */}
              <h2>{t("collection.title")}</h2>
              <p>{t("collection.text")}</p>
              <ul>
                {(t.raw("collection.items") as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <h3>{t("collection.automatic_title")}</h3>
              <p>{t("collection.automatic_text")}</p>

              {/* 4. How We Use Your Data */}
              <h2>{t("purpose.title")}</h2>
              <p>{t("purpose.text")}</p>
              <ul>
                {(t.raw("purpose.items") as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* 5. Legal Basis */}
              <h2>{t("legal_basis.title")}</h2>
              <p>{t("legal_basis.text")}</p>
              <ul>
                {(t.raw("legal_basis.items") as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* 6. Third-Party Services */}
              <h2>{t("third_parties.title")}</h2>
              <p>{t("third_parties.text")}</p>
              <ul>
                {(t.raw("third_parties.items") as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-sm text-muted italic">{t("third_parties.note")}</p>

              {/* 7. Cookies */}
              <h2>{t("cookies.title")}</h2>
              <p>{t("cookies.text")}</p>

              {/* 8. Data Retention */}
              <h2>{t("retention.title")}</h2>
              <p>{t("retention.text")}</p>

              {/* 9. Your Rights Under GDPR */}
              <h2>{t("rights.title")}</h2>
              <p>{t("rights.text")}</p>
              <ul>
                {(t.raw("rights.items") as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="font-medium">{t("rights.exercise")}</p>

              {/* 10. Data Security */}
              <h2>{t("security.title")}</h2>
              <p>{t("security.text")}</p>

              {/* 11. Changes */}
              <h2>{t("changes.title")}</h2>
              <p>{t("changes.text")}</p>

              {/* 12. Contact */}
              <h2>{t("contact.title")}</h2>
              <p>{t("contact.text")}</p>
              <ul>
                {(t.raw("contact.details") as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              {/* 13. Complaints */}
              <h2>{t("complaints.title")}</h2>
              <p>{t("complaints.text")}</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
