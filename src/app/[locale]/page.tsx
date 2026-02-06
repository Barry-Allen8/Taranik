import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import { getSeoAlternates } from "@/lib/seo";
import LatestReviewsSection from "@/components/sections/LatestReviewsSection";

const TrustedBySection = dynamic(
  () => import("@/components/sections/TrustedBySection"),
  {
    loading: () => <section className="py-12" />,
  }
);

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  {
    loading: () => <section id="services" className="section" />,
  }
);

const WhyUsSection = dynamic(
  () => import("@/components/sections/WhyUsSection"),
  {
    loading: () => <section className="section bg-card" />,
  }
);

const CaseStudiesSection = dynamic(
  () => import("@/components/sections/CaseStudiesSection"),
  {
    loading: () => <section className="section" />,
  }
);

const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
  {
    loading: () => <section className="section" />,
  }
);

const CTASection = dynamic(
  () => import("@/components/sections/CTASection"),
  {
    loading: () => <section className="section" />,
  }
);

const ROUTE = "/";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations("seo");
  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: getSeoAlternates(locale, ROUTE),
    keywords: [
      "software house Poland",
      "web development",
      "AI automation",
      "chatbot development",
      "digital transformation services",
    ],
  };
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustedBySection />
      <ServicesSection />
      <WhyUsSection />
      <LatestReviewsSection locale={locale} />
      <CaseStudiesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
