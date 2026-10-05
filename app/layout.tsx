import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Fundamental 50 | Data Engineering Interview Prep",
  description: "Master Data Engineering fundamentals, SQL, pipelines, and distributed systems through interactive visual learning and interview-focused practice.",
};

import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans">
        <TooltipProvider>
          <Navbar />
          <div className="flex-1 flex flex-col pt-16">
            {children}
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
