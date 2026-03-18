import { getCourses, getSummaryById } from "@/lib/summaries";
import RecommendationsGrid from "./RecommendationsGrid";
import SiteNav from "@/components/SiteNav";

const MANUAL_RECOMMENDATIONS = [
  {
    aliases: ["סטטיסטיקה"],
    tips: [
      "קורס ממש נחמד.",
      "חשוב בעיקר להקשיב לשיעורי תרגול ולדעת אותם.",
      "לדעת לפתור את תרגילי הבית.",
      "מבחינת סיכומים: https://drive.google.com/file/d/1RRrNClbpvNtchstXjCQvHuMEDBbyguvM/view?usp=sharing",
      "צריך לתרגל הרבה מבחנים כי בסופו של דבר הרעיון חוזר על עצמו.",
      "הכי חשוב ללמוד להשתמש בנוסחאות כמו שצריך.",
    ],
  },
  {
    aliases: ["תכפ", "תכנות לוגי", "תכנות פונקציונאלי", "תכנות פונקציונלי"],
    displayName: "תכנות פונקציונאלי ולוגי",
    tips: [
      "קורס בסך הכל בסדר.",
      "יש ביוטיוב ממש אנשים שפותרים דברים בפייתון.",
      "פלייליסט מומלץ של חאיק על תכנות לוגי: https://www.youtube.com/watch?v=bQQTE9dy4wA&list=PLCwz3juQ1jJhKdfdTqXi0E4b-9O60ukLo",
      "יש גם סיכומים של חאיק: https://yohananha.wixsite.com/smellsgood",
    ],
  },
  {
    aliases: ["משדי\"פ", "משדיפ", "משוואות דפרנציאליות"],
    displayName: "משוואות דפרנציאליות",
    tips: [
      "סיכום של יפית מעיין מומלץ.",
      "צריך לדעת נוסחאות ולעשות סדר במה משתמשים, מתי ואיך.",
      "מומלץ לתרגל מבחנים כמה שיותר.",
    ],
  },
  {
    aliases: ["מבוא לבינה מלאכותית"],
    tips: [
      "פשוט לקרא סיכום בקטנה על החומר ולתרגל מבחנים.",
      "זה כמו חידות סודוקו.",
      "צריך לדעת איך לפתור וזה עניין של שניה.",
      "מומלץ מאוד: https://drive.google.com/drive/folders/1lxXhjBb5RhcfKT09ynl3AUdBXEg7rbHa?usp=drive_link",
    ],
  },
  {
    aliases: ["בדידה"],
    tips: ["קורס ממש נחמד. מתמטיקה פשוט ללמוד ולתרגל."],
  },
  {
    aliases: ["אוטומטים"],
    tips: [
      "הוא כן נורא למי שלא שולט בחומר וסבבה למי שכן.",
      "פשוט ללמוד הכל כמו שצריך ולדעת להוכיח מה שצריך.",
      "לזכור ממש כללים ומשפטים.",
      "עשיתי סיכום לא מסודר אבל בעיני מי שיודע אותו בע\"פ הוא שווה עובר.",
    ],
  },
  {
    aliases: ["אלגוריתמים"],
    tips: [
      "אם המרצה מלמד טוב - לא לוותר על נוכחות. אם המרצה היא הדס טישלר - זכיתם.",
      "חשוב להיות בשיעורים ובתרגולים ולעשות את תרגילי הבית.",
      "לפעמים במבחן יש שאלות שלקוחות מתרגילי הבית.",
      "המצגות של הקורס בעברית ומעולות - ללמוד אותן טוב.",
      "כמובן לתרגל מבחנים כמה שיותר.",
      "לנסות לפתור בעצמכם את השאלות הפתוחות וללמוד איך לנסח נכון את התשובה.",
      "יש בנוסף סיכום של חאיק: https://yohananha.wixsite.com/smellsgood",
    ],
  },
  {
    aliases: ["חישוביות"],
    tips: [
      "לנכוח בשיעורים, ולכתוב ביד כל הוכחה ותרגיל שנלמד.",
      "בסופו של דבר אלו מיומנויות ותרגילים שהם על אותו תבנית של הוכחה.",
      "חשוב ממש להיות בקצב.",
      "הסוד הוא תרגול וכמה שיותר.",
    ],
  },
  {
    aliases: ["לוגיקה"],
    tips: [
      "הקורס עצמו ממש קל ולעומתו המבחן מזעזע.",
      "לכן חשוב להשקיע בעיקר בתרגול מבחנים ובהבנה של איך הראש של תרצה חושב.",
    ],
  },
  {
    aliases: ["מבוא לתקשורת מחשבים"],
    tips: [
      "קורס שהידע שלו חשוב מאד בתעשיה.",
      "ממליצה ממש!!! על הסיכום הזה: https://docs.google.com/document/d/1xLg-1mk9LXTwB1fgrVekmgqYsusIvV6k1MfsFJorQ9A/edit?usp=sharing",
      "לעניות דעתי פשוט לדעת את הסיכום הזה טוב ואין צורך אפילו לנכוח בשיעורים.",
      "לגבי המעבדות - הנוכחות חובה אז אין ברירה.",
    ],
  },
  {
    aliases: ["מבוא למדעי המחשב"],
    tips: [
      "קורס ממש חשוב, להשקיע בו כמה שצריך, הוא הבסיס של התכנות.",
      "המצגות בקורס מעולות, כדאי ללמוד מהם.",
      "מומלץ הפלייליסט של מאיר קומר ביוטיוב: https://www.youtube.com/watch?v=9zOZMpPh9Uk&list=PL_fdnkHfgpzLK2QXCsTPBv0vibf_KZLSn",
    ],
  },
  {
    aliases: ["מבנה נתונים א", "מבנה נתונים א'"],
    tips: [
      "קורס ממש חשוב בתעשיה.",
      "להשקיע בו.",
      "צריך לדעת בע\"פ את הזמני ריצה, ואלגוריתמים מסוימים של ריצה.",
      "ממליצה ממש על הפליליסט של מאיר קומר ביוטיוב.",
      "יש לו בערוץ כמה פליליסטים על מבנה נתונים. תצפו בהכל.",
      "בנוסף מומלץ הסיכום: https://docs.google.com/document/d/1KzeEyeodtlXyK8_plz54LMAbm_jpSqkIk-6dDJigZso/edit?usp=sharing",
    ],
  },
  {
    aliases: ["מבנה נתונים ב", "מבנה נתונים ב'"],
    tips: [
      "קורס ממש חשוב.",
      "צריך פשוט ללמוד בע\"פ את כל הזמני ריצה והאלגוריתמים.",
      "מומלץ הסיכום של חאיק: https://drive.google.com/file/d/1cbD3H99havRhXEOR8Qs2sYVOwWPPQjEg/view?usp=sharing",
    ],
  },
  {
    aliases: ["מערכות הפעלה"],
    tips: [
      "מומלץ הסיכום של גד כהן: https://drive.google.com/file/d/1jpamUAerR_cwCNu7Rc2RW6TJTGjFlcSz/view?usp=sharing",
      "בנוסף ללמוד מהמצגות של המעבדה.",
      "בעיני מי שיודע טוב מאד את המצגות של המעבדה והסיכום הזה, ורק לוודא שזה מקיף את כל החומר, יכול לעבור בציון טוב.",
    ],
  },
  {
    aliases: ["סדנא", "סדנה", "תכנות מתקדם"],
    tips: ["המצגות בקורס של אפרת עמר מעולות."],
  },
  {
    aliases: ["עיצוב ותכנות מונחה עצמים"],
    tips: [
      "ממליצה על נוכחות בשיעורים. או לכל הפחות בתרגולים.",
      "ללמוד מהמצגות ולתרגל מבחנים כמה שיותר.",
    ],
  },
  {
    aliases: ["קומפיילרים"],
    tips: [
      "מומלץ מאוד הסיכום של חאיק: https://yohananha.wixsite.com/smellsgood",
      "אפילו ללמוד רק מהסיכום מי שמצליח להבין, ובנוסף נוכחות בתרגולים.",
      "חשוב ממש לדעת לפתור את תרגילי הבית.",
      "המבחן הוא על אותו רעיון של תרגילי הבית.",
      "כדאי לתרגל כמה שיותר מבחנים.",
      "זה על אותו רעיון, כמו אלגוריתמים ותבניות של דרך פתרון.",
    ],
  },
  {
    aliases: ["הנדסת תוכנה"],
    tips: [
      "המצגות של הקורס בעברית והן מעולות.",
      "לדעת אותן פשוט טוב.",
      "יש גם סיכום של חאיק: https://yohananha.wixsite.com/smellsgood",
    ],
  },
  {
    aliases: ["מערכות ספרתיות"],
    tips: [
      "ההקלטות בקורס ממש טובות.",
      "יש גם סרטונים קצרים מעולים ביוטיוב.",
      "מומלץ פלייליסט: https://www.youtube.com/watch?v=rvYUzgAtqF0&list=PLuIvtSLfyCdgE45hdQj0N8okA1B5OI81-",
    ],
  },
  {
    aliases: ["קדם מתמטיקה"],
    tips: [
      "יש קורס הכנה מעולה בערוץ יוטיוב של הטכניון.",
      "יש שם כמה פלייליסטים על נושאים שונים.",
      "מומלץ: https://www.youtube.com/watch?v=SEm29ldLvoU&list=PLCvkcH5OUmClFz8xQQx_8VfdPxFX63koX",
    ],
  },
  {
    aliases: ["אינפי 1"],
    tips: [
      "בערוץ היוטיוב של הטכניון יש פלייליסטים מעולים של צנזור.",
      "מומלץ לצפות על מהירות פלוס 2.",
      "ערוץ: https://www.youtube.com/@technionteaches/playlists",
    ],
  },
  {
    aliases: ["הכרת משאבי הספריה", "הכרת משאבי הספרייה"],
    tips: [
      "בטלגרם יש ערוץ עם תשובות לרוב השאלות בבחנים.",
      "קישור לערוץ: https://t.me/joinchat/AAAAAFOpxYwJweFkBhM55g",
    ],
  },
];

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

function matchesAliases(courseName, aliases) {
  const normalizedCourseName = normalizeCourseName(courseName);
  return aliases.some((alias) => {
    const normalizedAlias = normalizeCourseName(alias);
    return (
      normalizedCourseName.includes(normalizedAlias) ||
      normalizedAlias.includes(normalizedCourseName)
    );
  });
}

export default async function RecommendationsPage() {
  const courses = await getCourses();
  const coveredCourseNames = new Set();

  const manualCoursesWithTips = MANUAL_RECOMMENDATIONS.map((entry) => {
    const matchedCourse = courses.find((course) =>
      matchesAliases(course.courseName, entry.aliases)
    );

    if (matchedCourse) {
      coveredCourseNames.add(matchedCourse.courseName);
    }

    return {
      courseName: entry.displayName || entry.aliases[0],
      summaries: matchedCourse?.summaries || [],
      tips: entry.tips,
    };
  });

  const extraCoursesFromNotes = (
    await Promise.all(
      courses
        .filter((course) => !coveredCourseNames.has(course.courseName))
        .map(async (course) => {
          const summaries = await Promise.all(
            course.summaries.map((summary) => getSummaryById(summary.id))
          );
          const noteTips = [
            ...new Set(summaries.flatMap((summary) => splitNoteToTips(summary?.note))),
          ];

          if (noteTips.length === 0) {
            return null;
          }

          return { ...course, tips: noteTips };
        })
    )
  ).filter(Boolean);

  const coursesWithTips = [...manualCoursesWithTips, ...extraCoursesFromNotes];

  return (
    <main className="shell">
      <SiteNav />

      <section className="hero">
        <span className="hero-kicker">טיפים שימושיים ללמידה</span>
        <h1>עמוד המלצות</h1>
        <p>
          קורסים שלא צוינו ידנית אך קיימת להם הערה בעמוד הסיכום יופיעו כאן לפי
          ההערה. קורס ללא המלצות לא יופיע בעמוד.
        </p>
      </section>

      <h2 className="section-title">המלצות לפי קורס</h2>
      <RecommendationsGrid coursesWithTips={coursesWithTips} />
    </main>
  );
}
