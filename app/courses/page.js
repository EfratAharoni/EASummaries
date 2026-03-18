import Link from "next/link";
import { getCourses } from "@/lib/summaries";
import CoursesSearchClient from "./CoursesSearchClient";
import SiteNav from "@/components/SiteNav";

export default async function CoursesPage({ searchParams }) {
  const courses = await getCourses();
  const params = await searchParams;
  const initialQuery =
    typeof params?.q === "string"
      ? params.q
      : Array.isArray(params?.q)
        ? params.q[0] || ""
        : "";

  return (
    <main className="shell">
      <SiteNav />

      <section className="hero">
        <span className="hero-kicker">ניווט לפי קורס ונושא</span>
        <h1>עמוד סיכומים</h1>
        <p>אפשר לחפש לפי שם קורס או נושא, ולפתוח ישר את קובץ ה-PDF המתאים.</p>
        <div className="actions">
          <Link href="/" className="btn secondary">
            חזרה לעמוד הראשי
          </Link>
          <Link href="/recommendations" className="btn secondary">
            לעמוד ההמלצות
          </Link>
        </div>
      </section>

      <h2 className="section-title">כל הסיכומים</h2>
      <CoursesSearchClient courses={courses} initialQuery={initialQuery} />
    </main>
  );
}
