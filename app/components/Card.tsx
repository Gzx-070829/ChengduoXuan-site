"use client"

import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  link: string;
};

export default function Card({ title, description, link }: CardProps) {
  return (
    <Link href={link} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          border: "1px solid var(--card-border)",
          borderRadius: "16px",
          padding: "20px",
          backgroundColor: "var(--card-background)",
          color: "var(--card-text)",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "var(--card-shadow)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "var(--card-shadow)";
        }}
      >
        <h3 style={{ color: "var(--card-title)" }}>{title}</h3>
        <p style={{ color: "var(--card-description)" }}>{description}</p>
      </div>
    </Link>
  );
}
