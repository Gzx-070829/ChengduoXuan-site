import Link from "next/link";
import BackHomeLink from "../components/BackHomeLink";
import { getArticlesMeta } from "../../lib/content";

const LITERATURE_COLUMN = "literature";

export default function LiteraturePage() {
  const articles = getArticlesMeta(LITERATURE_COLUMN);

  return (
    <main style={{ padding: 40 }}>
      <h1>Literature</h1>
      <p>这里会分享我的读书记录、写作练习和一些文学相关思考。</p>

      <div style={{ marginTop: 32 }}>
        <h2>Articles</h2>
        <ul style={{ lineHeight: 2 }}>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/literature/${article.slug}`}>{article.title}</Link>
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
