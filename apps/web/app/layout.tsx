import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

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
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-[#0A0A0A] text-white selection:bg-indigo-500/30`}>
        <Navbar />
        {/* Add top padding to account for fixed navbar */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
