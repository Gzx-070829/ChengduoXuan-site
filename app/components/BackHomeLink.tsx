import Link from "next/link";

export default function BackHomeLink() {
  return (
    <p style={{ marginTop: 24 }}>
      <Link href="/">← 返回首页</Link>
    </p>
  );
}