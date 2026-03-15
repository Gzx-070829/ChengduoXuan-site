import { notFound } from "next/navigation";
import BackHomeLink from "../../components/BackHomeLink";
import { getArticleBySlug, getArticlesMeta, markdownToHtml } from "../../../lib/content";

const PROJECTS_COLUMN = "projects";

export function generateStaticParams() {
  return getArticlesMeta(PROJECTS_COLUMN).map((article) => ({ slug: article.slug }));
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(PROJECTS_COLUMN, slug);

  if (!article) {
    notFound();
  }

  const html = markdownToHtml(article.content);

  return (
    <main style={{ padding: 40 }}>
      <h1>{article.title}</h1>
      {article.date ? <p style={{ color: "#666" }}>{article.date}</p> : null}
      <article
        style={{ marginTop: 24, lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <BackHomeLink />
    </main>
  );
}
