# Summaries Site

אתר Next.js להצגת סיכומים, המלצות וטיפים לסטודנטים.

## Stack

- Next.js (App Router)
- React
- Tailwind CSS v4

## Local Development

```bash
npm install
npm run dev
```

האפליקציה תרוץ בכתובת:

- http://localhost:3001

## Build Validation

```bash
npm run lint
npm run build
```

## Content Source

האתר עובד במצב תוכן מקומי בלבד (ללא בסיס נתונים).

- קבצי PDF נטענים מתוך: `public/pdfs`
- כרטיסי הסיכומים נוצרים אוטומטית משמות קבצי ה-PDF
- המלצות והטקסטים הקבועים מנוהלים בקוד

## Production Deployment (Vercel)

1. Import לפרויקט ב-Vercel מהריפו ב-GitHub.
2. להגדיר Root Directory ל-`summaries-site`.
3. Build Command: `npm run build`
4. Install Command: `npm install`
5. Deploy.

אין צורך בהגדרת Environment Variables במצב הנוכחי.

## Notes

- יש קבצי PDF גדולים יחסית בריפו. אם בהמשך יתווספו הרבה קבצים כבדים, מומלץ לשקול אחסון חיצוני (למשל S3 / Cloudinary / R2).
