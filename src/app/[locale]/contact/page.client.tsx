"use client";

import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock, TerminalSquare } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPageClient() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const phoneNumbers = (t.raw("phones") as string[] | undefined) || [];
  const emailAddress = t("email_address");

  const buildTelHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <div className="min-h-screen">
      <section className="section border-b border-primary/20 bg-black">
        <div className="container">
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex border border-primary/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
              Establishing Secure Connection...
            </div>
            <h1 className="glitch-text mb-4 text-5xl font-black text-white md:text-7xl">
              CONNECT_<span className="text-primary">TERMINAL</span>
            </h1>
            <p className="max-w-3xl text-xs uppercase tracking-[0.14em] text-[#636363]">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-black">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="cyber-panel p-6 md:p-8">
                <div className="mb-8 flex items-center justify-between border-b border-[#171717] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-600" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                    <span className="ml-3 text-[10px] uppercase tracking-[0.22em] text-[#545454]">COMMS_INTERFACE</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-primary">ID: 0xFD-992-K8</span>
                </div>

                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="cyber-panel h-full border-primary/25 p-6">
                <div className="mb-6 flex items-center justify-between border-b border-[#171717] pb-4">
                  <h2 className="text-sm font-black tracking-[0.18em] text-white">SYSTEM_LOG</h2>
                  <TerminalSquare className="h-4 w-4 text-primary" />
                </div>

                <div className="space-y-5 text-xs uppercase tracking-[0.11em]">
                  <div className="flex items-start gap-3 text-[#787878]">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <p className="mb-1 text-[10px] tracking-[0.18em] text-primary">{t("address")}</p>
                      <p>{tFooter("address")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[#787878]">
                    <Phone className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <p className="mb-1 text-[10px] tracking-[0.18em] text-primary">{t("phone")}</p>
                      {phoneNumbers.map((phone) => (
                        <a key={phone} href={buildTelHref(phone)} className="block hover:text-primary">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[#787878]">
                    <Mail className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <p className="mb-1 text-[10px] tracking-[0.18em] text-primary">{t("email")}</p>
                      <a href={`mailto:${emailAddress}`} className="hover:text-primary">{emailAddress}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-[#787878]">
                    <Clock className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <p className="mb-1 text-[10px] tracking-[0.18em] text-primary">{t("hours")}</p>
                      <p>{tFooter("working_hours")}</p>
                      <p>{tFooter("weekend")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
