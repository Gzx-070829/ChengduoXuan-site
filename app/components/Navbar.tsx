import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid var(--border-color)",
        marginBottom: "40px",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        chengduoXuan
      </Link>

      <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
        <Link href="/ai">AI</Link>
        <Link href="/bci">BCI</Link>
        <Link href="/programming">Programming</Link>
        <Link href="/literature">Literature</Link>
        <Link href="/daily">Daily</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/feedback">Feedback</Link>
      </div>
    </nav>
  );
}
