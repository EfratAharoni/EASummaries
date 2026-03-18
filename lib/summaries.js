import { readdir } from "fs/promises";
import path from "path";

const demoSummaries = [
  {
    id: "demo-algebra-1",
    courseName: "אלגברה לינארית",
    topic: "מרחבים וקטוריים",
    description: "סיכום בסיסים, תלות לינארית וממדים עם דוגמאות לפתרון תרגילים.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "demo-probability-1",
    courseName: "הסתברות",
    topic: "התפלגויות בדידות",
    description: "סקירה של ברנולי, בינומית ופואסון עם תרגול שאלות מבחן.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "demo-logic-1",
    courseName: "לוגיקה למדעי המחשב",
    topic: "הוכחות ואינדוקציה",
    description: "תבניות הוכחה נפוצות והקשר בין לוגיקה מתמטית לאלגוריתמים.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

function normalizeFileName(fileName) {
  return String(fileName || "")
    .replace(/\.pdf$/i, "")
    .replace(/["'`׳״]/g, "")
    .replace(/[\[\]{}]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractVariantLabel(name) {
  const match = String(name || "").match(/\(([^)]+)\)$/);
  return match ? normalizeFileName(match[1]) : null;
}

function getCanonicalCourseName(name) {
  const normalized = normalizeFileName(name);

  if (normalized.includes("אלגוריתמים")) {
    return "אלגוריתמים";
  }

  if (normalized.includes("מבוא לתקשורת מחשבים")) {
    return "מבוא לתקשורת מחשבים";
  }

  return normalized;
}

function normalizeForMatch(value) {
  return normalizeFileName(value).toLowerCase();
}

function getSummaryNote(summary) {
  const text = normalizeForMatch(`${summary.courseName} ${summary.topic}`);

  if (text.includes("אוטומטים")) {
    return "זה לא סיכום זה יותר כמו דף טרור של מושגים ודברים שחשוב לזכור!";
  }

  if (text.includes("אינפי 1")) {
    return "ממליצה ממש לתרגל מבחנים. אפילו אם לא מבינים את הפתרון, לכתוב את הפתרון של המרצה בדף ואז לנסות לכתוב לבד.\nממליצה כן ללמוד בעל פה את המשפטים להוכחה.";
  }

  if (text.includes("אלגוריתמים") && text.includes("מורחב")) {
    return "בסוף הסיכום יש אוסף משפטים נכונים מתוך החלק האמריקאי של המבחנים.";
  }

  if (text.includes("אלגוריתמים") && text.includes("קצר")) {
    return "חשוב לדעת כל מה שכתוב ממש בעל פה!";
  }

  if (text.includes("בסיסי נתונים") || text.includes("בסנת")) {
    return "פתרתי מבחן עם הסבר מפורט על הדרך. ניתן להסיק מכך חוקיות לשאלות תואמות.";
  }

  if (text.includes("הנדסת תוכנה")) {
    return "בסוף הסיכום כתבתי נקודות שחשוב לזכור, מתוך מבחנים.\nאגב המצגות של הקורס מעולות, כדאי ממש ללמוד מהן.";
  }

  if (text.includes("הסתברות")) {
    return "בסוף הסיכום כתבתי שאלות ממבחנים ודרך איך לפתור אותם.\nבעמוד האחרון יש טבלת סיכום התפלגויות, חשוב!\nההוכחות שצריך ללמוד בעל פה ממש קלות. לא לוותר על זה!";
  }

  if (text.includes("חישוביות")) {
    return "קרדיט לסיכום מגיע למרצה דבורה בר האגדית.\nהסיכום נכתב מתוך הסיכומים והשיעורים שלה.";
  }

  if (text.includes("כריית מידע")) {
    return "עברתי ממש על מבחנים וכתבתי דרך איך לפתור שאלות וכן נקודות ודברים שחשוב לזכור.";
  }

  if (text.includes("לינארית ב")) {
    return "ההוכחות שצריך ללמוד בעל פה קלות ממש, לא לוותר!";
  }

  if (text.includes("מבוא לבינה מלאכותית")) {
    return "יש סיכומים מעולים, כדאי ללמוד מהם.\nבגדול כדי לעבור את המבחן לא צריך לדעת את כל החומר אלא ללמוד איך לפתור את השאלות במבחן, ממש כמו פתרון חידות.";
  }

  if (text.includes("שות") && text.includes("מבוא לתקשורת מחשבים")) {
    return "עברתי על שאלות מתוך הבחנים וכתבתי דרך פתרון.";
  }

  if (text.includes("מבוא לתקשורת מחשבים")) {
    return "ממליצה על הסיכום של יצחק ברוידא.";
  }

  if (text.includes("מבנה המחשב") || text.includes("מבנח")) {
    return "לשים לב שחלק מהחומר לא מעודכן.";
  }

  if (text.includes("מבנה נתונים א") || text.includes("מבנת א")) {
    return "לדעת בעל פה סדרי גודל וזמני ריצה.\nבסוף הסיכום יש טבלה מעולה של סיכום מיונים.";
  }

  if (text.includes("מערכות הפעלה")) {
    return "בסוף הסיכום יש פתרון שאלות ממבחנים.\nממליצה על הסיכום של גד ועל המצגות של התרגול.\nחשוב לדעת לפתור את האלגוריתמים.";
  }

  if (text.includes("סדנא") || text.includes("סדנה")) {
    return "המצגות של אפרת עמר מעולות.";
  }

  if (text.includes("סטטיסטיקה")) {
    return "לתרגל הרבה מבחנים, לדעת דרך פתרון של כל שאלה. זה מאוד תבניתי.\nבסוף הסיכום כתבתי הערות חשובות וטיפים לאיך לגשת לשאלות במבחן.";
  }

  return null;
}

function getLocalSummaryId(fileName) {
  return `local-${encodeURIComponent(fileName)}`;
}

async function getLocalPdfSummaries() {
  try {
    const pdfDir = path.join(process.cwd(), "public", "pdfs");
    const files = await readdir(pdfDir);

    return files
      .filter((file) => file.toLowerCase().endsWith(".pdf"))
      .sort((a, b) => a.localeCompare(b, "he"))
      .map((fileName) => {
        const title = normalizeFileName(fileName);
        return {
          id: getLocalSummaryId(fileName),
          courseName: title,
          topic: title,
          description: "סיכום מקובץ PDF שהועלה לתיקיית האתר.",
          pdfUrl: `/pdfs/${encodeURIComponent(fileName)}`,
        };
      });
  } catch {
    return [];
  }
}

export async function getAllSummaries() {
  const localPdfSummaries = await getLocalPdfSummaries();

  if (localPdfSummaries.length > 0) {
    return localPdfSummaries;
  }

  return demoSummaries;
}

export async function getCourses() {
  const summaries = await getAllSummaries();
  const grouped = new Map();

  for (const summary of summaries) {
    const canonicalCourseName = getCanonicalCourseName(summary.courseName);
    const variantLabel = extractVariantLabel(summary.courseName);
    const current = grouped.get(canonicalCourseName) || {
      courseName: canonicalCourseName,
      summaries: [],
    };

    current.summaries.push({
      ...summary,
      topic: variantLabel || summary.topic,
    });
    grouped.set(canonicalCourseName, current);
  }

  return Array.from(grouped.values()).sort((a, b) =>
    a.courseName.localeCompare(b.courseName, "he")
  );
}

export async function getSummaryById(id) {
  const normalizedId = Array.isArray(id) ? id[0] : id;

  if (typeof normalizedId !== "string" || normalizedId.length === 0) {
    return null;
  }

  if (normalizedId.startsWith("local-")) {
    const fileName = decodeURIComponent(normalizedId.replace("local-", ""));
    const title = normalizeFileName(fileName);

    const summary = {
      id: normalizedId,
      courseName: title,
      topic: title,
      description: "סיכום מקובץ PDF שהועלה לתיקיית האתר.",
      pdfUrl: `/pdfs/${encodeURIComponent(fileName)}`,
    };

    return {
      ...summary,
      note: getSummaryNote(summary),
    };
  }

  const demoSummary = demoSummaries.find((item) => item.id === normalizedId);
  if (!demoSummary) {
    return null;
  }

  return {
    ...demoSummary,
    note: getSummaryNote(demoSummary),
  };
}
