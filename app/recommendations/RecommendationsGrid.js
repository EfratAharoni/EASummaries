"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { matchesCourseTextQuery } from "@/lib/search/courseSearch";

function renderHighlightedText(text, keyPrefix) {
  const examPracticeRegex = /(כדאי לתרגל כמה שיותר מבחנים|מומלץ לתרגל מבחנים כמה שיותר|לתרגל כמה שיותר מבחנים|לתרגל הרבה מבחנים)/g;
  const normalizedText = String(text)
    .replace(/["'`׳״.,:;!?()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (/לתרגל/.test(normalizedText) && /מבחנ/.test(normalizedText)) {
    return <span className="tip-underline">{text}</span>;
  }

  if (String(text).trim() === "בנוסף ללמוד מהמצגות של המעבדה.") {
    return <strong className="tip-emphasis">{text}</strong>;
  }

  const labelMatch = String(text).match(/^([^:]{1,36}:)(\s*)(.*)$/);
  const termsRegex = /(הכי חשוב|חשוב בעיקר|נוכחות חובה|מומלץ מאוד|מומלץ ממש|מומלץ|חשוב)/g;

  const renderTerms = (value, prefix) =>
    String(value)
      .split(examPracticeRegex)
      .filter(Boolean)
      .map((part, index) => {
        if (examPracticeRegex.test(part)) {
          examPracticeRegex.lastIndex = 0;
          return (
            <span className="tip-underline" key={`${prefix}-exam-${index}`}>
              {part}
            </span>
          );
        }

        examPracticeRegex.lastIndex = 0;

        return String(part)
          .split(termsRegex)
          .filter(Boolean)
          .map((subPart, subIndex) => {
            if (termsRegex.test(subPart)) {
              termsRegex.lastIndex = 0;
              return (
                <strong className="tip-emphasis" key={`${prefix}-term-${index}-${subIndex}`}>
                  {subPart}
                </strong>
              );
            }

            termsRegex.lastIndex = 0;
            return (
              <span key={`${prefix}-text-${index}-${subIndex}`}>{subPart}</span>
            );
          });
      });

  if (labelMatch) {
    return (
      <>
        <strong className="tip-label">{labelMatch[1]}</strong>
        {labelMatch[2]}
        {renderTerms(labelMatch[3], `${keyPrefix}-tail`)}
      </>
    );
  }

  return renderTerms(text, keyPrefix);
}

function renderTipWithLinks(tip) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = String(tip).split(urlRegex);

  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      let linkLabel = "קישור";
      try {
        const parsed = new URL(part);
        linkLabel = `קישור (${parsed.hostname.replace(/^www\./, "")})`;
      } catch {
        linkLabel = "קישור";
      }

      return (
        <a
          className="tip-link"
          key={`${part}-${index}`}
          href={part}
          target="_blank"
          rel="noreferrer noopener"
        >
          {linkLabel}
        </a>
      );
    }

    return (
      <span key={`${index}-${part.slice(0, 24)}`}>
        {renderHighlightedText(part, `tip-${index}`)}
      </span>
    );
  });
}

export default function RecommendationsGrid({ coursesWithTips }) {
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(() => {
    if (!query.trim()) {
      return coursesWithTips;
    }

    return coursesWithTips.filter((course) =>
      matchesCourseTextQuery(String(course.courseName || ""), query)
    );
  }, [coursesWithTips, query]);

  return (
    <>
      <section className="card search-panel">
        <label htmlFor="recommendations-search">
          <strong>חיפוש המלצה לפי שם קורס</strong>
        </label>
        <input
          id="recommendations-search"
          className="search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="לדוגמה: אלגוריתמים, מערכות הפעלה, לוגיקה"
        />
      </section>

      <section className="grid">
        {filteredCourses.map((course) => {
          const firstSummaryId = course.summaries?.[0]?.id;
          const summaryHref = firstSummaryId ? `/summary/${firstSummaryId}` : "/courses";

          return (
            <article className="card recommendation-card" key={course.courseName}>
              <span className="tag">המלצות</span>
              <h3>{course.courseName}</h3>
              <div className="card-content">
                <ul className="tips-list">
                  {course.tips.map((tip, tipIndex) => (
                    <li key={`${course.courseName}-tip-${tipIndex}`}>
                      {renderTipWithLinks(tip)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-cta-row">
                <Link className="btn secondary card-cta" href={summaryHref}>
                  מעבר לסיכום הקורס
                </Link>
                <p className="muted card-cta-count">
                  {course.summaries.length > 0
                    ? `${course.summaries.length} סיכומים זמינים`
                    : "המלצות כלליות לקורס"}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {filteredCourses.length === 0 && (
        <section className="card empty-state">
          <p>לא נמצאו המלצות שמתאימות לחיפוש שלך.</p>
        </section>
      )}
    </>
  );
}