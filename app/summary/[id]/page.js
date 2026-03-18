import Link from "next/link";
import { notFound } from "next/navigation";
import { getSummaryById } from "@/lib/summaries";
import SiteNav from "@/components/SiteNav";

export default async function SummaryPage({ params }) {
  const resolvedParams = await params;
  const summary = await getSummaryById(resolvedParams?.id);

  if (!summary) {
    notFound();
  }

  return (
    <main className="shell">
      <SiteNav />

      <section className="card">
        <div className="summary-head">
          <div>
            <span className="tag">עמוד סיכום</span>
            <h1>{summary.courseName}</h1>
            <p>
              <strong>נושא:</strong> {summary.topic}
            </p>
            {summary.note && (
              <p className="summary-note">
                <strong>הערה:</strong> {summary.note}
              </p>
            )}
            <p>{summary.description}</p>
          </div>
          <div className="actions">
            <a className="btn primary" href={summary.pdfUrl} download>
              הורדת PDF
            </a>
            <Link className="btn secondary" href="/courses">
              חזרה לסיכומים
            </Link>
          </div>
        </div>
      </section>

      <section className="pdf-wrap">
        <iframe
          className="pdf-viewer"
          src={summary.pdfUrl}
          title={`Summary ${summary.topic}`}
        />
      </section>
    </main>
  );
}
