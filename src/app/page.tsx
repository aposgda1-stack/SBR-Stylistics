"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const navItems = [
  { href: "/chapters",  icon: "map",          label: "Journey Map",   sub: "All chapters",       color: "bg-teal-500 text-white" },
  { href: "/material",  icon: "auto_stories", label: "Study Guide",   sub: "Notes & Arabic",     color: "bg-slate-800 dark:bg-slate-700 text-white" },
  { href: "/progress",  icon: "emoji_events", label: "My Dashboard",  sub: "Scores & Rankings",  color: "bg-amber-400 text-slate-900" },
  { href: "/exam",      icon: "quiz",         label: "Mock Exam",     sub: "Past papers",         color: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" },
  { href: "/word-box",  icon: "style",        label: "Word Box",      sub: "Terms & training",    color: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" },
];

export default function Dashboard() {
  const { user } = useUser();
  const displayName = user?.firstName || null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="max-w-lg mx-auto px-4 pt-6 pb-28">

        {/* Compact Hero */}
        <div className="rounded-3xl bg-slate-900 p-6 mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse inline-block" />
              Final Semester · 2026
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight leading-tight mb-1">
              {displayName ? <>Stay strong, <span className="text-teal-400">{displayName}.</span></> : <><span className="text-teal-400">The Final</span> Chapter.</>}
            </h1>
            <p className="text-slate-400 text-xs font-medium leading-relaxed mb-4">
              &ldquo;This is our final semester. I am genuinely proud of every single one of you. Let&apos;s finish this strong — together.&rdquo;
            </p>
            <div className="flex gap-3">
              <Link href="/chapters" className="flex-1 py-3 bg-teal-500 text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest text-center hover:bg-teal-400 transition-colors active:scale-95">
                Continue
              </Link>
              <Link href="/material" className="flex-1 py-3 bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest text-center hover:bg-white/20 transition-colors active:scale-95">
                Syllabus
              </Link>
            </div>
          </div>
        </div>

        {/* Compact Nav Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {navItems.slice(0, 4).map((item) => (
            <Link key={item.href} href={item.href}
              className={`${item.color} rounded-2xl p-4 flex flex-col gap-3 active:scale-95 transition-transform shadow-sm`}
            >
              <span className="material-symbols-outlined text-2xl filled">{item.icon}</span>
              <div>
                <p className="font-black text-sm leading-none mb-0.5">{item.label}</p>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Word Box - full width */}
        <Link href="/word-box"
          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--outline-variant)] active:scale-95 transition-transform shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--surface-variant)] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-xl text-[var(--on-surface-variant)]">style</span>
          </div>
          <div className="flex-1">
            <p className="font-black text-sm text-[var(--on-surface)]">Word Box</p>
            <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">Flashcards & Term Training</p>
          </div>
          <span className="material-symbols-outlined text-[var(--outline)] text-lg">chevron_right</span>
        </Link>

      </main>
      <Footer />
    </div>
  );
}
