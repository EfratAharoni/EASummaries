"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { matchesSummaryQuery } from "@/lib/search/courseSearch";

export default function CoursesSearchClient({ courses, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const filteredCourses = useMemo(() => {
    return courses
      .map((course) => ({
        ...course,
        summaries: course.summaries.filter((summary) => matchesSummaryQuery(summary, query)),
      }))
      .filter((course) => course.summaries.length > 0);
  }, [courses, query]);

  return (
    <>
      <section className="card search-panel">
        <label htmlFor="summary-search">
          <strong>חיפוש סיכום לפי שם</strong>
        </label>
        <input
          id="summary-search"
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="לדוגמה: אלגוריתמים, הסתברות, לוגיקה"
        />
      </section>

      <section className="grid">
        {filteredCourses.map((course) => (
          <article className="card" key={course.courseName}>
            <span className="tag">קורס</span>
            <h3>{course.courseName}</h3>
            <p className="muted">{course.summaries.length} תוצאות</p>
            <div className="actions">
              {course.summaries.map((summary) => (
                <Link
                  className="btn secondary"
                  href={`/summary/${summary.id}`}
                  key={summary.id}
                >
                  {summary.topic}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>

      {filteredCourses.length === 0 && (
        <section className="card empty-state">
          <p>לא נמצאו סיכומים שמתאימים לחיפוש שלך.</p>
        </section>
      )}
    </>
  );
}
