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

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function parseInlineMarkdown(text: string) {
  const tokens: string[] = [];
  const pattern = /(`[^`]+`)|(\[[^\]]+\]\(([^)\s]+)(?:\s+"([^"]*)")?\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = pattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      tokens.push(escapeHtml(text.slice(lastIndex, match.index)));
    }

    if (match[1]) {
      const code = escapeHtml(match[1].slice(1, -1));
      tokens.push(`<code>${code}</code>`);
    } else {
      const label = escapeHtml(match[2].slice(1, match[2].indexOf("](")));
      const href = escapeHtml(match[3]);
      const title = match[4] ? ` title="${escapeHtml(match[4])}"` : "";
      tokens.push(`<a href="${href}"${title} target="_blank" rel="noopener noreferrer">${label}</a>`);
    }

    lastIndex = pattern.lastIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    tokens.push(escapeHtml(text.slice(lastIndex)));
  }

  return tokens.join("");
}

export function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const htmlLines: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  const codeBlockLines: string[] = [];

  function closeList() {
    if (!listType) {
      return;
    }
    htmlLines.push(`</${listType}>`);
    listType = null;
  }

  function closeCodeBlock() {
    if (!inCodeBlock) {
      return;
    }
    const code = escapeHtml(codeBlockLines.join("\n"));
    htmlLines.push(`<pre><code>${code}</code></pre>`);
    codeBlockLines.length = 0;
    inCodeBlock = false;
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      closeList();
      if (inCodeBlock) {
        closeCodeBlock();
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      closeList();
      const level = trimmed.match(/^#+/)?.[0].length ?? 1;
      const text = trimmed.replace(/^#{1,6}\s+/, "");
      htmlLines.push(`<h${level}>${parseInlineMarkdown(text)}</h${level}>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeList();
      htmlLines.push("<hr />");
      continue;
    }

    if (trimmed.startsWith("> ")) {
      closeList();
      htmlLines.push(`<blockquote><p>${parseInlineMarkdown(trimmed.slice(2).trim())}</p></blockquote>`);
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      if (listType !== "ol") {
        closeList();
        htmlLines.push("<ol>");
        listType = "ol";
      }
      htmlLines.push(`<li>${parseInlineMarkdown(orderedMatch[2])}</li>`);
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      if (listType !== "ul") {
        closeList();
        htmlLines.push("<ul>");
        listType = "ul";
      }
      htmlLines.push(`<li>${parseInlineMarkdown(unorderedMatch[1])}</li>`);
      continue;
    }

    closeList();
    htmlLines.push(`<p>${parseInlineMarkdown(trimmed)}</p>`);
  }

  closeList();
  closeCodeBlock();

  return htmlLines.join("\n");
}
