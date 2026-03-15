import Link from "next/link";
import BackHomeLink from "../components/BackHomeLink";
import { getArticlesMeta } from "../../lib/content";

const PROJECTS_COLUMN = "projects";

export default function ProjectsPage() {
  const articles = getArticlesMeta(PROJECTS_COLUMN);

  return (
    <main style={{ padding: 40 }}>
      <h1>Projects</h1>
      <p>这里会展示我正在做或已经完成的小项目与实验作品。</p>

      <div style={{ marginTop: 32 }}>
        <h2>Articles</h2>
        <ul style={{ lineHeight: 2 }}>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/projects/${article.slug}`}>{article.title}</Link>
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
