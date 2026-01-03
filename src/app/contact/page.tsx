import ContactForm from "@/components/forms/ContactForm";
import Card from "@/components/ui/Card";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти - Taranik IT",
  description: "Зв'яжіться з нами для обговорення вашого проєкту",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Зв'яжіться з нами
            </h1>
            <p className="text-xl text-muted">
              Готові обговорити ваш проєкт? Залиште заявку, і ми зв'яжемося з вами найближчим часом
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Форма зворотного зв'язку</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Контактна інформація</h2>

              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Адреса</h3>
                    <p className="text-muted">
                      м. Київ, вул. Хрещатик, 1<br />
                      офіс 100, 01001
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Телефон</h3>
                    <a
                      href="tel:+380123456789"
                      className="text-muted hover:text-primary transition-colors"
                    >
                      +380 (12) 345-67-89
                    </a>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@taranik.com"
                      className="text-muted hover:text-primary transition-colors"
                    >
                      info@taranik.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Години роботи</h3>
                    <p className="text-muted">
                      Пн-Пт: 9:00 - 18:00<br />
                      Сб-Нд: Вихідні
                    </p>
                  </div>
                </div>
              </Card>

              {/* Map placeholder */}
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-muted">Карта (Google Maps)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
