import Card from "@/components/ui/Card";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог - IT-service",
  description: "Статті про IT, веб-розробку, AI та бізнес",
};

const posts = [
  {
    slug: "ai-in-business-2024",
    title: "AI у бізнесі: тренди 2024",
    excerpt: "Як штучний інтелект змінює бізнес-процеси та що варто знати підприємцям",
    category: "AI",
    author: "Андрій Коваленко",
    date: "2024-01-15",
  },
  {
    slug: "chatbot-automation",
    title: "Автоматизація бізнесу за допомогою чат-ботів",
    excerpt: "Практичні поради щодо впровадження чат-ботів у ваш бізнес",
    category: "Chatbots",
    author: "Марія Петренко",
    date: "2024-01-10",
  },
  {
    slug: "web-development-trends",
    title: "Тренди веб-розробки у 2024",
    excerpt: "Що нового у світі веб-розробки та які технології варто вивчати",
    category: "Web Development",
    author: "Андрій Коваленко",
    date: "2024-01-05",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Блог</h1>
            <p className="text-xl text-muted">
              Корисні статті про IT, технології та бізнес
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="cursor-pointer hover:shadow-xl transition-shadow">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-3">
                    {post.category}
                  </div>

                  <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted mb-4">{post.excerpt}</p>

                  <div className="flex items-center gap-6 text-sm text-muted">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString("uk-UA")}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
