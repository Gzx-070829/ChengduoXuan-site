import Link from "next/link";

const articles = [
  { title: "EEG Basics", slug: "eeg-basics" },
  { title: "Brain Signal Learning", slug: "brain-signal-learning" },
  { title: "My First BCI Note", slug: "my-first-bci-note" },
];

export default function BCIPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>BCI</h1>
      <p>这里记录我关于脑机接口和神经工程的学习与思考。</p>

      <div style={{ marginTop: 32 }}>
        <h2>Articles</h2>
        <ul style={{ lineHeight: 2 }}>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/bci/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}