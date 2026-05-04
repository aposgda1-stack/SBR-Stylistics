import Link from "next/link";
import { getAllChapters, getCourseStats } from "@/lib/contentService";
import ChapterCard from "@/components/ChapterCard";
import Footer from "@/components/Footer";

export default function HomePage() {
  const chapters = getAllChapters();
  const stats = getCourseStats();
  const currentChapter = chapters.find((c) => c.status === "in-progress") || chapters[0];
  const currentLesson = currentChapter?.lessons[0];

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Welcome & Premium Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="lg:col-span-8 flex-1">
             <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative z-10 space-y-8">
                   <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-teal-400">
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      Academic Year 2024/2025
                   </div>
                   <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
                     Welcome Back, <span className="text-teal-400">Scholar.</span> Ready for your Stylistics journey?
                   </h1>
                   <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
                     I'm Prof. Adel, and we're going to master every linguistic deviation and cohesive tie together. Graduation is within reach!
                   </p>
                   <div className="flex flex-wrap gap-4 pt-4">
                      <Link href="/chapters" className="bg-teal-500 text-slate-900 px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 active:scale-95">
                        Start Learning
                      </Link>
                      <Link href="/material" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                        Material Hub
                      </Link>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="lg:w-[400px] space-y-6">
             <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] shadow-sm flex flex-col h-full">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Course Progress</span>
                <div className="relative w-32 h-32 mx-auto mb-8">
                   <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-100 dark:text-slate-800" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${stats.progressPct} 100`} strokeLinecap="round" className="text-teal-500 transition-all duration-1000" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">{stats.progressPct}%</span>
                   </div>
                </div>
                <div className="space-y-4 flex-grow">
                   <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                      <span className="text-xs text-slate-500">Chapters Mastery</span>
                      <span className="font-bold">{stats.completed}/{stats.total}</span>
                   </div>
                   <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                      <span className="text-xs text-slate-500">Student Status</span>
                      <span className="font-bold text-teal-600">Advanced</span>
                   </div>
                </div>
                <Link href="/progress" className="mt-6 text-center text-xs font-bold text-primary uppercase tracking-widest hover:underline">
                  View Achievements
                </Link>
             </div>
          </div>
        </div>

        {/* Continue Reading Card */}
        <div className="mb-20">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-teal-500 rounded-full" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Jump back in</h2>
           </div>
           <Link href={`/chapters/${currentChapter.id}/${currentLesson?.id || ""}`} className="block group">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 hover:shadow-2xl transition-all border-l-8 border-l-teal-500">
                 <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/20 rounded-3xl flex items-center justify-center text-teal-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl">{currentChapter.icon}</span>
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Chapter</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{currentChapter.title}</h3>
                    <p className="text-slate-500 line-clamp-1">{currentLesson?.title || "Continue your journey"}</p>
                 </div>
                 <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest group-hover:bg-teal-500 group-hover:text-slate-900 transition-colors">
                    Resume Now
                 </div>
              </div>
           </Link>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
           {[
             { title: "Definitions", icon: "dictionary", href: "/word-box", color: "bg-amber-500" },
             { title: "Full Material", icon: "article", href: "/material", color: "bg-blue-500" },
             { title: "Quiz Bank", icon: "quiz", href: "/quiz", color: "bg-purple-500" },
             { title: "Final Exam", icon: "history_edu", href: "/exam", color: "bg-red-500" }
           ].map((action, i) => (
             <Link key={i} href={action.href} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-[2rem] hover:-translate-y-2 transition-all shadow-sm flex flex-col items-center text-center group">
                <div className={`w-14 h-14 ${action.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                   <span className="material-symbols-outlined text-3xl">{action.icon}</span>
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">{action.title}</h4>
                <p className="text-xs text-slate-400 mt-2">Explore the hub</p>
             </Link>
           ))}
        </div>

        {/* Motivational Quote Area */}
        <div className="bg-slate-50 dark:bg-slate-900/50 p-12 rounded-[3rem] text-center max-w-4xl mx-auto border-2 border-dashed border-slate-200 dark:border-slate-800">
           <span className="material-symbols-outlined text-slate-300 text-5xl mb-6">format_quote</span>
           <p className="text-2xl font-serif italic text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
             "Stylistics isn't just about analyzing sentences; it's about uncovering the soul of the writer through the patterns they weave."
           </p>
           <p className="font-bold text-teal-600 uppercase tracking-widest text-xs">— Professor Adel's Advice</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
