import Link from "next/link";
import BackHomeLink from "../components/BackHomeLink";
import { getAIArticlesMeta } from "../../lib/aiArticles";

export default function AIPage() {
  const articles = getAIArticlesMeta();

  return (
    <main style={{ padding: 40 }}>
      <h1>AI</h1>
      <p>这里记录我关于人工智能的学习与思考。</p>

      <div style={{ marginTop: 32 }}>
        <h2>Articles</h2>
        <ul style={{ lineHeight: 2 }}>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/ai/${article.slug}`}>{article.title}</Link>
              {article.date ? <span style={{ marginLeft: 8, color: "#666" }}>({article.date})</span> : null}
              {article.summary ? (
                <p style={{ margin: "4px 0 8px", lineHeight: 1.6, color: "#555" }}>{article.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <BackHomeLink />
    </main>
  );
}
