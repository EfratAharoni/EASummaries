import Link from "next/link";
import SiteNav from "@/components/SiteNav";

const SITE_FEATURES = [
  {
    href: "/courses",
    icon: "01",
    accent: "#f0a11f",
    title: "סיכומים",
    desc: "מאגר סיכומי כתב-יד לפי קורסים ונושאים.",
  },
  {
    href: "/recommendations",
    icon: "02",
    accent: "#e06a2f",
    title: "המלצות לכל קורס",
    desc: "מה כדאי לתרגל, איך להתכונן למבחן ולינקים לסיכומים או סרטוני למידה מומלצים.",
  },
  {
    href: "/guide",
    icon: "03",
    accent: "#2d7a73",
    title: "מדריך לסטודנט המתחיל",
    desc: "טיפים על ניהול זמן, עומס, למידה יעילה והתחלה רגועה יותר של התואר.",
  },
  {
    href: "/electives",
    icon: "04",
    accent: "#9356a0",
    title: "קורסי רשות",
    desc: "המלצות על אילו קורסי רשות כדאי לבחור לדעתי.",
  },
  {
    href: "/system-builder",
    icon: "05",
    accent: "#4da6d9",
    title: "בניית מערכת",
    desc: "הכוונה לבניית מערכת מאוזנת ויעילה לפי רמת הקושי והעומס של כל קורס.",
  },
];

const STORY_POINTS = [
  "סיכומים אמיתיים מתוך התואר",
  "המלצות פרקטיות לקראת מבחנים",
  "עזרה בתכנון עומס ומערכת",
];

export default async function HomePage() {
  return (
    <main className="shell landing-page">
      <SiteNav />

      <section className="landing-hero" aria-labelledby="landing-title">
        <h1 id="landing-title" className="landing-title">
          ללמוד חכם במקום ללמוד קשה
        </h1>
        <p className="landing-subtitle">
          סיכומים, טיפים וניסיון אישי מבוגרת מדעי המחשב, כדי לעזור לסטודנטים
          בתחילת הדרך להבין איך ללמוד נכון ולהרגיש פחות לבד.
        </p>

        <div className="landing-hero-actions">
          <Link href="/courses" className="btn primary landing-main-btn">
            כניסה למאגר הסיכומים
          </Link>
          <Link href="/guide" className="landing-soft-link">
            טיפים לסטודנט המתחיל
          </Link>
        </div>

        <form action="/courses" method="get" className="landing-search-form">
          <input
            type="search"
            name="q"
            placeholder="חפש קורס או נושא"
            className="landing-search-input"
            aria-label="חיפוש קורס או נושא"
          />
        </form>
      </section>

      <section className="landing-story-grid" aria-labelledby="origin-title">
        <article className="landing-story">
          <h2 id="origin-title">איך האתר נולד?</h2>
          <div className="landing-story-text">
            <p>
              כסטודנטית חדשה למדעי המחשב הגעתי לתואר בלי הכוונה ובלי רקע קודם
              בתכנות. מהר מאוד גיליתי שהמעבר מהתיכון לאקדמיה הוא מאתגר הרבה יותר
              ממה שדמיינתי. בתיכון הייתי תלמידה מצטיינת והייתי בטוחה שהכול יהיה
              בשליטה, אבל כבר בסמסטר הראשון הבנתי שזה עולם אחר לגמרי.
            </p>
            <p>
              למרות שעות רבות של למידה, היה קשה להבין מה באמת חשוב, איפה למצוא
              סיכומים טובים ואיך לנהל נכון את הזמן והעומס. עם הזמן למדתי איך ללמוד
              בצורה חכמה יותר, אספתי כלים ושיטות שעזרו לי לעבור את הקורסים
              בהצלחה ולצבור ביטחון.
            </p>
            <p>
              האתר הזה נוצר כדי לרכז את כל הידע הזה במקום אחד, ולעזור לסטודנטים
              בתחילת הדרך ללמוד בצורה יעילה יותר ולהתחיל את התואר בצורה חכמה,
              מסודרת ובטוחה יותר.
            </p>
          </div>
        </article>

        <aside className="landing-story-aside" aria-label="מה מקבלים באתר">
          <h3>מה מחכה כאן בפועל</h3>
          <ul className="landing-story-points">
            {STORY_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="landing-story-note">
            לא רק סיכומים, אלא גם דרך לעשות סדר בתקופה שהיא בדרך כלל מאוד מבלבלת.
          </div>
        </aside>
      </section>

      <section className="landing-features" aria-labelledby="features-title">
        <h2 id="features-title" className="section-title">
          מה אפשר למצוא באתר
        </h2>
        <div className="landing-features-grid">
          {SITE_FEATURES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="landing-feature-card"
              style={{ "--landing-accent": item.accent }}
            >
              <span className="landing-feature-index">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span className="landing-feature-cta">לצפייה</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-empathy" aria-labelledby="empathy-title">
        <h2 id="empathy-title">גם אתם מרגישים מבולבלים בתחילת התואר?</h2>
        <p>
          הרבה סטודנטים מגיעים בלי הכוונה ובלי לדעת איך ללמוד נכון לתואר.
        </p>
        <p>
          האתר הזה נועד לעשות קצת סדר ולעזור לכם להתקדם בקצב שמתאים לכם.
        </p>
        <div className="landing-empathy-actions">
          <Link href="/guide" className="landing-inline-chip">
            התחלה רגועה
          </Link>
          <Link href="/courses" className="landing-inline-chip">
            סיכומים לפי נושא
          </Link>
          <Link href="/system-builder" className="landing-inline-chip">
            תכנון מערכת
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <span>לומדים חכם · {new Date().getFullYear()}</span>
        <div className="landing-footer-links">
          {[
            { href: "/courses", label: "סיכומים" },
            { href: "/recommendations", label: "המלצות" },
            { href: "/guide", label: "מדריך" },
            { href: "/electives", label: "קורסי רשות" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="footer-link">
              {label}
            </Link>
          ))}
        </div>
        <p className="landing-footer-note">
          נבנה מתוך רצון לעזור לסטודנטים בתחילת הדרך.
          <br />
          לשאלות, המלצות והערות מוזמנים לפנות במייל:
          {" "}
          aharoni123456789@gmail.com
        </p>
      </footer>
    </main>
  );
}
