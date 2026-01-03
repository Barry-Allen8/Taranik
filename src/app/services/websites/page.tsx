import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Check, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Розробка сайтів - Taranik IT",
  description: "Професійна розробка сайтів: лендінги, корпоративні сайти, інтернет-магазини",
};

const packages = [
  {
    name: "Лендінг",
    price: "від 15 000",
    features: [
      "До 5 секцій",
      "Адаптивний дизайн",
      "Форма зворотного зв'язку",
      "SEO оптимізація",
      "Швидке завантаження",
    ],
  },
  {
    name: "Корпоративний сайт",
    price: "від 30 000",
    features: [
      "До 15 сторінок",
      "Унікальний дизайн",
      "Система управління",
      "Багатомовність",
      "Інтеграції",
      "Підтримка 3 місяці",
    ],
    recommended: true,
  },
  {
    name: "Інтернет-магазин",
    price: "від 50 000",
    features: [
      "Каталог товарів",
      "Кошик та оплата",
      "Система замовлень",
      "Інтеграція з CRM",
      "Аналітика",
      "Підтримка 6 місяців",
    ],
  },
];

export default function WebsitesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Розробка сайтів
            </h1>
            <p className="text-xl text-muted mb-8">
              Створюємо сучасні, швидкі та зручні сайти, які допомагають бізнесу рости
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Замовити сайт</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Що ви отримуєте
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Сучасний дизайн",
                description: "Унікальний дизайн, що відображає вашу індивідуальність",
              },
              {
                title: "Швидка робота",
                description: "Оптимізація для максимальної швидкості завантаження",
              },
              {
                title: "Адаптивність",
                description: "Ідеальний вигляд на всіх пристроях та екранах",
              },
              {
                title: "SEO оптимізація",
                description: "Налаштування для високих позицій у пошуку",
              },
              {
                title: "Безпека",
                description: "Захист від хакерських атак та втрати даних",
              },
              {
                title: "Підтримка",
                description: "Технічна підтримка після запуску проєкту",
              },
            ].map((benefit, idx) => (
              <Card key={idx}>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted text-sm">{benefit.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Пакети послуг
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <Card
                key={idx}
                className={`relative ${
                  pkg.recommended ? "border-2 border-primary shadow-xl" : ""
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Популярний
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-primary mb-6">
                  {pkg.price} ₴
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={pkg.recommended ? "primary" : "outline"}
                  asChild
                >
                  <Link href="/contact">Замовити</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
