"use client";

import { useTranslations } from "next-intl";

const partners = [
  { name: "Microsoft", logo: "M" },
  { name: "Google", logo: "G" },
  { name: "AWS", logo: "AWS" },
  { name: "Vercel", logo: "▲" },
  { name: "Stripe", logo: "S" },
  { name: "OpenAI", logo: "◐" },
];

export default function TrustedBySection() {
  const t = useTranslations("trusted");

  return (
    <section className="border-y border-[#25213c] bg-[#0f0e1d] py-12">
      <div className="container">
        <p className="mb-8 text-center text-xs font-extrabold uppercase tracking-[0.14em] text-[#9f98c9]">
          {t("title")}
        </p>

        <div className="relative overflow-hidden">
          <div className="animate-scroll flex">
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="mx-4 flex-shrink-0">
                <div className="flex h-14 w-28 items-center justify-center rounded-xl border border-[#2f2b48] bg-[#17152a] text-lg font-extrabold text-[#8d86b3] transition-colors hover:border-primary/40 hover:text-primary">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0f0e1d] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0f0e1d] to-transparent" />
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
