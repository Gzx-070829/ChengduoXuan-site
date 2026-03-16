"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/ai", label: "AI" },
  { href: "/bci", label: "BCI" },
  { href: "/programming", label: "Programming" },
  { href: "/literature", label: "Literature" },
  { href: "/daily", label: "Daily" },
  { href: "/projects", label: "Projects" },
  { href: "/feedback", label: "Feedback" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__header">
        <Link href="/" className="navbar__brand" onClick={() => setIsMenuOpen(false)}>
          chengduoXuan
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`navbar__links ${isMenuOpen ? "navbar__links--open" : ""}`}
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
