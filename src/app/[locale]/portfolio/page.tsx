import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default function PortfolioPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  redirect(`/${locale}/about`);
}
