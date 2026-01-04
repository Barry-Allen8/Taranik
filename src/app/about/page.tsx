import Card from "@/components/ui/Card";
import { Target, Award, Users, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про нас - IT-service",
  description: "Дізнайтеся більше про нашу команду, місію та цінності",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Про нас</h1>
            <p className="text-xl text-muted">
              Ми - команда професіоналів, які створюють сучасні IT-рішення для успішного розвитку бізнесу
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Наша історія</h2>
            <div className="prose prose-lg mx-auto text-muted">
              <p>
                IT-service була заснована у 2020 році з метою надання якісних IT-послуг українському бізнесу.
                За цей час ми реалізували понад 150 проєктів у різних галузях - від невеликих стартапів до великих корпорацій.
              </p>
              <p>
                Наша команда складається з досвідчених розробників, дизайнерів та проєкт-менеджерів,
                які постійно вдосконалюють свої навички та слідкують за найновішими технологічними трендами.
              </p>
              <p>
                Ми віримо в силу технологій та їх здатність трансформувати бізнес, робити його ефективнішим,
                сучаснішим та конкурентоспроможнішим.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Наші цінності</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Фокус на результат",
                description: "Орієнтуємось на досягнення бізнес-цілей клієнтів",
              },
              {
                icon: Award,
                title: "Якість понад усе",
                description: "Дотримуємось найвищих стандартів у кожному проєкті",
              },
              {
                icon: Users,
                title: "Партнерство",
                description: "Будуємо довгострокові відносини з клієнтами",
              },
              {
                icon: TrendingUp,
                title: "Інновації",
                description: "Використовуємо найсучасніші технології та підходи",
              },
            ].map((value, idx) => (
              <Card key={idx} className="text-center bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5+", label: "Років на ринку" },
              { value: "150+", label: "Реалізованих проєктів" },
              { value: "98%", label: "Задоволених клієнтів" },
              { value: "15+", label: "Спеціалістів у команді" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
