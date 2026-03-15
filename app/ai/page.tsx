import Link from "next/link";
import BackHomeLink from "../components/BackHomeLink";

const articles = [
  { title: "KNN", slug: "knn" },
  { title: "Deep Learning Note", slug: "deep-learning-note" },
  { title: "My First AI Project", slug: "my-first-ai-project" },
];

export default function AIPage() {
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
            </li>
          ))}
        </ul>
      </div>

      <BackHomeLink />
    </main>
  );
}