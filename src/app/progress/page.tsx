"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllChapters } from "@/lib/contentService";
import Footer from "@/components/Footer";
import { useAuth } from "@clerk/nextjs";
import Leaderboard from "@/components/Leaderboard";

export default function ProgressPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const chapters = getAllChapters();

  const fetchProgress = () => {
    if (isLoaded && isSignedIn) {
      fetch("/api/user-progress")
        .then(r => r.json())
        .then(data => { setUserData(data); setLoading(false); })
        .catch(() => setLoading(false));
    } else if (isLoaded) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
    const handleUpdate = () => fetchProgress();
    window.addEventListener("progressUpdated", handleUpdate);
    return () => window.removeEventListener("progressUpdated", handleUpdate);
  }, [isLoaded, isSignedIn]);

  const completedLessons: string[] = userData?.completedLessons || [];
  const totalLessonsCount = chapters.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessonsCount = completedLessons.length;
  const overallPct = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  const getChapterProgress = (chapter: any) => {
    const ids = chapter.lessons.map((l: any) => l.id);
    const done = ids.filter((id: string) => completedLessons.includes(id));
    return { pct: Math.round((done.length / ids.length) * 100), done: done.length, total: ids.length };
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)]">
      <span className="material-symbols-outlined text-4xl text-[var(--outline)] animate-pulse">analytics</span>
    </div>
  );

  return (
    <>
      <main className="max-w-lg mx-auto px-4 pt-6 pb-28 bg-[var(--background)] min-h-screen">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl font-black text-[var(--on-background)] tracking-tight">My Dashboard</h1>
          <p className="text-xs font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mt-0.5">Progress & Rankings</p>
        </div>

        {/* Sign-in nudge */}
        {!isSignedIn && (
          <div className="mb-4 p-4 rounded-2xl bg-slate-900 flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-400 text-xl">info</span>
            <p className="text-white text-xs font-bold flex-1">Sign in to save progress & join the leaderboard</p>
            <Link href="/sign-in" className="px-3 py-1.5 bg-teal-500 text-slate-900 rounded-lg text-xs font-black uppercase tracking-widest flex-shrink-0">
              Sign In
            </Link>
          </div>
        )}

        {/* Stats Row — compact 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: "Progress",  value: `${overallPct}%`,                     icon: "trending_up",   bg: "bg-teal-500/10 dark:bg-teal-500/10",   text: "text-teal-600 dark:text-teal-400" },
            { label: "Lessons",   value: `${completedLessonsCount}/${totalLessonsCount}`, icon: "menu_book", bg: "bg-[var(--primary-container)]",        text: "text-[var(--on-primary-container)]" },
            { label: "Score",     value: userData?.totalScore || 0,             icon: "military_tech", bg: "bg-amber-400/10",                        text: "text-amber-600 dark:text-amber-400" },
            { label: "Quizzes",   value: userData?.quizScores?.length || 0,     icon: "quiz",          bg: "bg-[var(--surface-variant)]",             text: "text-[var(--on-surface-variant)]" },
          ].map(s => (
            <div key={s.label} className="bg-[var(--surface)] border border-[var(--outline-variant)] rounded-2xl p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                <span className={`material-symbols-outlined text-lg filled ${s.text}`}>{s.icon}</span>
              </div>
              <div>
                <p className="text-lg font-black text-[var(--on-surface)] leading-none">{s.value}</p>
                <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="bg-[var(--surface)] border border-[var(--outline-variant)] rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-black text-[var(--on-surface)] uppercase tracking-widest">Course Completion</p>
            <p className="text-sm font-black text-teal-500">{overallPct}%</p>
          </div>
          <div className="w-full h-2.5 bg-[var(--surface-variant)] rounded-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full transition-all duration-1000" style={{ width: `${overallPct}%` }} />
          </div>
        </div>

        {/* Chapter Breakdown — compact list */}
        <section className="mb-4">
          <p className="text-[10px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest mb-3">Chapter Breakdown</p>
          <div className="space-y-2">
            {chapters.map(chapter => {
              const { pct, done, total } = getChapterProgress(chapter);
              const isComplete = done === total && total > 0;
              return (
                <Link
                  key={chapter.id}
                  href={`/chapters/${chapter.id}/${chapter.lessons[0]?.id || ""}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] active:scale-[0.98] transition-transform"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isComplete ? "bg-teal-500 text-white" : "bg-[var(--surface-variant)] text-[var(--on-surface-variant)]"}`}>
                    <span className="material-symbols-outlined text-lg">{chapter.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[var(--on-surface)] truncate leading-none mb-1">{chapter.title}</p>
                    <div className="w-full h-1.5 bg-[var(--surface-variant)] rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-black text-[var(--on-surface-variant)] flex-shrink-0">{done}/{total}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Badges — compact horizontal scroll */}
        <section className="mb-4">
          <p className="text-[10px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest mb-3">Achievements</p>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: "ch1", label: "Poetry",    icon: "auto_stories",     color: "text-purple-500" },
              { id: "ch2", label: "Cohesion",  icon: "link",             color: "text-blue-500" },
              { id: "ch4", label: "Narrative", icon: "history_edu",      color: "text-teal-500" },
              { id: "ch6", label: "Logic",     icon: "psychology",       color: "text-orange-500" },
              { id: "final", label: "Stylist", icon: "workspace_premium", color: "text-amber-500" },
            ].map(badge => {
              const isUnlocked = badge.id === "final"
                ? userData?.quizScores?.some((s: any) => s.quizId === "mock-final-exam")
                : getChapterProgress(chapters.find(c => c.id === badge.id) || chapters[0]).pct === 100;
              return (
                <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl border ${isUnlocked ? "bg-[var(--surface)] border-[var(--outline-variant)]" : "bg-[var(--surface-variant)] border-transparent opacity-40 grayscale"}`}>
                  <span className={`material-symbols-outlined text-2xl filled ${isUnlocked ? badge.color : "text-[var(--on-surface-variant)]"}`}>{badge.icon}</span>
                  <span className="text-[9px] font-black text-[var(--on-surface)] uppercase tracking-widest whitespace-nowrap">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Link href="/exam/mock" className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--primary-container)] active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-xl text-[var(--on-primary-container)]">timer</span>
            <div>
              <p className="text-sm font-black text-[var(--on-primary-container)]">Mock Exam</p>
              <p className="text-[10px] font-bold text-[var(--on-primary-container)] opacity-60">Timed 60-min</p>
            </div>
          </Link>
          <Link href="/word-box" className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--surface)] border border-[var(--outline-variant)] active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-xl text-[var(--on-surface-variant)]">style</span>
            <div>
              <p className="text-sm font-black text-[var(--on-surface)]">Word Box</p>
              <p className="text-[10px] font-bold text-[var(--on-surface-variant)]">Terms & Training</p>
            </div>
          </Link>
        </div>

        {/* Leaderboard */}
        <section id="leaderboard-section" className="scroll-mt-20">
          <Leaderboard />
        </section>

      </main>
      <Footer />
    </>
  );
}
