import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata = {
  title: "Delta | Mustajab's Portfolio & Personal Lab",
  description:
    "Delta is the professional website of Mustajab — showcasing projects, blogs, experiments, and personal growth. Explore my portfolio, skills, and creative work across technology, design, and productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-linear-to-b from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-neutral-200 min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
