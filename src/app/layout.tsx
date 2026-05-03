import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import WelcomeModal from "@/components/WelcomeModal";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Stylestics Platform — Summarized by Ruby",
  description:
    "A comprehensive English Stylistics course platform. Covering poetry, novel, and drama analysis with quizzes and exams.",
};

import { ThemeProvider } from "@/components/ThemeProvider";

import CommandPalette from "@/components/CommandPalette";
import RubyChat from "@/components/RubyChat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800&family=Manrope:wght@200..800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
        </head>
        <ThemeProvider>
          <body className="bg-background text-on-background font-sans antialiased">
            <CommandPalette />
            <RubyChat />
            <WelcomeModal />
            <TopBar />
            <div className="min-h-dvh">
              <PageWrapper>{children}</PageWrapper>
            </div>
            <BottomNav />
          </body>
        </ThemeProvider>
      </html>
    </ClerkProvider>
  );
}
