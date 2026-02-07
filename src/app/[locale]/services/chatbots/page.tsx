import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { getSeoAlternates } from "@/lib/seo";
import { getServiceSchema } from "@/lib/schema";
import ChatbotsPageClient from "./ChatbotsPageClient";

const ROUTE = "/services/chatbots";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("chatbots.metadata.title"),
    description: t("chatbots.metadata.description"),
    keywords: t("chatbots.metadata.keywords"),
    alternates: getSeoAlternates(locale, ROUTE),
    openGraph: {
      title: t("chatbots.metadata.title"),
      description: t("chatbots.metadata.description"),
      type: "website",
    },
  };
}

export default async function ChatbotsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const schema = getServiceSchema({
    locale,
    name: t("chatbots.title"),
    description: t("chatbots.description"),
    path: ROUTE,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ChatbotsPageClient />
    </>
  );
}
