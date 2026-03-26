import type { Metadata } from "next";
import { Assistant, Fira_Code } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin", "hebrew"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "לומדים חכם",
  description: "סיכומי כתב-יד, טיפים וכלים לתואר במדעי המחשב",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} ${firaCode.variable}`}>
        {children}
      </body>
    </html>
  );
}
