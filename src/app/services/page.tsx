import { services } from "@/data/services";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Globe, Bot, Brain, Smartphone, Cloud, Lightbulb } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наші послуги - IT-service",
  description: "Розробка сайтів, чат-ботів, AI-рішень, мобільних додатків та IT-консалтинг",
};

const iconMap: Record<string, any> = {
  globe: Globe,
  bot: Bot,
  brain: Brain,
  smartphone: Smartphone,
  cloud: Cloud,
  lightbulb: Lightbulb,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Наші послуги</h1>
            <p className="text-xl text-muted">
              Комплексні IT-рішення для успішного розвитку вашого бізнесу
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card key={service.id} className="h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted mb-4">{service.description}</p>
                  {service.features && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button className="w-full mt-auto" asChild>
                    <Link href={service.href}>Дізнатись більше</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
