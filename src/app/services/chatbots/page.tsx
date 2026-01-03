import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Bot, MessageCircle, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Чат-боти - Taranik IT",
  description: "Розробка чат-ботів для Telegram, Viber, WhatsApp. Автоматизація комунікації з клієнтами",
};

export default function ChatbotsPage() {
  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Bot className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Чат-боти</h1>
            <p className="text-xl text-muted mb-8">
              Автоматизуйте комунікацію з клієнтами за допомогою розумних ботів
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Замовити бота</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Платформи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Telegram боти",
                description: "Найпопулярніша платформа для бізнес-ботів в Україні",
                features: ["Приймання замовлень", "Консультації", "Розсилки", "Інтеграція з CRM"],
              },
              {
                icon: MessageCircle,
                title: "Viber/WhatsApp",
                description: "Боти для популярних месенджерів",
                features: ["Підтримка клієнтів", "Повідомлення", "Автовідповіді", "Аналітика"],
              },
              {
                icon: Zap,
                title: "Веб-чати",
                description: "Чат-боти для вашого сайту",
                features: ["24/7 підтримка", "Збір контактів", "FAQ", "Інтеграції"],
              },
            ].map((platform, idx) => (
              <Card key={idx}>
                <platform.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{platform.title}</h3>
                <p className="text-muted mb-4">{platform.description}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary">✓</span>
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
