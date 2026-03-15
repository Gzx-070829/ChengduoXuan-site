import Link from "next/link";

export default function DailyPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Daily</h1>
      <p>这里会记录我的日常生活、灵感和阶段性总结。</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/">← 返回首页</Link>
      </p>
    </main>
  );
}
