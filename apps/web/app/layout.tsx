import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillSync AI | Career Intelligence Platform",
  description: "AI-Powered Career Intelligence Platform. Analyze skills, discover paths, and build personalized roadmaps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#0A0A0A] text-white selection:bg-indigo-500/30`}>
        <Navbar />
        {/* Add top padding to account for fixed navbar */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
