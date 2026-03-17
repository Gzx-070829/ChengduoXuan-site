import fs from "node:fs";
import path from "node:path";

const CONTENT_ROOT_DIR = path.join(process.cwd(), "content");

export type ArticleMeta = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
};

export type Article = ArticleMeta & {
  content: string;
};

function parseFrontmatter(raw: string) {
  if (!raw.startsWith("---\n")) {
    return { metadata: {} as Record<string, string>, content: raw };
  }

  const endIndex = raw.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { metadata: {} as Record<string, string>, content: raw };
  }

  const frontmatterText = raw.slice(4, endIndex);
  const content = raw.slice(endIndex + 5);

  const metadata: Record<string, string> = {};
  for (const line of frontmatterText.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    metadata[key] = value;
  }

  return { metadata, content };
}

function getColumnContentDir(column: string) {
  return path.join(CONTENT_ROOT_DIR, column);
}

function getArticleFiles(column: string) {
  const contentDir = getColumnContentDir(column);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs.readdirSync(contentDir).filter((file) => file.endsWith(".md"));
}

export function getArticlesMeta(column: string): ArticleMeta[] {
  const contentDir = getColumnContentDir(column);

  return getArticleFiles(column)
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(contentDir, filename);
      const fileText = fs.readFileSync(filePath, "utf-8");
      const { metadata } = parseFrontmatter(fileText);

      return {
        slug,
        title: metadata.title ?? slug,
        date: metadata.date,
        summary: metadata.summary,
      };
    })
    .sort((a, b) => (a.date && b.date ? b.date.localeCompare(a.date) : 0));
}


function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function getArticleBySlug(column: string, slug: string): Article | null {
  const normalizedSlug = normalizeSlug(slug);
  const contentDir = getColumnContentDir(column);
  const filePath = path.join(contentDir, `${normalizedSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileText = fs.readFileSync(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(fileText);

  return {
    slug: normalizedSlug,
    title: metadata.title ?? normalizedSlug,
    date: metadata.date,
    summary: metadata.summary,
    content,
  };
}

