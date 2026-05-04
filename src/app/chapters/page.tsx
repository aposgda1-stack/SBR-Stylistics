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

  useEffect(() => {
    const staticChapters = getAllChapters();
    fetch("/api/user-progress")
      .then((res) => res.json())
      .then((data) => {
        const completed = data.completedLessons || [];
        setCompletedLessons(completed);

        const mergedChapters = staticChapters.map((ch) => {
          let lessonCompletedCount = ch.lessons.filter(l => completed.includes(l.id)).length;
          // All chapters are UNLOCKED as per user request
          let status: "completed" | "in-progress" | "locked" = 
            (lessonCompletedCount === ch.lessons.length ? "completed" : "in-progress");
            
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
    <div className="min-h-screen relative font-sans overflow-x-hidden">
      {/* Dynamic Island Background */}
      <div 
        className="fixed inset-0 w-full h-full -z-20 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: "url('/images/island_bg.png')" }}
      />
      <div className="fixed inset-0 w-full h-full -z-10 bg-slate-50/80 dark:bg-slate-950/90 backdrop-blur-sm" />

      <main className="max-w-5xl mx-auto px-4 py-20 relative">
        <div className="max-w-2xl mx-auto text-center mb-32 relative z-10">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-teal-500 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-teal-500/20">
              <span className="material-symbols-outlined text-sm">map</span>
              The Stylestics Odyssey
           </div>
           <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">Your Journey <br/> Map</h1>
           <p className="text-slate-600 dark:text-slate-400 font-bold text-lg md:text-xl">All paths are open. Choose your island and master the art of style.</p>
        </div>

        <div className="relative flex flex-col items-center pb-60">
           {/* The Connecting Path (SVG) */}
           <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30" preserveAspectRatio="none">
              <path 
                d={`M 250 0 ${chapters.map((_, i) => `Q ${i % 2 === 0 ? 400 : 100} ${i * 800 + 400}, 250 ${i * 800 + 800}`).join(" ")}`} 
                stroke="currentColor" strokeWidth="12" fill="none" className="text-teal-500 dark:text-teal-800" strokeDasharray="30 30"
              />
           </svg>

           {chapters.map((chapter, idx) => {
              const isEven = idx % 2 === 0;
              const isCompleted = chapter.status === "completed";

              return (
                <div key={chapter.id} className="w-full flex flex-col items-center gap-24 mb-40">
                  {/* Chapter Node (The Island) */}
                  <div className={`relative w-full flex items-center justify-center ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                     <div className={`relative group ${isEven ? "md:ml-[10%]" : "md:mr-[10%]"}`}>
                        <div 
                          className={`w-40 h-40 md:w-64 md:h-64 rounded-[4rem] flex flex-col items-center justify-center relative transition-all duration-700 shadow-[0_50px_100px_rgba(0,0,0,0.1)] ${
                            isCompleted 
                            ? "bg-teal-500 text-white border-8 border-white dark:border-slate-800" 
                            : "bg-white dark:bg-slate-900 border-8 border-teal-500/20 text-slate-900 dark:text-white"
                          } hover:scale-110 hover:-translate-y-4`}
                        >
                           <span className="material-symbols-outlined text-5xl md:text-8xl mb-4 filled">{chapter.icon}</span>
                           <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-center px-4 leading-none">{chapter.title}</h2>
                           <span className="mt-4 text-[10px] font-black uppercase tracking-widest opacity-60">Chapter {chapter.number}</span>
                           
                           {isCompleted && (
                             <div className="absolute -top-6 -right-6 bg-teal-500 text-white p-4 rounded-[2rem] shadow-2xl border-4 border-white animate-bounce-subtle">
                                <span className="material-symbols-outlined text-2xl">verified</span>
                             </div>
                           )}
                        </div>

                        {/* Chapter Summary Bubble */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-64 p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 pointer-events-none z-20 ${isEven ? "left-full ml-12" : "right-full mr-12 text-right"}`}>
                           <p className="text-slate-500 dark:text-slate-400 text-xs font-bold leading-relaxed mb-4">
                            {chapter.description.replace(/\*\*/g, "")}
                           </p>
                           <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div className="bg-teal-500 h-full" style={{ width: `${chapter.progress}%` }} />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Lesson Nodes (Small Circles) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-3xl">
                    {chapter.lessons.map((lesson, lIdx) => {
                      const isLessonCompleted = completedLessons.includes(lesson.id);
                      return (
                        <Link 
                          key={lesson.id}
                          href={`/chapters/${chapter.id}/${lesson.id}`}
                          className={`group relative flex items-center gap-6 p-6 rounded-[2rem] border-2 transition-all duration-500 ${
                            isLessonCompleted
                            ? "bg-teal-50 border-teal-100 text-teal-700"
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:-translate-y-2"
                          }`}
                        >
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                             isLessonCompleted ? "bg-teal-500 text-white" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-teal-500 group-hover:text-white"
                           }`}>
                              <span className="material-symbols-outlined text-2xl">{isLessonCompleted ? 'check' : 'play_arrow'}</span>
                           </div>
                           <div className="flex-1">
                              <span className="text-[10px] font-black uppercase tracking-widest opacity-50 block mb-1">Step {lIdx + 1}</span>
                              <h4 className="font-black text-lg tracking-tight leading-tight group-hover:text-primary transition-colors">{lesson.title}</h4>
                           </div>
                           <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="material-symbols-outlined">chevron_right</span>
                           </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
           })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
