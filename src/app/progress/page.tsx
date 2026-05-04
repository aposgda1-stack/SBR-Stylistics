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
        .then(data => {
          setUserData(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching progress:", err);
          setLoading(false);
        });
    } else if (isLoaded) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();

    // Listen for progress updates to refresh page in real-time
    const handleUpdate = () => fetchProgress();
    window.addEventListener("progressUpdated", handleUpdate);
    return () => window.removeEventListener("progressUpdated", handleUpdate);
  }, [isLoaded, isSignedIn]);

  const completedLessons = userData?.completedLessons || [];
  const totalLessonsCount = chapters.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessonsCount = completedLessons.length;
  const overallPct = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  const getChapterStatus = (chapter: any) => {
    const chapterLessons = chapter.lessons.map((l: any) => l.id);
    const completedInChapter = chapterLessons.filter((id: string) => completedLessons.includes(id));
    
    if (completedInChapter.length === chapterLessons.length) return "completed";
    if (completedInChapter.length > 0) return "in-progress";
    return "locked";
  };

  const getChapterProgress = (chapter: any) => {
    const chapterLessons = chapter.lessons.map((l: any) => l.id);
    const completedInChapter = chapterLessons.filter((id: string) => completedLessons.includes(id));
    return Math.round((completedInChapter.length / chapterLessons.length) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-5xl text-slate-200">analytics</span>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Progress...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="w-full aspect-[21/9] md:aspect-[21/6] rounded-3xl overflow-hidden shadow-sm mb-12 relative border border-slate-100 animate-fade-in-up">
          <img src="/images/progress_hero.png" alt="Stylistics Progress" className="w-full h-full object-cover" />
        </div>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="font-display-lg text-display-lg text-primary mb-2">Progress Overview</h1>
            <p className="font-body-lg text-on-surface-variant">Track your journey through stylistics mastery.</p>
          </div>
          <a 
            href="#leaderboard-section"
            className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-6 py-3 rounded-xl border border-yellow-100 hover:bg-yellow-100 transition-all font-bold shadow-sm"
          >
            <span className="material-symbols-outlined filled">emoji_events</span>
            Leaderboard
          </a>
        </div>

        {!isSignedIn && (
          <div className="mb-12 p-6 bg-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-4xl text-blue-400">info</span>
              <p className="font-bold">Sign in to save your progress permanently and join the leaderboard!</p>
            </div>
            <Link href="/sign-in" className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all">
              Sign In
            </Link>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Overall Progress", value: `${overallPct}%`, icon: "trending_up", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Lessons Complete", value: `${completedLessonsCount}/${totalLessonsCount}`, icon: "menu_book", color: "text-primary", bg: "bg-primary/5" },
            { label: "Total Score", value: userData?.totalScore || 0, icon: "military_tech", color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Quizzes Taken", value: userData?.quizScores?.length || 0, icon: "quiz", color: "text-teal-600", bg: "bg-teal-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-4`}>
                <span className="material-symbols-outlined text-2xl filled">
                  {stat.icon}
                </span>
              </div>
              <span className="font-display-lg text-3xl font-bold text-slate-900">{stat.value}</span>
              <span className="block font-label-sm text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-white border border-slate-100 p-8 rounded-3xl mb-12 shadow-sm">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="font-headline-md text-headline-md text-slate-900">Course Completion</h2>
              <p className="text-slate-500 font-body-md">English Stylistics — Full Curriculum</p>
            </div>
            <span className="font-display-lg text-3xl font-bold text-primary">{overallPct}%</span>
          </div>
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-1000"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>

        {/* Chapters Detail */}
        <section className="mb-16">
          <h2 className="font-headline-lg text-headline-lg mb-8 text-slate-900">Chapter Breakdown</h2>
          <div className="space-y-4">
            {chapters.map((chapter) => {
              const status = getChapterStatus(chapter);
              const progress = getChapterProgress(chapter);
              return (
                <div
                  key={chapter.id}
                  className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-center gap-6"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      status === "completed"
                        ? "bg-teal-50 text-teal-600"
                        : status === "in-progress"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-50 text-slate-300"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{chapter.icon}</span>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-label-sm text-slate-400 uppercase tracking-widest">
                          Chapter {chapter.number}
                        </span>
                        <h3 className="font-headline-sm text-lg font-bold text-slate-800">{chapter.title}</h3>
                      </div>
                      <span
                        className={`font-bold ${
                          status === "completed"
                            ? "text-teal-600"
                            : status === "in-progress"
                            ? "text-blue-600"
                            : "text-slate-300"
                        }`}
                      >
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          status === "completed"
                            ? "bg-teal-500"
                            : status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-slate-200"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={`/chapters/${chapter.id}/${chapter.lessons[0]?.id || ""}`}
                    className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all text-center ${
                      status === "locked" 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-slate-900 text-white hover:bg-slate-800 active:scale-95"
                    }`}
                  >
                    {status === "completed" ? "Review" : "Continue"}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Academic Achievements (Badges) */}
        <section className="mb-20">
          <h2 className="font-headline-lg text-headline-lg mb-8 text-slate-900">Academic Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { id: "ch1", label: "Poetry Master", icon: "auto_stories", color: "bg-purple-50 text-purple-600", border: "border-purple-100" },
              { id: "ch2", label: "Cohesion King", icon: "link", color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
              { id: "ch4", label: "Narrative Ace", icon: "history_edu", color: "bg-teal-50 text-teal-600", border: "border-teal-100" },
              { id: "ch6", label: "Logic Expert", icon: "psychology", color: "bg-orange-50 text-orange-600", border: "border-orange-100" },
              { id: "final", label: "Final Stylist", icon: "workspace_premium", color: "bg-yellow-50 text-yellow-600", border: "border-yellow-100" },
            ].map((badge) => {
              const isUnlocked = badge.id === "final" 
                ? userData?.quizScores?.some((s: any) => s.quizId === "mock-final-exam")
                : chapters.find(c => c.id === badge.id) && getChapterStatus(chapters.find(c => c.id === badge.id)) === "completed";
              
              return (
                <div 
                  key={badge.id} 
                  className={`flex flex-col items-center p-6 rounded-[2rem] border-2 transition-all ${
                    isUnlocked 
                      ? `${badge.color} ${badge.border} shadow-lg scale-105` 
                      : "bg-slate-50 border-slate-100 grayscale opacity-40"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm">
                    <span className="material-symbols-outlined text-3xl filled">{badge.icon}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-center">{badge.label}</span>
                  {isUnlocked && (
                    <div className="mt-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                       <span className="material-symbols-outlined text-[10px] filled">verified</span>
                       <span className="text-[8px] font-black uppercase tracking-tighter">Unlocked</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Real-time Leaderboard Section */}
        <section id="leaderboard-section" className="mb-20 scroll-mt-24">
          <Leaderboard />
        </section>

        {/* Practice & Mastery Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <Link
            href="/exam/mock"
            className="group flex flex-col p-8 bg-primary rounded-[3rem] hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
               <span className="material-symbols-outlined text-[100px] text-white">timer</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
              <span className="material-symbols-outlined text-3xl">timer</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Mock Exam</h3>
              <p className="text-white/70 font-bold text-sm">Timed 60-min challenge</p>
            </div>
          </Link>

          <Link
            href="/word-box"
            className="group flex flex-col p-8 border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[3rem] hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
               <span className="material-symbols-outlined text-[100px] text-slate-900 dark:text-white">menu_book</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white mb-6">
              <span className="material-symbols-outlined text-3xl">menu_book</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">Word Box</h3>
              <p className="text-slate-400 font-bold text-sm">Review full dictionary</p>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

