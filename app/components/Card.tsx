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
          border: "1px solid #ddd",
          borderRadius: "16px",
          padding: "20px",
          backgroundColor: "#fafafa",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.04)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
        }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}