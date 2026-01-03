import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT-консалтинг - Taranik IT",
  description: "Професійна IT-консультація, аудит інфраструктури, цифрова трансформація",
};

export default function ConsultingPage() {
  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 text-secondary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              IT-консалтинг
            </h1>
            <p className="text-xl text-muted mb-8">
              Професійна консультація з питань цифрової трансформації та розвитку бізнесу
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Отримати консультацію</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Напрямки консалтингу
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Аудит IT-інфраструктури",
                description: "Комплексний аналіз вашої IT-системи",
                items: ["Оцінка безпеки", "Продуктивність", "Витрати", "Рекомендації"],
              },
              {
                title: "Цифрова трансформація",
                description: "Стратегія переходу на цифрові технології",
                items: ["Аналіз процесів", "План впровадження", "Вибір рішень", "Підтримка"],
              },
              {
                title: "Вибір технологій",
                description: "Допомога у виборі оптимальних технологій",
                items: ["Аналіз потреб", "Огляд ринку", "Порівняння", "Рекомендації"],
              },
              {
                title: "Оптимізація процесів",
                description: "Підвищення ефективності бізнес-процесів",
                items: ["Аналіз workflow", "Автоматизація", "Інтеграції", "Навчання"],
              },
            ].map((service, idx) => (
              <Card key={idx}>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-secondary">✓</span>
                      <span>{item}</span>
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
