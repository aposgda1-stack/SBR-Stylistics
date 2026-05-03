"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllChapters } from "@/lib/contentService";
import Footer from "@/components/Footer";
import { Chapter } from "@/types";

export default function LessonsPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [nextLessonUrl, setNextLessonUrl] = useState<string | null>(null);

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

        // 3. Merge progress and determine statuses
        const mergedChapters = staticChapters.map((ch, chIdx) => {
          let lessonCompletedCount = 0;
          
          ch.lessons.forEach((l) => {
            const isCompleted = completed.includes(l.id);
            if (isCompleted) lessonCompletedCount++;
            else if (!foundNext && (chIdx === 0 || staticChapters[chIdx-1].lessons.every(prevL => completed.includes(prevL.id)))) {
              // This is the first uncompleted lesson where the previous chapter is fully completed (or it's the first chapter)
              nextUrl = `/lessons/${ch.id}/${l.id}`;
              foundNext = true;
            }
          });

          // A chapter is locked if the PREVIOUS chapter has uncompleted lessons
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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="border-l-4 border-primary pl-4 md:pl-6">
            <span className="font-label-sm text-xs md:text-sm text-primary mb-2 block tracking-widest uppercase font-bold">
              Course Curriculum
            </span>
            <h1 className="font-display-md md:font-display-lg text-3xl md:text-5xl text-slate-900 font-extrabold leading-tight">
              All Chapters & Lessons
            </h1>
            <p className="text-slate-500 mt-4 max-w-xl text-sm md:text-base leading-relaxed">
              Master the concepts of stylistics through interactive theoretical and applied lessons. 
              Unlock new chapters as you progress.
            </p>
          </div>

          {nextLessonUrl && !loading && (
            <Link 
              href={nextLessonUrl}
              className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-6 md:px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] active:scale-95 group"
            >
              <span className="uppercase tracking-widest text-xs md:text-sm">Continue Learning</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          )}
        </div>

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
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      chapter.status === "completed"
                        ? "bg-teal-100 text-teal-600"
                        : chapter.status === "in-progress"
                        ? "bg-primary/10 text-primary"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl md:text-3xl">{chapter.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                      <span className="font-label-sm text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">
                        Chapter {chapter.number}
                      </span>
                      {chapter.status === "completed" && (
                        <span className="text-[10px] md:text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                          Completed
                        </span>
                      )}
                      {chapter.status === "in-progress" && (
                        <span className="text-[10px] md:text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                          In Progress — {chapter.progress}%
                        </span>
                      )}
                      {chapter.status === "locked" && (
                        <span className="text-[10px] md:text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">lock</span> Locked
                        </span>
                      )}
                    </div>
                    <h2 className="font-headline-md text-xl md:text-2xl font-bold text-slate-900">{chapter.title}</h2>
                  </div>
                </div>

                {/* Lessons List */}
                {chapter.lessons.length > 0 ? (
                  <div className="ml-4 md:ml-[5.5rem] space-y-3 border-l-2 border-slate-100 pl-4 md:pl-6 py-2">
                    {chapter.lessons.map((lesson, idx) => {
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isLocked = chapter.status === "locked";
                      
                      return (
                        <Link
                          key={lesson.id}
                          href={!isLocked ? `/lessons/${chapter.id}/${lesson.id}` : "#"}
                          className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border transition-all group ${
                            isLocked
                              ? "border-transparent bg-slate-50 opacity-60 cursor-not-allowed"
                              : isCompleted 
                              ? "border-teal-100 bg-teal-50/30 hover:border-teal-200 cursor-pointer"
                              : "border-slate-200 bg-white hover:border-primary hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
                              isCompleted
                                ? "bg-teal-500 text-white shadow-sm"
                                : isLocked
                                ? "bg-slate-200 text-slate-400"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {isCompleted ? (
                              <span className="material-symbols-outlined text-sm md:text-base font-bold">check</span>
                            ) : (
                              idx + 1
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-body-md font-bold truncate transition-colors ${
                              isCompleted ? "text-teal-900" : isLocked ? "text-slate-500" : "text-slate-900 group-hover:text-primary"
                            }`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs md:text-sm text-slate-500 mt-0.5 truncate">{lesson.subtitle}</p>
                          </div>
                          {!isLocked && (
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              isCompleted ? "bg-teal-100 text-teal-600" : "bg-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-white"
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
                  <div className="ml-4 md:ml-[5.5rem] p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center text-slate-400 bg-slate-50">
                    <span className="material-symbols-outlined text-3xl mb-2 opacity-50">hourglass_empty</span>
                    <p className="font-label-sm text-xs md:text-sm uppercase tracking-widest font-bold">
                      {chapter.status === "locked"
                        ? `Unlock by completing previous chapters`
                        : "Content coming soon"}
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
