import Link from "next/link";
import BackHomeLink from "../components/BackHomeLink";
import { getArticlesMeta } from "../../lib/content";

const BCI_COLUMN = "bci";

export default function BCIPage() {
  const articles = getArticlesMeta(BCI_COLUMN);

  return (
    <main style={{ padding: 40 }}>
      <h1>BCI</h1>
      <p>这里会记录我关于脑机接口与神经工程方向的学习内容。</p>

      <div style={{ marginTop: 32 }}>
        <h2>Articles</h2>
        <ul style={{ lineHeight: 2 }}>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/bci/${article.slug}`}>{article.title}</Link>
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
