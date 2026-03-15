import Link from "next/link";

type BackHomeLinkProps = {
  label?: string;
};

export default function BackHomeLink({ label = "← 返回首页" }: BackHomeLinkProps) {
  return (
    <p style={{ marginTop: 24 }}>
      <Link href="/">{label}</Link>
    </p>
  );
}
