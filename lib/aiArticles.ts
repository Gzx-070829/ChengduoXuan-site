import fs from "node:fs";
import path from "node:path";

const AI_CONTENT_DIR = path.join(process.cwd(), "content", "ai");

export type AIArticleMeta = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
};

export type AIArticle = AIArticleMeta & {
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

function getArticleFiles() {
  if (!fs.existsSync(AI_CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(AI_CONTENT_DIR)
    .filter((file) => file.endsWith(".md"));
}

export function getAIArticlesMeta(): AIArticleMeta[] {
  return getArticleFiles()
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(AI_CONTENT_DIR, filename);
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

export function getAIArticleBySlug(slug: string): AIArticle | null {
  const filePath = path.join(AI_CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileText = fs.readFileSync(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(fileText);

  return {
    slug,
    title: metadata.title ?? slug,
    date: metadata.date,
    summary: metadata.summary,
    content,
  };
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatInlineMarkdown(text: string) {
  return text
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.split("\n");
  const htmlLines: string[] = [];
  let inList = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      continue;
    }

    if (line.startsWith("# ")) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      htmlLines.push(`<h1>${formatInlineMarkdown(escapeHtml(line.slice(2)))}</h1>`);
      continue;
    }

    if (line.startsWith("## ")) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      htmlLines.push(`<h2>${formatInlineMarkdown(escapeHtml(line.slice(3)))}</h2>`);
      continue;
    }

    if (line.startsWith("### ")) {
      if (inList) {
        htmlLines.push("</ul>");
        inList = false;
      }
      htmlLines.push(`<h3>${formatInlineMarkdown(escapeHtml(line.slice(4)))}</h3>`);
      continue;
    }

    if (line.startsWith("- ") || /^\d+\.\s/.test(line)) {
      if (!inList) {
        htmlLines.push("<ul>");
        inList = true;
      }
      const itemText = line.replace(/^(-\s|\d+\.\s)/, "");
      htmlLines.push(`<li>${formatInlineMarkdown(escapeHtml(itemText))}</li>`);
      continue;
    }

    if (inList) {
      htmlLines.push("</ul>");
      inList = false;
    }

    htmlLines.push(`<p>${formatInlineMarkdown(escapeHtml(line))}</p>`);
  }

  if (inList) {
    htmlLines.push("</ul>");
  }

  return htmlLines.join("\n");
}
