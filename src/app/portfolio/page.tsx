import Card from "@/components/ui/Card";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Портфоліо - Taranik IT",
  description: "Наші реалізовані проєкти та кейси",
};

const projects = [
  {
    title: "Інтернет-магазин електроніки",
    category: "E-commerce",
    description: "Повнофункціональний інтернет-магазин з інтеграцією платежів",
    technologies: ["Next.js", "Stripe", "PostgreSQL"],
    year: 2024,
  },
  {
    title: "Telegram бот для ресторану",
    category: "Chatbot",
    description: "Бот для приймання замовлень та резервації столиків",
    technologies: ["Python", "Telegram API", "AI"],
    year: 2024,
  },
  {
    title: "Корпоративний сайт",
    category: "Website",
    description: "Багатомовний сайт для міжнародної компанії",
    technologies: ["Next.js", "Tailwind", "CMS"],
    year: 2023,
  },
  {
    title: "AI-асистент для продажів",
    category: "AI Solution",
    description: "Розумний асистент для обробки запитів клієнтів",
    technologies: ["ChatGPT API", "Node.js", "React"],
    year: 2024,
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Портфоліо</h1>
            <p className="text-xl text-muted">
              Ознайомтеся з нашими реалізованими проєктами
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <Card key={idx} className="group cursor-pointer">
                <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ExternalLink className="w-12 h-12 text-primary" />
                </div>

                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                  {project.category}
                </div>

                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-card text-sm rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="text-sm text-muted">{project.year}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
