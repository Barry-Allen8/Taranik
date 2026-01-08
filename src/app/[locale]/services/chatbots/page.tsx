import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import ChatbotsPageClient from "./ChatbotsPageClient";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: t("chatbots.metadata.title"),
    description: t("chatbots.metadata.description"),
    keywords: t("chatbots.metadata.keywords"),
    openGraph: {
      title: t("chatbots.metadata.title"),
      description: t("chatbots.metadata.description"),
      type: "website",
    },
  };
}

export default function ChatbotsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <ChatbotsPageClient />;
}
