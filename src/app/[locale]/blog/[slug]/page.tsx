import { redirect } from "next/navigation";

// Blog is temporarily disabled - content not yet localized
// Redirecting to home page to prevent broken UX

export default function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  redirect(`/${params.locale}`);
}
