"use client";

import { useTranslations } from "next-intl";

const partners = ["HubSpot", "Stripe", "Amazon", "Airbnb", "Figma", "GitHub"];

export default function TrustedBySection() {
  const t = useTranslations("trusted");

  return (
    <section className="border-y border-slate-700/40 bg-[#040d20]/60 py-10">
      <div className="container">
        <p className="mb-6 text-center text-sm font-medium text-slate-400">{t("title")}</p>

        <div className="relative overflow-hidden">
          <div className="animate-scroll flex">
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner}-${index}`} className="mx-4 flex-shrink-0">
                <div className="flex h-12 min-w-32 items-center justify-center rounded-xl border border-slate-700/45 bg-slate-900/45 px-5 text-sm font-semibold text-slate-300 transition-colors hover:border-primary/45 hover:text-primary">
                  {partner}
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030b1f] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030b1f] to-transparent" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
