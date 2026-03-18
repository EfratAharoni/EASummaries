import SystemBuilderClient from "./SystemBuilderClient";
import SiteNav from "@/components/SiteNav";
import Link from "next/link";

export default function SystemBuilderPage() {
  return (
    <main className="shell">
      <SiteNav />

      <section className="hero">
        <span className="hero-kicker">קושי, עומס והשקעה שוטפת</span>
        <h1>בניית מערכת</h1>
        <p>
          כרטיסיות מסודרות לפי רמת קושי, עם פתיחה חלקה של פירוט הקורס, סינון
          דינמי לפי השקעה בסמסטר, וחיפוש ומיון מהירים בצד הלקוח.
        </p>

        <div className="actions">
          <Link className="btn" href="/system-builder/builder">
            מעבר לבנאי מערכת מתקדם
          </Link>
        </div>
      </section>

      <SystemBuilderClient />
    </main>
  );
}
