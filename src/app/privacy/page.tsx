import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності - IT-service",
  description: "Політика конфіденційності та обробки персональних даних",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Політика конфіденційності
          </h1>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2>1. Загальні положення</h2>
            <p>
              Ця Політика конфіденційності визначає порядок обробки та захисту персональних даних
              користувачів сайту IT-service.
            </p>

            <h2>2. Збір інформації</h2>
            <p>
              Ми збираємо наступну інформацію:
            </p>
            <ul>
              <li>Ім'я та прізвище</li>
              <li>Контактна інформація (email, телефон)</li>
              <li>Інформація про звернення та запити</li>
            </ul>

            <h2>3. Використання інформації</h2>
            <p>
              Зібрана інформація використовується для:
            </p>
            <ul>
              <li>Надання наших послуг</li>
              <li>Зв'язку з клієнтами</li>
              <li>Поліпшення якості обслуговування</li>
            </ul>

            <h2>4. Захист даних</h2>
            <p>
              Ми вживаємо всіх необхідних заходів для захисту персональних даних від
              несанкціонованого доступу, зміни або розголошення.
            </p>

            <h2>5. Контакти</h2>
            <p>
              З питань політики конфіденційності звертайтеся: info@taranik.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
