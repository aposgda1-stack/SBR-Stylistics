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

        {/* Chapter Breakdown — compact list with images */}
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
                  className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--outline-variant)] active:scale-[0.98] transition-transform overflow-hidden"
                >
                  {/* Chapter image thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img
                      src={`/images/chapters/${chapter.id}.png`}
                      alt={chapter.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {isComplete && (
                      <div className="absolute inset-0 bg-teal-500/80 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-xl filled">check_circle</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-[var(--on-surface)] truncate leading-none mb-1.5">{chapter.title}</p>
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
        <section id="leaderboard-section" className="scroll-mt-20 mb-4">
          <Leaderboard />
        </section>

        {/* WhatsApp — static, inline, dashboard only */}
        <a
          href={`https://wa.me/201015960695?text=${encodeURIComponent("مرحبًا! عندي سؤال عن منصة الأسلوبيات 🎓")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#25D366] text-white font-black text-sm uppercase tracking-widest active:scale-95 transition-transform shadow-lg shadow-[#25D366]/20"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contact Us on WhatsApp
        </a>

      </main>
      <Footer />
    </>
  );
}
