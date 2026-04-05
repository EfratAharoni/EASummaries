"use client";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "ראשי" },
  { href: "/guide", label: "מדריך למתחילים" },
  { href: "/courses", label: "סיכומים" },
  { href: "/recommendations", label: "המלצות" },
  { href: "/recordings", label: "הקלטות" },
  { href: "/electives", label: "קורסי רשות" },
  { href: "/system-builder", label: "בניית מערכת" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={`topbar${open ? " nav-expanded" : ""}`}>
      <span className="brand">לומדים חכם</span>
      <button
        className="nav-hamburger"
        aria-label="תפריט ניווט"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className={`hamburger-line${open ? " open" : ""}`} />
        <span className={`hamburger-line${open ? " open" : ""}`} />
        <span className={`hamburger-line${open ? " open" : ""}`} />
      </button>
      <div className={`nav-links${open ? " nav-open" : ""}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="btn secondary"
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
