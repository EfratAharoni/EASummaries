"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  COURSES,
  DIFFICULTY_META,
  EFFORT_FILTERS,
  SORT_OPTIONS,
  SYSTEM_PLANNER_GUIDE,
  SYSTEM_PLANNER_TIPS,
} from "./data";
import { matchesCourseTextQuery } from "@/lib/search/courseSearch";

const DIFFICULTY_ORDER = { hard: 0, medium: 1, easy: 2 };

function filterByEffort(courses, selectedEffort) {
  if (selectedEffort === "all") {
    return courses;
  }

  const requiresSemesterEffort = selectedEffort === "high";
  return courses.filter((course) => course.requiresSemesterEffort === requiresSemesterEffort);
}

function sortCourses(courses, sortBy) {
  const nextCourses = [...courses];

  nextCourses.sort((courseA, courseB) => {
    if (sortBy === "name") {
      return courseA.name.localeCompare(courseB.name, "he");
    }

    if (sortBy === "effort") {
      if (courseA.requiresSemesterEffort !== courseB.requiresSemesterEffort) {
        return Number(courseB.requiresSemesterEffort) - Number(courseA.requiresSemesterEffort);
      }

      return courseA.name.localeCompare(courseB.name, "he");
    }

    if (courseA.difficulty !== courseB.difficulty) {
      return DIFFICULTY_ORDER[courseA.difficulty] - DIFFICULTY_ORDER[courseB.difficulty];
    }

    return courseA.name.localeCompare(courseB.name, "he");
  });

  return nextCourses;
}

export default function SystemBuilderClient() {
  const [isPlannerHelperOpen, setIsPlannerHelperOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(SYSTEM_PLANNER_GUIDE[0]?.id ?? "");
  const [selectedSemester, setSelectedSemester] = useState(
    SYSTEM_PLANNER_GUIDE[0]?.semesters[0]?.id ?? ""
  );
  const [selectedEffort, setSelectedEffort] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("difficulty");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim());

  const selectedYearGuide = useMemo(() => {
    return SYSTEM_PLANNER_GUIDE.find((year) => year.id === selectedYear) ?? SYSTEM_PLANNER_GUIDE[0];
  }, [selectedYear]);

  const selectedYearSemesters = selectedYearGuide?.semesters ?? [];

  const selectedSemesterGuide = useMemo(() => {
    return (
      selectedYearSemesters.find((semester) => semester.id === selectedSemester) ??
      selectedYearSemesters[0]
    );
  }, [selectedSemester, selectedYearSemesters]);

  useEffect(() => {
    const hasSelectedSemester = selectedYearSemesters.some(
      (semester) => semester.id === selectedSemester
    );

    if (!hasSelectedSemester && selectedYearSemesters[0]) {
      setSelectedSemester(selectedYearSemesters[0].id);
    }
  }, [selectedSemester, selectedYearSemesters]);

  const visibleCourses = useMemo(() => {
    const coursesByEffort = filterByEffort(COURSES, selectedEffort);

    const coursesByDifficulty =
      selectedDifficulty === "all"
        ? coursesByEffort
        : coursesByEffort.filter((course) => course.difficulty === selectedDifficulty);

    const coursesByQuery = deferredQuery
      ? coursesByDifficulty.filter((course) => {
          const haystack = `${course.name} ${course.detail} ${course.effortNote}`;
          return matchesCourseTextQuery(haystack, deferredQuery);
        })
      : coursesByDifficulty;

    return sortCourses(coursesByQuery, sortBy);
  }, [deferredQuery, selectedDifficulty, selectedEffort, sortBy]);

  const groupedCourses = useMemo(() => {
    return ["hard", "medium", "easy"]
      .map((difficulty) => ({
        difficulty,
        meta: DIFFICULTY_META[difficulty],
        courses: visibleCourses.filter((course) => course.difficulty === difficulty),
      }))
      .filter((group) => group.courses.length > 0);
  }, [visibleCourses]);

  return (
    <>
      <section className="card planner-helper">
        <div className="planner-helper-head">
          <div>
            <h2 className="planner-helper-title">עזרה בבניית מערכת</h2>
            <p className="muted planner-helper-copy">
              לחצו על הכפתור, בחרו שנה וסמסטר, ותקבלו מערכת קורסים מומלצת.
            </p>
          </div>

          <button
            aria-expanded={isPlannerHelperOpen}
            className={`builder-toggle planner-helper-toggle${isPlannerHelperOpen ? " active" : ""}`}
            onClick={() => setIsPlannerHelperOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isPlannerHelperOpen ? "סגירת עזרת מערכת" : "פתיחת עזרת מערכת"}
          </button>
        </div>

        {isPlannerHelperOpen && (
          <div className="planner-helper-body">
            <h3 className="planner-helper-subtitle">המלצות לבניית מערכת</h3>

            <ul className="guide-list planner-tips-list">
              {SYSTEM_PLANNER_TIPS.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>

            <div className="planner-select-grid">
              <label className="builder-field">
                <span className="builder-field-label">שנה</span>
                <select
                  className="builder-select"
                  onChange={(event) => setSelectedYear(event.target.value)}
                  value={selectedYear}
                >
                  {SYSTEM_PLANNER_GUIDE.map((year) => (
                    <option key={year.id} value={year.id}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="builder-field">
                <span className="builder-field-label">סמסטר</span>
                <select
                  className="builder-select"
                  onChange={(event) => setSelectedSemester(event.target.value)}
                  value={selectedSemesterGuide?.id ?? ""}
                >
                  {selectedYearSemesters.map((semester) => (
                    <option key={semester.id} value={semester.id}>
                      {semester.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {selectedSemesterGuide && (
              <div className="planner-recommendation card">
                <h3 className="planner-recommendation-title">
                  מערכת מומלצת: {selectedYearGuide?.label} - {selectedSemesterGuide.label}
                </h3>

                <ul className="guide-list planner-course-list">
                  {selectedSemesterGuide.courses.map((course) => (
                    <li key={course}>{course}</li>
                  ))}
                </ul>

                {selectedSemesterGuide.note && (
                  <p className="planner-semester-note">{selectedSemesterGuide.note}</p>
                )}

                <div className="planner-recommendation-actions">
                  <Link
                    className="btn secondary"
                    href={{
                      pathname: "/system-builder/builder",
                      query: {
                        year: selectedYearGuide?.id ?? "",
                        semester: selectedSemesterGuide.id,
                      },
                    }}
                  >
                    מעבר לבנאי מערכת מתקדם
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="card builder-controls">
        <div className="builder-controls-head">
          <div>
            <h2 className="builder-controls-title">סינון, חיפוש ומיון</h2>
            <p className="muted builder-controls-copy">
              אפשר לסנן לפי השקעה שוטפת, לצמצם לפי דרגת קושי, לחפש קורס מסוים,
              ולשנות את סדר התצוגה בלי לרענן את העמוד.
            </p>
          </div>
          <div className="builder-controls-stats muted">{visibleCourses.length} קורסים מוצגים</div>
        </div>

        <div className="builder-filter-grid">
          <label className="builder-field">
            <span className="builder-field-label">חיפוש</span>
            <input
              className="search-input builder-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="לדוגמה: לוגיקה, מבנה נתונים, פרויקט"
              type="search"
              value={query}
            />
          </label>

          <label className="builder-field">
            <span className="builder-field-label">מיון</span>
            <select
              className="builder-select"
              onChange={(event) => setSortBy(event.target.value)}
              value={sortBy}
            >
              {Object.entries(SORT_OPTIONS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="builder-chip-group">
          <span className="builder-chip-label">השקעה בסמסטר</span>
          {Object.entries(EFFORT_FILTERS).map(([value, label]) => (
            <button
              className={`builder-toggle${selectedEffort === value ? " active" : ""}`}
              key={value}
              onClick={() => setSelectedEffort(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="builder-chip-group">
          <span className="builder-chip-label">דרגת קושי</span>
          <button
            className={`builder-toggle${selectedDifficulty === "all" ? " active" : ""}`}
            onClick={() => setSelectedDifficulty("all")}
            type="button"
          >
            הכל
          </button>
          {Object.entries(DIFFICULTY_META).map(([value, meta]) => (
            <button
              className={`builder-toggle builder-toggle-${value}${selectedDifficulty === value ? " active" : ""}`}
              key={value}
              onClick={() => setSelectedDifficulty(value)}
              type="button"
            >
              {meta.label}
            </button>
          ))}
        </div>
      </section>

      {groupedCourses.map((group) => (
        <section className="builder-section" key={group.difficulty}>
          <div className="builder-section-head">
            <h2 className="section-title builder-section-title">{group.meta.title}</h2>
            <p className="muted builder-section-copy">{group.meta.description}</p>
          </div>

          <div className="builder-grid">
            {group.courses.map((course) => {
              const effortClassName = course.requiresSemesterEffort ? "high" : "low";

              return (
                <article
                  className="builder-card"
                  data-difficulty={course.difficulty}
                  key={course.name}
                >
                  <div className="builder-summary">
                    <div className="builder-summary-main">
                      <span className="builder-course-name">{course.name}</span>
                      <div className="builder-badges">
                        <span className="builder-badge difficulty">{group.meta.label}</span>
                        <span className={`builder-badge effort ${effortClassName}`}>
                          {course.requiresSemesterEffort ? "דורש השקעה" : "קליל"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="builder-body">
                    <p>{course.detail}</p>
                    <p className="builder-effort-note">
                      <strong>במהלך הסמסטר:</strong> {course.effortNote}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      {groupedCourses.length === 0 && (
        <section className="card empty-state">
          <p>לא נמצאו קורסים שמתאימים לסינון שבחרתם.</p>
        </section>
      )}
    </>
  );
}