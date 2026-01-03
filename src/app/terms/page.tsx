import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Умови використання - Taranik IT",
  description: "Умови використання сайту та послуг",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Умови використання
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2>1. Прийняття умов</h2>
            <p>
              Використовуючи цей сайт, ви погоджуєтеся з умовами використання.
            </p>

            <h2>2. Послуги</h2>
            <p>
              Taranik IT надає послуги з розробки сайтів, чат-ботів, AI-рішень та IT-консалтингу
              відповідно до умов договору з клієнтом.
            </p>

            <h2>3. Інтелектуальна власність</h2>
            <p>
              Всі матеріали на сайті захищені авторським правом. Використання матеріалів
              без дозволу заборонено.
            </p>

            <h2>4. Обмеження відповідальності</h2>
            <p>
              Компанія не несе відповідальності за непрямі збитки, що виникли внаслідок
              використання наших послуг.
            </p>

            <h2>5. Зміни умов</h2>
            <p>
              Ми залишаємо за собою право змінювати ці умови в будь-який час.
            </p>

            <h2>6. Контакти</h2>
            <p>
              З питань умов використання звертайтеся: info@taranik.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
