"use client";

import ContactForm from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock, AtSign, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPageClient() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const phoneNumbers = (t.raw("phones") as string[] | undefined) || [];
  const emailAddress = t("email_address");

  const buildTelHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <div className="min-h-screen">
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Contact Us
              </span>
              <h1 className="mb-5 text-5xl text-slate-100 md:text-7xl">
                Let&apos;s build
                <br />
                <span className="text-slate-500">the future</span>
                <br />
                together.
              </h1>
              <p className="mb-10 max-w-md text-lg leading-relaxed text-slate-300">{t("description")}</p>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/55">
                    <AtSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">{t("email")}</h3>
                    <a href={`mailto:${emailAddress}`} className="text-sm text-slate-400 hover:text-primary">{emailAddress}</a>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/55">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">{t("address")}</h3>
                    <p className="text-sm text-slate-400">{tFooter("address")}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/55">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">{t("phone")}</h3>
                    <div className="flex flex-col gap-1">
                      {phoneNumbers.map((phone) => (
                        <a key={phone} href={buildTelHref(phone)} className="text-sm text-slate-400 hover:text-primary">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/55">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">{t("hours")}</h3>
                    <p className="text-sm text-slate-400">{tFooter("working_hours")}</p>
                    <p className="text-sm text-slate-400">{tFooter("weekend")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-slate-700/55 bg-[#081228]/86 p-6 shadow-2xl shadow-black/35 backdrop-blur-xl md:p-10">
                <div className="mb-6 flex items-center justify-between border-b border-slate-700/55 pb-4">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">{t("title")}</h2>
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
