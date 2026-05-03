"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllChapters } from "@/lib/contentService";
import Footer from "@/components/Footer";
import { Chapter } from "@/types";

import ActivityHeatmap from "@/components/ActivityHeatmap";

export default function LessonsPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [nextLessonUrl, setNextLessonUrl] = useState<string | null>(null);
  const [nextLessonTitle, setNextLessonTitle] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch static curriculum
    const staticChapters = getAllChapters();

    // 2. Fetch real user progress
    fetch("/api/user-progress")
      .then((res) => res.json())
      .then((data) => {
        const completed = data.completedLessons || [];
        setCompletedLessons(completed);

        let foundNext = false;
        let nextUrl = null;
        let nextTitle = null;

        // 3. Merge progress and determine statuses
        const mergedChapters = staticChapters.map((ch, chIdx) => {
          let lessonCompletedCount = 0;
          
          ch.lessons.forEach((l) => {
            const isCompleted = completed.includes(l.id);
            if (isCompleted) lessonCompletedCount++;
            else if (!foundNext && (chIdx === 0 || staticChapters[chIdx-1].lessons.every(prevL => completed.includes(prevL.id)))) {
              nextUrl = `/lessons/${ch.id}/${l.id}`;
              nextTitle = l.title;
              foundNext = true;
            }
          });

          let isLocked = false;
          if (chIdx > 0) {
            const prevChapter = staticChapters[chIdx - 1];
            if (!prevChapter.lessons.every(l => completed.includes(l.id))) {
              isLocked = true;
            }
          }

          let status = "not-started";
          if (isLocked) status = "locked";
          else if (lessonCompletedCount === ch.lessons.length && ch.lessons.length > 0) status = "completed";
          else if (lessonCompletedCount > 0) status = "in-progress";

          const progress = ch.lessons.length > 0 
            ? Math.round((lessonCompletedCount / ch.lessons.length) * 100) 
            : 0;

          return { ...ch, status, progress } as Chapter;
        });

        setChapters(mergedChapters);
        setNextLessonUrl(nextUrl || `/lessons/${staticChapters[0].id}/${staticChapters[0].lessons[0]?.id}`);
        setNextLessonTitle(nextTitle || staticChapters[0].lessons[0]?.title);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load progress:", err);
        setChapters(staticChapters);
        setNextLessonUrl(`/lessons/${staticChapters[0].id}/${staticChapters[0].lessons[0]?.id}`);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header Section with Image */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] animate-fade-in-up">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/5 dark:bg-teal-500/10 text-primary dark:text-teal-400 px-4 py-2 rounded-full font-bold uppercase tracking-widest text-[10px]">
              <span className="material-symbols-outlined text-sm">stars</span>
              Stylistics Learning Hub
            </div>
            <h1 className="font-display-lg text-4xl md:text-6xl text-slate-900 dark:text-white font-bold tracking-tight leading-[1.1]">
              Master the Art of <span className="text-primary dark:text-teal-400">Stylistics</span>
            </h1>
            <p className="font-body-lg text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Explore theoretical foundations and applied methods with Ruby's Egyptian touch. 
              Track your progress and climb the leaderboard.
            </p>
            {nextLessonUrl && !loading && (
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
                <Link 
                  href={nextLessonUrl}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all active:scale-95 group"
                >
                  <span className="uppercase tracking-widest text-sm">Continue Learning</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
                {nextLessonTitle && (
                  <div className="text-sm text-slate-400 italic">
                    Up next: <span className="font-bold text-slate-900 dark:text-slate-200">"{nextLessonTitle}"</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="hidden lg:block w-[380px] flex-shrink-0 relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="/images/dashboard_hero.png" 
              alt="Stylistics Dashboard Banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Learning Stats / Heatmap Section */}
        {!loading && (
          <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ActivityHeatmap />
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[120px]">emoji_events</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Weekly Rank</h3>
                <p className="text-primary-fixed-dim mb-6 text-sm">You are in the Top 5% of students this week!</p>
                <Link href="/progress/leaderboard" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                  View Leaderboard <span className="material-symbols-outlined text-sm">trending_up</span>
                </Link>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex-1">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link href="/definitions" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                    <span className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-primary dark:text-teal-400">dictionary</span>
                      Glossary Game
                    </span>
                    <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                  </Link>
                  <Link href="/progress" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                    <span className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                      <span className="material-symbols-outlined text-primary dark:text-teal-400">monitoring</span>
                      Detailed Analytics
                    </span>
                    <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin text-primary">
              <span className="material-symbols-outlined text-4xl">autorenew</span>
            </div>
          </div>
        )}

        {/* Chapter list */}
        {!loading && (
          <div className="space-y-8 md:space-y-12">
            {chapters.map((chapter) => (
              <section key={chapter.id} className="animate-fade-in-up">
                {/* Chapter Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div
                    className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-lg ${
                      chapter.status === "completed"
                        ? "bg-teal-500 text-white shadow-teal-200 dark:shadow-teal-900/20"
                        : chapter.status === "in-progress"
                        ? "bg-primary text-white shadow-primary/20 dark:bg-teal-400 dark:text-slate-900 dark:shadow-teal-400/20"
                        : "bg-surface-variant text-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl">{chapter.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="font-label-sm text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
                        Chapter {chapter.number}
                      </span>
                      {chapter.status === "completed" && (
                        <span className="text-[10px] bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-teal-100 dark:border-teal-900/50">
                          Mastered
                        </span>
                      )}
                      {chapter.status === "in-progress" && (
                        <span className="text-[10px] bg-primary/5 dark:bg-teal-400/10 text-primary dark:text-teal-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-primary/10 dark:border-teal-400/20">
                          Active — {chapter.progress}%
                        </span>
                      )}
                    </div>
                    <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{chapter.title}</h2>
                  </div>
                </div>

                {/* Lessons List */}
                {chapter.lessons.length > 0 ? (
                  <div className="ml-8 md:ml-12 space-y-4 border-l-2 border-slate-100 dark:border-slate-800 pl-8 md:pl-12 py-2">
                    {chapter.lessons.map((lesson, idx) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isLocked = chapter.status === "locked";
                      
                      return (
                        <Link
                          key={lesson.id}
                          href={!isLocked ? `/lessons/${chapter.id}/${lesson.id}` : "#"}
                          className={`flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-[1.5rem] border transition-all duration-300 group ${
                            isLocked
                              ? "border-transparent bg-slate-50 dark:bg-slate-800/30 opacity-60 cursor-not-allowed"
                              : isCompleted 
                              ? "border-teal-100 dark:border-teal-900/30 bg-teal-50/20 dark:bg-teal-900/10 hover:border-teal-300 cursor-pointer"
                              : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary dark:hover:border-teal-400 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 ${
                              isCompleted
                                ? "bg-teal-500 text-white shadow-lg shadow-teal-200 dark:shadow-none"
                                : isLocked
                                ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                                : "bg-primary/5 dark:bg-slate-800 text-primary dark:text-teal-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-teal-400 dark:group-hover:text-slate-900"
                            }`}
                          >
                            {isCompleted ? (
                              <span className="material-symbols-outlined text-base md:text-xl font-bold">check</span>
                            ) : (
                              <span className="font-serif italic text-lg">{idx + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-body-md text-lg font-bold truncate transition-colors ${
                              isCompleted ? "text-teal-900 dark:text-teal-100" : isLocked ? "text-slate-500" : "text-slate-900 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-teal-400"
                            }`}>
                              {lesson.title}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-500 mt-1 truncate">{lesson.subtitle}</p>
                          </div>
                          {!isLocked && (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isCompleted ? "bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-teal-400 dark:group-hover:text-slate-900"
                            }`}>
                              <span className="material-symbols-outlined text-sm md:text-base">
                                {isCompleted ? "replay" : "arrow_forward"}
                              </span>
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="ml-8 md:ml-12 p-10 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                    <span className="material-symbols-outlined text-4xl mb-3 opacity-30">construction</span>
                    <p className="font-label-sm text-xs md:text-sm uppercase tracking-[0.2em] font-bold">
                      {chapter.status === "locked"
                        ? `Path blocked — Complete previous lessons`
                        : "Curating expert content..."}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Practice & Exam CTAs */}
        {!loading && (
          <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10">
            <Link
              href="/quiz"
              className="flex flex-col p-6 md:p-8 bg-slate-900 rounded-[2rem] hover:bg-slate-800 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white text-2xl md:text-3xl">
                  edit_note
                </span>
              </div>
              <h3 className="font-headline-md text-xl md:text-2xl text-white font-bold mb-3">
                Practice Quiz
              </h3>
              <p className="text-slate-400 font-body-sm md:font-body-md leading-relaxed mb-8 flex-1">
                Test your knowledge with adaptive questions across all covered chapters. Earn points and climb the leaderboard!
              </p>
              <div className="inline-flex items-center gap-2 text-primary font-bold font-label-sm uppercase tracking-widest text-xs md:text-sm">
                Start Practice
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </Link>

            <Link
              href="/exam"
              className="flex flex-col p-6 md:p-8 bg-primary rounded-[2rem] hover:bg-primary/90 transition-all group relative overflow-hidden shadow-xl shadow-primary/20"
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors" />
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 text-white shadow-inner">
                <span className="material-symbols-outlined text-2xl md:text-3xl">
                  history_edu
                </span>
              </div>
              <h3 className="font-headline-md text-xl md:text-2xl text-white font-bold mb-3">
                Comprehensive Exam
              </h3>
              <p className="text-primary-50 text-white/80 font-body-sm md:font-body-md leading-relaxed mb-8 flex-1">
                Take the final 2024 Stylistics Exam simulation to prove your mastery of the entire curriculum.
              </p>
              <div className="inline-flex items-center gap-2 text-white font-bold font-label-sm uppercase tracking-widest text-xs md:text-sm">
                Begin Exam
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
                  arrow_forward
                </span>
              </div>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
