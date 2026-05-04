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

  useEffect(() => {
    const staticChapters = getAllChapters();
    fetch("/api/user-progress")
      .then((res) => res.json())
      .then((data) => {
        const completed = data.completedLessons || [];
        setCompletedLessons(completed);

        const mergedChapters = staticChapters.map((ch, chIdx) => {
          let lessonCompletedCount = ch.lessons.filter(l => completed.includes(l.id)).length;
          let isLocked = false;
          if (chIdx > 0) {
            const prevChapter = staticChapters[chIdx - 1];
            if (!prevChapter.lessons.every(l => completed.includes(l.id))) {
              isLocked = true;
            }
          }
          let status = isLocked ? "locked" : (lessonCompletedCount === ch.lessons.length ? "completed" : (lessonCompletedCount > 0 ? "in-progress" : "not-started"));
          return { ...ch, status, progress: Math.round((lessonCompletedCount / ch.lessons.length) * 100) };
        });
        setChapters(mergedChapters);
        setLoading(false);
      }).catch(() => {
        setChapters(staticChapters);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin text-teal-500"><span className="material-symbols-outlined text-4xl">autorenew</span></div>
    </div>
  );

  return (
    <>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-40 left-10 w-64 h-64 bg-teal-500 rounded-full blur-[100px]" />
           <div className="absolute bottom-40 right-10 w-64 h-64 bg-primary rounded-full blur-[100px]" />
        </div>

        <div className="max-w-xl mx-auto text-center mb-24 relative z-10">
           <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">Your Academic Journey</h1>
           <p className="text-slate-500 dark:text-slate-400">Follow the path to master Stylistics. Each island is a new milestone.</p>
        </div>

        <div className="max-w-4xl mx-auto relative flex flex-col items-center pb-40">
           {/* The Journey Path (SVG) */}
           <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20" preserveAspectRatio="none">
              <path 
                d={`M 200 0 ${chapters.map((_, i) => `Q ${i % 2 === 0 ? 300 : 100} ${i * 400 + 200}, 200 ${i * 400 + 400}`).join(" ")}`} 
                stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-300 dark:text-slate-800" strokeDasharray="20 20"
              />
           </svg>

           {chapters.map((chapter, idx) => {
              const isEven = idx % 2 === 0;
              const isLocked = chapter.status === "locked";
              const isCompleted = chapter.status === "completed";

              return (
                <div 
                  key={chapter.id} 
                  className={`relative flex items-center justify-center w-full mb-40 ${isEven ? "md:justify-start" : "md:justify-end"}`}
                >
                   {/* Chapter Node (Island) */}
                   <div className={`relative group ${isEven ? "md:ml-[15%]" : "md:mr-[15%]"}`}>
                      <Link 
                        href={isLocked ? "#" : `/chapters/${chapter.id}/${chapter.lessons[0]?.id}`}
                        className={`w-32 h-32 md:w-48 md:h-48 rounded-[3rem] flex flex-col items-center justify-center relative transition-all duration-500 shadow-2xl ${
                          isLocked 
                          ? "bg-slate-200 dark:bg-slate-900 text-slate-400 border-4 border-slate-300 dark:border-slate-800 cursor-not-allowed" 
                          : isCompleted 
                          ? "bg-teal-500 text-white border-4 border-teal-300 shadow-teal-500/20" 
                          : "bg-white dark:bg-slate-900 border-4 border-teal-500 text-slate-900 dark:text-white hover:scale-110"
                        }`}
                      >
                         <span className={`material-symbols-outlined text-4xl md:text-6xl mb-2 ${isLocked ? "opacity-50" : "animate-pulse-slow"}`}>{chapter.icon}</span>
                         <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Chapter {chapter.number}</span>
                         
                         {isLocked && (
                           <div className="absolute -top-4 -right-4 bg-slate-800 text-white p-2 rounded-xl">
                              <span className="material-symbols-outlined text-sm">lock</span>
                           </div>
                         )}
                         {isCompleted && (
                           <div className="absolute -top-4 -right-4 bg-teal-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                              <span className="material-symbols-outlined text-sm">check_circle</span>
                           </div>
                         )}
                      </Link>

                      {/* Info Tooltip/Bubble */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-48 md:w-64 p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 pointer-events-none z-20 ${isEven ? "left-full ml-8" : "right-full mr-8 text-right"}`}>
                         <h3 className="font-bold text-lg mb-2">{chapter.title}</h3>
                         <p className="text-xs text-slate-500 line-clamp-2 mb-4">{chapter.description}</p>
                         <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-teal-500 h-full" style={{ width: `${chapter.progress}%` }} />
                         </div>
                      </div>
                   </div>
                </div>
              );
           })}
        </div>
      </main>
      <Footer />
    </>
  );
}
