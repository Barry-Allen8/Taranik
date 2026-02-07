import Link from "next/link";
import { defaultLocale } from "@/i18n";

export default function RootNotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="antialiased">
        <div className="flex min-h-screen items-center justify-center px-4 text-white">
          <div className="w-full max-w-3xl rounded-[2rem] border border-slate-700/55 bg-[#081228]/88 p-8 text-center shadow-2xl shadow-black/35 backdrop-blur-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">404</p>
            <div className="mb-6 text-8xl font-bold md:text-9xl">404</div>
            <h1 className="mb-4 text-3xl font-semibold md:text-4xl">Page Not Found</h1>
            <p className="mb-8 text-base text-slate-400">
              Sorry, but the page you are looking for does not exist or has been moved.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/${defaultLocale}`}
                className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-sm font-semibold text-slate-950"
              >
                Home
              </Link>
              <Link
                href={`/${defaultLocale}/contact`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/45 px-6 py-3 text-sm font-semibold text-slate-100"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
