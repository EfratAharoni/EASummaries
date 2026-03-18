import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "ראשי" },
  { href: "/courses", label: "סיכומים" },
  { href: "/recommendations", label: "המלצות" },
  { href: "/guide", label: "מדריך למתחילים" },
  { href: "/electives", label: "קורסי רשות" },
  { href: "/system-builder", label: "בניית מערכת" },
];

export default function SiteNav() {
  return (
    <nav className="topbar">
      <span className="brand">לומדים חכם</span>
      <div className="nav-links">
        {NAV_LINKS.map(({ href, label }) => (
          <Link key={href} href={href} className="btn secondary">
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
