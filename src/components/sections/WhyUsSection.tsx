"use client";

import Card from "@/components/ui/Card";
import { Award, Users, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Award,
    title: "Професіоналізм",
    description: "Команда досвідчених спеціалістів з понад 5-річним досвідом",
  },
  {
    icon: Zap,
    title: "Швидкість",
    description: "Дотримуємося термінів та забезпечуємо швидкий старт проєктів",
  },
  {
    icon: Shield,
    title: "Надійність",
    description: "Гарантуємо якість, безпеку та підтримку після запуску",
  },
  {
    icon: Users,
    title: "Індивідуальний підхід",
    description: "Розуміємо потреби кожного клієнта та пропонуємо оптимальні рішення",
  },
];

export default function WhyUsSection() {
  return (
    <section className="section bg-card">
      <div className="container">
        <div className="section-title">
          <h2>Чому обирають нас</h2>
          <p>
            Ми поєднуємо експертизу, сучасні технології та клієнтоорієнтований підхід
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center h-full bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
