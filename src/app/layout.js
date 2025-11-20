import Header from "@/components/Header";
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
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
