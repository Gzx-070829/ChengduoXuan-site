import Link from "next/link";

export default function BCIPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>BCI</h1>
      <p>这里会记录我关于脑机接口与神经工程方向的学习内容。</p>
      <p style={{ marginTop: 24 }}>
        <Link href="/">← 返回首页</Link>
      </p>
    </main>
  );
}
