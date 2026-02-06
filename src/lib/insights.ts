import { promises as fs } from "node:fs";
import path from "node:path";
import { defaultLocale, locales, type Locale } from "@/i18n";

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

type Frontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
};

export type InsightListItem = Frontmatter & {
  slug: string;
  locale: Locale;
};

export type InsightPost = InsightListItem & {
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyInlineMarkdown(input: string): string {
  let output = escapeHtml(input);

  output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline" target="_blank" rel="noopener noreferrer">$1</a>');
  output = output.replace(/`([^`]+)`/g, "<code class=\"rounded bg-slate-100 px-1.5 py-0.5 text-sm\">$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return output;
}

function mdxToHtml(mdx: string): string {
  const lines = mdx.split(/\r?\n/);
  const parts: string[] = [];

  let inList = false;
  let inCode = false;

  const closeList = () => {
    if (inList) {
      parts.push("</ul>");
      inList = false;
    }
  };

  const closeCode = () => {
    if (inCode) {
      parts.push("</code></pre>");
      inCode = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      closeList();

      if (!inCode) {
        parts.push("<pre class=\"overflow-x-auto rounded-xl bg-slate-950 p-4 text-slate-100\"><code>");
        inCode = true;
      } else {
        closeCode();
      }

      continue;
    }

    if (inCode) {
      parts.push(`${escapeHtml(line)}\n`);
      continue;
    }

    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      closeList();
      parts.push(`<h3 class=\"text-2xl font-semibold mt-8 mb-3\">${applyInlineMarkdown(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      closeList();
      parts.push(`<h2 class=\"text-3xl font-bold mt-10 mb-4\">${applyInlineMarkdown(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      closeList();
      parts.push(`<h1 class=\"text-4xl font-bold mt-2 mb-6\">${applyInlineMarkdown(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (!inList) {
        parts.push("<ul class=\"list-disc pl-6 space-y-2 my-4\">");
        inList = true;
      }

      parts.push(`<li>${applyInlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    closeList();
    parts.push(`<p class=\"text-base leading-8 text-slate-700 my-4\">${applyInlineMarkdown(trimmed)}</p>`);
  }

  closeList();
  closeCode();

  return parts.join("\n");
}

function parseFrontmatter(raw: string): { frontmatter: Frontmatter; body: string } {
  const lines = raw.split(/\r?\n/);

  if (lines[0] !== "---") {
    throw new Error("insight_missing_frontmatter");
  }

  const endIndex = lines.findIndex((line, index) => index > 0 && line === "---");
  if (endIndex === -1) {
    throw new Error("insight_invalid_frontmatter");
  }

  const frontmatterLines = lines.slice(1, endIndex);
  const body = lines.slice(endIndex + 1).join("\n").trim();

  const payload: Record<string, string> = {};
  for (const line of frontmatterLines) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    payload[key] = value;
  }

  const tags = (payload.tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    frontmatter: {
      title: payload.title ?? "Untitled",
      description: payload.description ?? "",
      date: payload.date ?? new Date().toISOString().slice(0, 10),
      author: payload.author ?? "VektaDev",
      tags,
    },
    body,
  };
}

function parseFileName(fileName: string): { slug: string; locale: Locale } | null {
  const match = fileName.match(/^(.+)\.(en|pl)\.mdx$/);
  if (!match) {
    return null;
  }

  return {
    slug: match[1],
    locale: match[2] as Locale,
  };
}

async function readInsightFile(slug: string, locale: Locale): Promise<{ locale: Locale; raw: string } | null> {
  const preferredPath = path.join(CONTENT_DIR, `${slug}.${locale}.mdx`);
  const fallbackPath = path.join(CONTENT_DIR, `${slug}.${defaultLocale}.mdx`);

  try {
    const raw = await fs.readFile(preferredPath, "utf8");
    return { locale, raw };
  } catch {
    try {
      const raw = await fs.readFile(fallbackPath, "utf8");
      return { locale: defaultLocale, raw };
    } catch {
      return null;
    }
  }
}

async function listInsightFiles(): Promise<Array<{ slug: string; locale: Locale }>> {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => parseFileName(entry.name))
    .filter((entry): entry is { slug: string; locale: Locale } => entry !== null);
}

export async function getInsightSlugs(): Promise<string[]> {
  const files = await listInsightFiles();
  return [...new Set(files.map((file) => file.slug))].sort();
}

export async function getInsightsList(locale: string): Promise<InsightListItem[]> {
  const normalizedLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const slugs = await getInsightSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const file = await readInsightFile(slug, normalizedLocale);
      if (!file) return null;

      const { frontmatter } = parseFrontmatter(file.raw);

      return {
        slug,
        locale: file.locale,
        ...frontmatter,
      } satisfies InsightListItem;
    })
  );

  return posts
    .filter((post): post is InsightListItem => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getInsightPost(locale: string, slug: string): Promise<InsightPost | null> {
  const normalizedLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  const file = await readInsightFile(slug, normalizedLocale);

  if (!file) {
    return null;
  }

  const { frontmatter, body } = parseFrontmatter(file.raw);

  return {
    slug,
    locale: file.locale,
    html: mdxToHtml(body),
    ...frontmatter,
  };
}
