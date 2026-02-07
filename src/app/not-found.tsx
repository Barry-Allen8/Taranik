import Link from "next/link";
import { defaultLocale } from "@/i18n";

export default function RootNotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="antialiased">
        <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
          <div className="w-full max-w-3xl border border-[#173120] bg-[#050505] p-8 text-center">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#39ff14]">{"// route_not_found"}</p>
            <div className="mb-6 text-8xl font-black md:text-9xl">404</div>
            <h1 className="mb-4 text-3xl font-black md:text-4xl">Page Not Found</h1>
            <p className="mb-8 text-xs uppercase tracking-[0.12em] text-[#707070]">
              Sorry, but the page you are looking for does not exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${defaultLocale}`}
                className="inline-flex items-center gap-2 border border-[#39ff14] bg-[#39ff14] px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-black"
              >
                Home
              </Link>
              <Link
                href={`/${defaultLocale}/contact`}
                className="inline-flex items-center gap-2 border border-[#39ff14]/60 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-[#39ff14]"
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
