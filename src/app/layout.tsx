import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taranik IT - Професійні IT-рішення для вашого бізнесу",
  description: "Розробка сайтів, чат-ботів, AI-рішень та IT-консалтинг. Допомагаємо бізнесу рости з сучасними технологіями.",
  keywords: ["розробка сайтів", "чат-боти", "AI рішення", "IT консалтинг", "веб розробка", "Україна"],
  authors: [{ name: "Taranik IT" }],
  openGraph: {
    title: "Taranik IT - Професійні IT-рішення",
    description: "Розробка сайтів, чат-ботів, AI-рішень та IT-консалтинг",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
