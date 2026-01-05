"use client";

import Card from "@/components/ui/Card";
import { Link } from "@/i18n/navigation";
import { Calendar, User } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const blogPostKeys = ["ai_trends", "chatbot_automation", "web_development"];

export default function BlogPage() {
  const t = useTranslations("blog");
  const tPosts = useTranslations("blog_posts");
  const locale = useLocale();

  const getDateLocale = () => {
    switch (locale) {
      case "pl": return "pl-PL";
      case "en": return "en-US";
      case "uk": return "uk-UA";
      default: return "pl-PL";
    }
  };

  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("title")}</h1>
            <p className="text-xl text-muted">{t("description")}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {blogPostKeys.map((postKey) => (
              <Link key={postKey} href={`/blog/${postKey}`}>
                <Card className="cursor-pointer hover:shadow-xl transition-shadow">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                    {tPosts(`${postKey}.category`)}
                  </div>
                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    {tPosts(`${postKey}.title`)}
                  </h2>
                  <p className="text-muted mb-4">{tPosts(`${postKey}.excerpt`)}</p>
                  <div className="flex items-center gap-6 text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{tPosts(`${postKey}.author`)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(tPosts(`${postKey}.date`)).toLocaleDateString(getDateLocale())}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
