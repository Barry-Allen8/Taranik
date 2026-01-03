import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Brain, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-рішення - Taranik IT",
  description: "Впровадження штучного інтелекту в бізнес. ChatGPT, Claude, автоматизація процесів",
};

export default function AISolutionsPage() {
  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-accent/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Brain className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-рішення</h1>
            <p className="text-xl text-muted mb-8">
              Впроваджуємо штучний інтелект для оптимізації ваших бізнес-процесів
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Консультація</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Наші AI-рішення
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "ChatGPT інтеграція",
                description: "Впровадження ChatGPT у ваші продукти та процеси",
                features: ["Автоматизація відповідей", "Генерація контенту", "Аналіз даних"],
              },
              {
                title: "AI-асистенти",
                description: "Персональні AI-помічники для вашого бізнесу",
                features: ["Обробка запитів", "Рекомендаційні системи", "Чат-боти з AI"],
              },
              {
                title: "Автоматизація процесів",
                description: "Оптимізація рутинних завдань за допомогою AI",
                features: ["Обробка документів", "Класифікація даних", "Прогнозування"],
              },
              {
                title: "Аналітика даних",
                description: "Глибокий аналіз даних з використанням AI",
                features: ["Аналіз трендів", "Сегментація", "Прогнози"],
              },
            ].map((solution, idx) => (
              <Card key={idx}>
                <Sparkles className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-muted mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-accent">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
