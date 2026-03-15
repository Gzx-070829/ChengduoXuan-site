import Link from "next/link";

export default function ProgrammingPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Programming</h1>
      <p>这里会整理编程学习笔记，包括 Python、Linux、C++ 和 JavaScript。</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/">← 返回首页</Link>
      </p>
    </main>
  );
}
