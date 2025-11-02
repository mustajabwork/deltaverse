import "./globals.css";

export const metadata = {
  title: "Delta | Mustajab's Portfolio & Personal Lab",
  description:
    "Delta is the professional website of Mustajab — showcasing projects, blogs, experiments, and personal growth. Explore my portfolio, skills, and creative work across technology, design, and productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
