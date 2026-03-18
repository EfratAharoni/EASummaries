"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { matchesCourseTextQuery } from "@/lib/search/courseSearch";

const DIFFICULTY_LABELS = {
  hard: "קשה",
  medium: "בינוני",
  easy: "קל",
  unknown: "לא סווג",
};

const LOAD_LEVEL_LABELS = {
  heavy: "עמוס",
  medium: "בינוני",
  light: "קל",
};

function uniqueItems(items) {
  return [...new Set(items)];
}

function toggleItem(items, value) {
  if (items.includes(value)) {
    return items.filter((item) => item !== value);
  }

  return [...items, value];
}

function getCourseLoadLevel(course) {
  if (course.difficulty === "hard") {
    return "heavy";
  }

  if (course.difficulty === "easy") {
    return "light";
  }

  return "medium";
}

function getInitialPlannerSelection(plannerGuide, yearParam, semesterParam) {
  const fallbackYear = plannerGuide[0];
  const selectedYearGuide = plannerGuide.find((year) => year.id === yearParam) || fallbackYear;
  const selectedYearSemesters = selectedYearGuide?.semesters || [];
  const selectedSemesterGuide =
    selectedYearSemesters.find((semester) => semester.id === semesterParam) ||
    selectedYearSemesters[0];

  return {
    yearId: selectedYearGuide?.id || "",
    semesterId: selectedSemesterGuide?.id || "",
    recommendedCourses: selectedSemesterGuide?.courses || [],
  };
}

export default function SystemPlanBuilderClient({ courseCatalog, plannerGuide }) {
  const searchParams = useSearchParams();
  const initialSelection = useMemo(() => {
    return getInitialPlannerSelection(
      plannerGuide,
      searchParams.get("year"),
      searchParams.get("semester")
    );
  }, [plannerGuide, searchParams]);

  const [selectedYear, setSelectedYear] = useState(initialSelection.yearId);
  const [selectedSemester, setSelectedSemester] = useState(initialSelection.semesterId);
  const [query, setQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [takenCourses, setTakenCourses] = useState([]);
  const [plannedCourses, setPlannedCourses] = useState(initialSelection.recommendedCourses);

  const selectedYearGuide = useMemo(() => {
    return plannerGuide.find((year) => year.id === selectedYear) || plannerGuide[0];
  }, [plannerGuide, selectedYear]);

  const selectedYearSemesters = selectedYearGuide?.semesters || [];

  const selectedSemesterGuide = useMemo(() => {
    return (
      selectedYearSemesters.find((semester) => semester.id === selectedSemester) ||
      selectedYearSemesters[0]
    );
  }, [selectedSemester, selectedYearSemesters]);

  useEffect(() => {
    const hasSemester = selectedYearSemesters.some(
      (semester) => semester.id === selectedSemester
    );

    if (!hasSemester && selectedYearSemesters[0]) {
      setSelectedSemester(selectedYearSemesters[0].id);
    }
  }, [selectedSemester, selectedYearSemesters]);

  const catalogByName = useMemo(() => {
    return new Map(courseCatalog.map((course) => [course.name, course]));
  }, [courseCatalog]);

  const plannedCatalogCourses = useMemo(() => {
    return plannedCourses
      .map((courseName) => catalogByName.get(courseName))
      .filter(Boolean);
  }, [catalogByName, plannedCourses]);

  const visibleCourses = useMemo(() => {
    return courseCatalog.filter((course) => {
      const matchesDifficulty =
        difficultyFilter === "all" || course.difficulty === difficultyFilter;

      if (!matchesDifficulty) {
        return false;
      }

      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        return true;
      }

      return matchesCourseTextQuery(course.name, trimmedQuery);
    });
  }, [courseCatalog, difficultyFilter, query]);

  const totalTipsForTaken = useMemo(() => {
    return takenCourses.reduce((sum, courseName) => {
      const course = catalogByName.get(courseName);
      return sum + (course?.tips?.length || 0);
    }, 0);
  }, [catalogByName, takenCourses]);

  const totalSummariesForTaken = useMemo(() => {
    return takenCourses.reduce((sum, courseName) => {
      const course = catalogByName.get(courseName);
      return sum + (course?.summaries?.length || 0);
    }, 0);
  }, [catalogByName, takenCourses]);

  const recommendedRequiredCourseCount = selectedSemesterGuide?.courses?.length || 0;
  const recommendedElectiveCourseCount = selectedSemesterGuide?.recommendedElectives || 0;
  const recommendedCourseCount =
    recommendedRequiredCourseCount + recommendedElectiveCourseCount;
  const plannedCourseCount = plannedCatalogCourses.length;

  const recommendedLoadDescription =
    recommendedElectiveCourseCount > 0
      ? `${recommendedRequiredCourseCount} חובה + ${recommendedElectiveCourseCount} רשות`
      : `${recommendedRequiredCourseCount} קורסים`;

  const systemLoadStatus = useMemo(() => {
    if (plannedCourseCount < recommendedCourseCount) {
      return {
        level: "light",
        title: "המערכת שלך לא עמוסה",
        description: `בחרת ${plannedCourseCount} קורסים מתוך יעד של ${recommendedLoadDescription} בסמסטר זה.`,
      };
    }

    if (plannedCourseCount === recommendedCourseCount) {
      return {
        level: "balanced",
        title: "המערכת שלך בסדר",
        description: `בחרת בדיוק את היעד המומלץ לסמסטר: ${recommendedLoadDescription}.`,
      };
    }

    return {
      level: "heavy",
      title: "המערכת שלך עמוסה",
      description: `בחרת ${plannedCourseCount} קורסים, שזה יותר מהיעד לסמסטר (${recommendedLoadDescription}).`,
    };
  }, [plannedCourseCount, recommendedCourseCount, recommendedLoadDescription]);

  const plannedCoursesByLoad = useMemo(() => {
    const groups = {
      heavy: [],
      medium: [],
      light: [],
    };

    plannedCatalogCourses.forEach((course) => {
      const loadLevel = getCourseLoadLevel(course);
      groups[loadLevel].push(course);
    });

    return groups;
  }, [plannedCatalogCourses]);

  function handleAddRecommendedCourses() {
    const recommendedCourses = selectedSemesterGuide?.courses || [];
    setPlannedCourses((current) => uniqueItems([...current, ...recommendedCourses]));
  }

  function handleClearPlan() {
    setPlannedCourses([]);
  }

  return (
    <section className="plan-builder-layout">
      <aside className="card plan-sidebar">
        <h2 className="plan-sidebar-title">המערכת שלי</h2>

        <div className="plan-sidebar-stats">
          <p className="muted">{plannedCourses.length} קורסים בתכנון</p>
          <p className="muted">{takenCourses.length} קורסים סומנו כנלקחו</p>
          <p className="muted">{totalSummariesForTaken} סיכומים זמינים לקורסים שנלקחו</p>
          <p className="muted">{totalTipsForTaken} המלצות זמינות לקורסים שנלקחו</p>
        </div>

        <div className="plan-sidebar-chips">
          {plannedCatalogCourses.map((course) => (
            <button
              className="plan-chip"
              key={course.name}
              onClick={() => setPlannedCourses((current) => current.filter((item) => item !== course.name))}
              type="button"
            >
              {course.name}
            </button>
          ))}

          {plannedCatalogCourses.length === 0 && (
            <p className="muted">עדיין לא נוספו קורסים למערכת האישית.</p>
          )}
        </div>

        <div className="plan-sidebar-actions">
          <button className="btn secondary" onClick={handleClearPlan} type="button">
            ניקוי מערכת
          </button>
        </div>
      </aside>

      <div className="plan-main">
        <section className="card plan-controls">
          <div className="plan-controls-head">
            <h2 className="plan-controls-title">בחירת שנה, סמסטר ותכנון</h2>
            <p className="muted">בחרו סמסטר, טענו קורסים מומלצים, וערכו את המערכת כרצונכם.</p>
          </div>

          <div className="plan-control-grid">
            <label className="builder-field">
              <span className="builder-field-label">שנה</span>
              <select
                className="builder-select"
                onChange={(event) => setSelectedYear(event.target.value)}
                value={selectedYear}
              >
                {plannerGuide.map((year) => (
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
                value={selectedSemesterGuide?.id || ""}
              >
                {selectedYearSemesters.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="builder-field">
              <span className="builder-field-label">חיפוש קורס</span>
              <input
                className="search-input builder-search"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="לדוגמה: אלגוריתמים, אוטומטים"
                type="search"
                value={query}
              />
            </label>
          </div>

          <div className="builder-chip-group">
            <span className="builder-chip-label">סינון קושי</span>
            {[
              ["all", "הכל"],
              ["hard", "קשה"],
              ["medium", "בינוני"],
              ["easy", "קל"],
              ["unknown", "לא סווג"],
            ].map(([value, label]) => (
              <button
                className={`builder-toggle${difficultyFilter === value ? " active" : ""}`}
                key={value}
                onClick={() => setDifficultyFilter(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="plan-actions-row">
            <button className="btn" onClick={handleAddRecommendedCourses} type="button">
              הוספת הקורסים המומלצים לסמסטר
            </button>

            {selectedSemesterGuide?.note && (
              <p className="plan-semester-note">{selectedSemesterGuide.note}</p>
            )}
          </div>

          <div className={`plan-load-status ${systemLoadStatus.level}`}>
            <p className="plan-load-status-title">{systemLoadStatus.title}</p>
            <p className="plan-load-status-description">{systemLoadStatus.description}</p>
          </div>
        </section>

        <section className="card built-plan-card">
          <div className="built-plan-head">
            <h2 className="plan-controls-title">המערכת שנבנתה לפי עומס קורסים</h2>
            <p className="muted">
              כל קורס ששייך למערכת שלך מופיע לפי מיון: עמוס, בינוני או קל.
            </p>
          </div>

          <div className="built-plan-groups">
            {["heavy", "medium", "light"].map((level) => (
              <article className={`built-plan-group ${level}`} key={level}>
                <h3>
                  {LOAD_LEVEL_LABELS[level]} ({plannedCoursesByLoad[level].length})
                </h3>

                {plannedCoursesByLoad[level].length > 0 ? (
                  <ul className="guide-list built-plan-list">
                    {plannedCoursesByLoad[level].map((course) => (
                      <li key={`${level}-${course.name}`}>{course.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="muted">אין כרגע קורסים בקטגוריה זו.</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="plan-course-grid">
          {visibleCourses.map((course) => {
            const isTaken = takenCourses.includes(course.name);
            const isPlanned = plannedCourses.includes(course.name);
            const difficultyClass = `difficulty-${course.difficulty}`;

            return (
              <article className="card plan-course-card" key={course.name}>
                <div className="plan-course-top">
                  <h3>{course.name}</h3>
                  <div className="plan-course-badges">
                    <span className={`plan-badge ${difficultyClass}`}>
                      רמת קושי: {DIFFICULTY_LABELS[course.difficulty] || DIFFICULTY_LABELS.unknown}
                    </span>
                    <span className={`plan-badge ${isTaken ? "taken" : "not-taken"}`}>
                      {isTaken ? "נלקח" : "עדיין לא נלקח"}
                    </span>
                  </div>
                </div>

                <p className="muted">{course.detail}</p>
                <p className="plan-effort-note">
                  <strong>עומס בסמסטר:</strong> {course.effortNote}
                </p>

                <div className="plan-course-actions">
                  <button
                    className={`builder-toggle${isPlanned ? " active" : ""}`}
                    onClick={() => setPlannedCourses((current) => toggleItem(current, course.name))}
                    type="button"
                  >
                    {isPlanned ? "הסר מהמערכת" : "הוסף למערכת"}
                  </button>

                  <button
                    className={`builder-toggle${isTaken ? " active" : ""}`}
                    onClick={() => setTakenCourses((current) => toggleItem(current, course.name))}
                    type="button"
                  >
                    {isTaken ? "בטל סימון כנלקח" : "סמן כנלקח"}
                  </button>
                </div>

                {isTaken && (
                  <div className="plan-taken-block">
                    <h4>המלצות לקורס שנלקח</h4>
                    {course.tips.length > 0 ? (
                      <ul className="guide-list plan-tips-list">
                        {course.tips.map((tip) => (
                          <li key={`${course.name}-${tip}`}>{tip}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="muted">עדיין לא נוספו המלצות ממוקדות לקורס זה.</p>
                    )}

                    <h4>סיכומים זמינים</h4>
                    {course.summaries.length > 0 ? (
                      <div className="plan-summary-links">
                        {course.summaries.map((summary) => (
                          <Link
                            className="btn secondary plan-summary-link"
                            href={`/summary/${summary.id}`}
                            key={summary.id}
                          >
                            {summary.topic || "מעבר לסיכום"}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="muted">לא נמצאו סיכומים זמינים לקורס זה כרגע.</p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {visibleCourses.length === 0 && (
          <section className="card empty-state">
            <p>לא נמצאו קורסים שתואמים לסינון שבחרתם.</p>
          </section>
        )}
      </div>
    </section>
  );
}
