import Link from "next/link";
import BackHomeLink from "../components/BackHomeLink";
import { getArticlesMeta } from "../../lib/content";

const PROGRAMMING_COLUMN = "programming";

export default function ProgrammingPage() {
  const articles = getArticlesMeta(PROGRAMMING_COLUMN);

  return (
    <main style={{ padding: 40 }}>
      <h1>Programming</h1>
      <p>这里会整理编程学习笔记，包括 Python、Linux、C++ 和 JavaScript。</p>

      <div style={{ marginTop: 32 }}>
        <h2>Articles</h2>
        <ul style={{ lineHeight: 2 }}>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/programming/${article.slug}`}>{article.title}</Link>
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
