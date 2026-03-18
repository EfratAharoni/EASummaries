import SiteNav from "@/components/SiteNav";

export default function GuidePage() {
  return (
    <main className="shell">
      <SiteNav />

      <section className="hero">
        <span className="hero-kicker">כלים והרגלים שיעשו סדר בתואר</span>
        <h1>המדריך לסטודנט המתחיל</h1>
        <p>
          ריכוז טיפים פרקטיים ללמידה, התנהלות נכונה לאורך הסמסטר, וניהול נכון של
          תקופת מבחנים.
        </p>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🔗</span>
          קישורים חשובים
        </h2>
        <ul className="guide-list">
          <li>
            <strong>דרייב יתמ״ל:</strong>{" "}
            <a
              className="tip-link"
              href="https://drive.google.com/drive/folders/1ywwDo-LdYiKGFlcUs3Fccp_mBYrH68Jx?usp=sharing"
              target="_blank"
              rel="noreferrer noopener"
            >
              קישור לדרייב
            </a>
          </li>
          <li>
            <strong>הקלטות קורסים בטלגרם:</strong>{" "}
            <a
              className="tip-link"
              href="https://t.me/+0MYovTIjabk2ZDA0"
              target="_blank"
              rel="noreferrer noopener"
            >
              קישור לערוץ
            </a>
          </li>
          <li>
            היתמ״ל הוא דרייב עם פתרונות לתרגילי בית וסיכומים לקורסים שונים.
            <strong className="guide-emphasis"> חשוב מאוד לוודא שהתרגילים מעודכנים ולא להעתיק.</strong>
          </li>
          <li>
            המטרה של התרגילים היא ללמוד תוך כדי הסמסטר ולא להשאיר הכול לתקופת
            המבחנים שגם ככה עמוסה.
          </li>
          <li>
            ערוץ ההקלטות בטלגרם יכול לחסוך זמן ולעזור מאוד בלמידה. עם זאת, חשוב
            לא להישאב לזה כשאין צורך.
          </li>
          <li>
            הכלל הוא: אם המרצה טוב ומובן, תעשו הכול כדי להגיע לשיעורים ולהישאר
            בקצב. הקלטות טובות להשלמת שיעורים שפספסתם או אם המרצה פחות ברור.
          </li>
          <li>
            <strong className="guide-emphasis">הדבר הכי חשוב הוא לא להשאיר חומר לסוף הסמסטר.</strong>
          </li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🧭</span>
          טיפים כלליים לתואר
        </h2>
        <ul className="guide-list">
          <li>
            קודם כל, אל תלחצו. בהתחלה הכול יכול להיראות לא מובן ואפילו בלתי
            אפשרי, אבל הקושי עובר.
          </li>
          <li>
            יום אחד תמצאו את עצמכם עם תואר ביד.
            <strong className="guide-emphasis"> הכי חשוב לנסות ליהנות מהדרך.</strong>
          </li>
          <li>
            עם הזמן נהיה יותר קל, לא כי התואר באמת נהיה קל יותר, אלא כי מתרגלים
            לקושי ולומדים איך ללמוד נכון.
          </li>
          <li>
            תאמינו בעצמכם ותשמרו על מחשבות חיוביות. איך שאתם מתייחסים לקורס,
            כך הוא ״מתייחס״ אליכם.
          </li>
          <li><strong className="guide-emphasis">אם תשכנעו את עצמכם שאין סיכוי לעבור, יש סיכוי גבוה שזה באמת יקרה.</strong></li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🧠</span>
          איך לנצל נכון את תקופת המבחנים
        </h2>
        <ul className="guide-list">
          <li><strong className="guide-emphasis">שליש מהזמן - חזרה על החומר וסיכום נקודות חשובות.</strong></li>
          <li><strong className="guide-emphasis">שני שליש מהזמן - תרגול מבחנים.</strong></li>
          <li>
            בתואר, בניגוד לתיכון, תרגול מבחנים הוא בהרבה קורסים הסוד להצלחה.
          </li>
          <li>
            אפשר לדעת את החומר מצוין ועדיין להיכשל, כי צריך ללמוד מיומנות נוספת:
            פתרון מבחנים.
          </li>
          <li>
            יש שיטות לגשת לשאלות שלא תמיד נלמדות בשיעורים.
            <strong className="guide-emphasis"> תקופת המבחנים מיועדת לתרגול, לא להשלמת פערים.</strong>
          </li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">📊</span>
          לגבי ציונים ומועדי ב׳
        </h2>
        <ul className="guide-list">
          <li>
            יכול להיות שהתרגלתם לפרפקציוניזם ולשאיפה למושלמות, וזה מצוין. אבל
            באקדמיה עצם המעבר של מבחנים הוא כבר הצלחה.
          </li>
          <li>
            זה לא אומר שצריך לשאוף לבינוניות, אבל כן חשוב לא להילחץ אם פתאום
            תראו ציונים שלא הכרתם קודם. זה קורה להרבה מאוד סטודנטים.
          </li>
          <li>
            <strong className="guide-emphasis">לגבי מועד ב׳: אם ניגשים, זה הציון שקובע ולא הגבוה מבין שני המועדים.</strong>
            {" "}
            לכן חשוב לשקול היטב אם באמת כדאי לגשת לשיפור.
          </li>
        </ul>

        <p className="guide-note">ברוב המקרים לא כדאי לגשת לשיפור, אלא אם מתקיימים יחד התנאים הבאים:</p>
        <ol className="guide-numbered-list">
          <li>הקורס מוריד לכם משמעותית את הממוצע.</li>
          <li>אתם בטוחים שתצליחו לשפר.</li>
          <li>הציון במועד א׳ היה נמוך בעיקר כי לא הספקתם ללמוד כמו שצריך.</li>
          <li>יש לכם מספיק זמן ללמוד למועד ב׳ בצורה רצינית כמו שאתם רוצים.</li>
        </ol>

        <ul className="guide-list">
          <li>
            <strong className="guide-emphasis">אם התנאים האלה לא מתקיימים, עדיף לוותר</strong>
            {" "}
            כדי להימנע ממצב של כישלון במועד ב׳ וחזרה על הקורס.
          </li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">📚</span>
          התנהלות במהלך הסמסטר
        </h2>
        <ul className="guide-list">
          <li>
            <strong className="guide-emphasis">תהיו עם יד על הדופק לאורך כל הסמסטר.</strong>
            {" "}
            אם לא הבנתם שיעור, צריך להשלים עצמאית.
          </li>
          <li>
            יש הרבה דרכים ללמוד: AI, חיפוש בגוגל וביוטיוב, קבוצות למידה. העיקר
            לא לצבור פערים.
          </li>
          <li>
            אפשר להיעזר ב-AI, אבל חשוב לקחת אותו בערבון מוגבל כי לפעמים הוא
            טועה או לא מדייק.
          </li>
          <li>
            <strong className="guide-emphasis">צריך לשים לב ללמוד נכון ויעיל ולא כמה שיותר.</strong>
          </li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🤝</span>
          לבקש עזרה ולבנות קשרים
        </h2>
        <ul className="guide-list">
          <li>
            אל תתביישו לבקש עזרה, גם אם אתם לא רגילים לזה וגם אם אתם עדיין לא
            מכירים אנשים.
          </li>
          <li>
            הרבה מהקשרים הכי טובים בתואר נוצרים דווקא מהרגעים האלה, וברוב
            המקרים אנשים ישמחו לעזור.
          </li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🛠️</span>
          למידה מטעויות
        </h2>
        <ul className="guide-list">
          <li>
            עם הזמן לומדים איך ללמוד. לא משנה כמה יסבירו מראש, בסוף כולם טועים.
          </li>
          <li>הדבר הכי חשוב הוא ללמוד מהטעויות ולא להתייאש.</li>
        </ul>
      </section>

      <section className="card guide-section">
        <h2 className="guide-title">
          <span className="guide-icon" aria-hidden="true">🏆</span>
          הסוד להצלחה
        </h2>
        <ul className="guide-list">
          <li><strong className="guide-emphasis">עקביות ואמונה.</strong> תעשו את ההשתדלות שלכם, והשאר בידיים של בורא עולם.</li>
          <li>יש בדרך קושי ואכזבות, אבל גם הכישלונות מסתדרים בסוף לטובה.</li>
          <li>
            המון הצלחה! לשאלות, המלצות והערות מוזמנים לפנות במייל:{" "}
            <a className="tip-link" href="mailto:aharoni123456789@gmail.com">
              aharoni123456789@gmail.com
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
