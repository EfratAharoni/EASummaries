import SiteNav from "@/components/SiteNav";

export default function ElectivesPage() {
  return (
    <main className="shell">
      <SiteNav />

      <section className="hero">
        <span className="hero-kicker">מה כדאי לקחת ומה פחות</span>
        <h1>קורסי רשות</h1>
        <p>
          סקירה של קורסי הרשות הנפוצים: מה קל, מה מלמד, ומה מומלץ לפי מטרות שונות.
        </p>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">💡</span>
          איך לבחור קורס רשות?
        </h2>
        <ul className="guide-list">
          <li>
            זה תלוי בשאלה מה אתם מחפשים: הכי קלים, הכי מלמדים, או הכי מעניינים אתכם.
          </li>
          <li>
            <strong className="guide-emphasis">ההמלצה שלי היא לקחת קורסים פרקטיים</strong>
            {" "}(כמו מיני״פ בחלונות, מיחשוב ענן וכד׳) בעיקר כי לאורך התואר כמעט ואין פרקטיקה.
          </li>
          <li>
            אלא אם כן אתם מרגישים ממש בעומס ומחפשים להקל על עצמיכם, או שמעניין אתכם קורס מסוים.
          </li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🎓</span>
          קורסים מלמדים
        </h2>
        <ul className="guide-list">
          <li>
            <strong className="guide-emphasis">מיני פרויקט במערכת חלונות (3 נ״ז)</strong>
            {" "}— קורס מאוד חשוב ומלמד, אבל גם מאוד קשה וכביכול ״לא שווה את הנזים״.
            עשיתי אותו לפני עידן ה-AI, אז לדעתי היום הוא הרבה יותר קל. ממליצה עליו כי בעיני הוא ממש חשוב.
          </li>
          <li>
            <strong className="guide-emphasis">מחשוב ענן (2.5 נ״ז)</strong>
            {" "}— קורס ממש חשוב ומלמד. ממליצה. חשוב לבחור קבוצה טובה.
          </li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🌿</span>
          קורסים קלים יחסית
        </h2>
        <p className="guide-note">
          אם הרצון הוא לקחת קורסים כמה שיותר קלים, המומלצים הם:
        </p>
        <ul className="guide-list">
          <li>
            <strong className="guide-emphasis">חשמל (3 נ״ז)</strong>
            {" "}— נחשב קל יחסית ושווה את הנזים.
          </li>
          <li>
            <strong className="guide-emphasis">מבוא לבינה מלאכותית (3 נ״ז)</strong>
            {" "}— קורס קל. צריך ללמוד את הטכניקה לפתרון מבחנים (כמו חידות, ראה פירוט בקורס עצמו).
          </li>
          <li>
            <strong className="guide-emphasis">מבוא לאבטחת מידע (3 נ״ז)</strong>
            {" "}— לא לקחתי את הקורס הזה, אבל ממה ששמעתי הוא נחשב לקורס קל, אם כי תרגילי הבית דורשים.
          </li>
          <li>
            <strong className="guide-emphasis">מהשכלה לתעסוקה (2 נ״ז)</strong>
            {" "}— קל, לא מלמד יותר מדי. המינוס: נוכחות חובה בזום. הפלוס: אין מבחן. יש קצת עבודות שה-AI עושה בשנייה.
          </li>
          <li>
            <strong className="guide-emphasis">התנדבות (2 נ״ז)</strong>
            {" "}— ניתן לקבל 2 נ״ז על התנדבות או מילואים.
          </li>
        </ul>
      </section>
    </main>
  );
}
