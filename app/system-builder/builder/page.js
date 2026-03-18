import { Suspense } from "react";
import SiteNav from "@/components/SiteNav";
import { getCourses, getSummaryById } from "@/lib/summaries";
import { COURSES, SYSTEM_PLANNER_GUIDE } from "../data";
import SystemPlanBuilderClient from "./SystemPlanBuilderClient";

function normalizeCourseName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/["'`׳״]/g, "")
    .replace(/[()\[\]{}.,:;!?-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitNoteToTips(note) {
  return String(note || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function getMatchScore(source, target) {
  const normalizedSource = normalizeCourseName(source);
  const normalizedTarget = normalizeCourseName(target);

  if (!normalizedSource || !normalizedTarget) {
    return 0;
  }

  if (normalizedSource === normalizedTarget) {
    return 5;
  }

  if (
    normalizedSource.includes(normalizedTarget) ||
    normalizedTarget.includes(normalizedSource)
  ) {
    return 4;
  }

  const sourceWords = normalizedSource.split(" ");
  const targetWords = normalizedTarget.split(" ");
  const commonWords = sourceWords.filter((word) => word && targetWords.includes(word));

  if (commonWords.length >= 2) {
    return 3;
  }

  if (commonWords.length === 1) {
    return 1;
  }

  return 0;
}

function findBestMatch(items, targetName, getName) {
  let bestItem = null;
  let bestScore = 0;

  for (const item of items) {
    const score = getMatchScore(getName(item), targetName);
    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  }

  return bestScore >= 3 ? bestItem : null;
}

export default async function AdvancedSystemBuilderPage() {
  const coursesFromSummaries = await getCourses();

  const coursesWithSummaryInsights = (
    await Promise.all(
      coursesFromSummaries.map(async (course) => {
        const fullSummaries = await Promise.all(
          course.summaries.map((summary) => getSummaryById(summary.id))
        );

        const summaries = fullSummaries
          .filter(Boolean)
          .map((summary) => ({
            id: summary.id,
            topic: summary.topic,
          }));

        const tips = [
          ...new Set(fullSummaries.flatMap((summary) => splitNoteToTips(summary?.note))),
        ].slice(0, 4);

        return {
          courseName: course.courseName,
          summaries,
          tips,
        };
      })
    )
  ).filter(Boolean);

  const recommendedCourseNames = SYSTEM_PLANNER_GUIDE.flatMap((year) =>
    year.semesters.flatMap((semester) => semester.courses)
  );

  const allCourseNames = [
    ...new Set([
      ...COURSES.map((course) => course.name),
      ...recommendedCourseNames,
      ...coursesWithSummaryInsights.map((course) => course.courseName),
    ]),
  ].sort((a, b) => a.localeCompare(b, "he"));

  const courseCatalog = allCourseNames.map((courseName) => {
    const matchedMeta = findBestMatch(COURSES, courseName, (item) => item.name);
    const matchedSummaryData = findBestMatch(
      coursesWithSummaryInsights,
      courseName,
      (item) => item.courseName
    );

    return {
      name: courseName,
      difficulty: matchedMeta?.difficulty || "unknown",
      detail: matchedMeta?.detail || "קורס מתוך המלצות המסלול.",
      effortNote: matchedMeta?.effortNote || "אין מידע נוסף כרגע לגבי עומס במהלך הסמסטר.",
      summaries: matchedSummaryData?.summaries || [],
      tips: matchedSummaryData?.tips || [],
    };
  });

  return (
    <main className="shell">
      <SiteNav />

      <section className="hero">
        <span className="hero-kicker">בניית מערכת אינטראקטיבית</span>
        <h1>בנאי מערכת מתקדם</h1>
        <p>
          סמנו אילו קורסים כבר לקחתם, קבלו אינדיקציה של רמת קושי לכל קורס,
          שלפו סיכומים והמלצות מתוך החומר הקיים, ובנו מערכת אישית עם הוספה והסרה
          חופשית של קורסים.
        </p>
      </section>

      <Suspense
        fallback={
          <section className="card">
            <p className="muted">טוען את בנאי המערכת...</p>
          </section>
        }
      >
        <SystemPlanBuilderClient
          courseCatalog={courseCatalog}
          plannerGuide={SYSTEM_PLANNER_GUIDE}
        />
      </Suspense>
    </main>
  );
}
