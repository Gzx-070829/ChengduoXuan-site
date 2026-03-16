import { notFound } from "next/navigation";
import BackHomeLink from "../../components/BackHomeLink";
import ArticleContent from "../../components/ArticleContent";
import { getArticleBySlug, getArticlesMeta } from "../../../lib/content";

const DAILY_COLUMN = "daily";

export function generateStaticParams() {
  return getArticlesMeta(DAILY_COLUMN).map((article) => ({ slug: article.slug }));
}

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(DAILY_COLUMN, slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="article-page">
      <h1>{article.title}</h1>
      {article.date ? <p className="article-date">{article.date}</p> : null}
      <ArticleContent content={article.content} />
      <BackHomeLink />
    </main>
  );
}
