import Link from "next/link";
import { defaultLocale } from "@/i18n";

// This is the root not-found page for requests outside locale routing.
// It provides a basic fallback in English and redirects to the default locale.
export default function RootNotFound() {
  return (
    <html lang={defaultLocale}>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 bg-clip-text text-transparent mb-8">
              404
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Page Not Found
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Sorry, but the page you are looking for does not exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/${defaultLocale}`}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
              >
                🏠 Home
              </Link>
              <Link
                href={`/${defaultLocale}/contact`}
                className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors inline-flex items-center gap-2"
              >
                ✉️ Contact us
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
