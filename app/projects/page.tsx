import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Projects</h1>
      <p>这里会展示我正在做或已经完成的小项目与实验作品。</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/">← 返回首页</Link>
      </p>
    </main>
  );
}
