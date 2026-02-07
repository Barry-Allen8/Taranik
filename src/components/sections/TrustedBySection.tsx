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
    <section className="border-y border-primary/15 bg-black py-10">
      <div className="container">
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#636363]">
          {"// "}
          {t("title")}
        </p>

        <div className="relative overflow-hidden">
          <div className="animate-scroll flex">
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="mx-3 flex-shrink-0">
                <div className="flex h-12 w-24 items-center justify-center border border-[#1a1a1a] bg-[#050505] text-sm font-black text-[#555555] transition-colors hover:border-primary/50 hover:text-primary">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />
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
          animation: scroll 18s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
