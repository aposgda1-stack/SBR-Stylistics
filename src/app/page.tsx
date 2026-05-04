"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const { user } = useUser();
  const firstName = user?.firstName || "Scholar";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="max-w-7xl mx-auto px-6 py-20 pb-32">
        {/* Welcome Section */}
        <section className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="relative p-12 md:p-20 rounded-[4rem] bg-slate-900 overflow-hidden shadow-2xl">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-teal-500/10 text-teal-400 text-xs font-black uppercase tracking-[0.3em] mb-8 border border-teal-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  System Active • Ruby Edition
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                  Stay strong, <br />
                  <span className="text-teal-500">{firstName}</span>.
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                  "Your brother Ruby is here to tell you that you've got this. We've mapped out every single definition and analysis you need to dominate the exam. Let's get to work."
                </p>
                
                <div className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start">
                   <Link href="/chapters" className="px-10 py-5 bg-teal-500 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal-500/20">
                      Continue Journey
                   </Link>
                   <Link href="/material" className="px-10 py-5 bg-white/10 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all backdrop-blur-md">
                      Full Syllabus
                   </Link>
                </div>
              </div>
              
              {/* Ruby's Motivation Box */}
              <div className="w-full md:w-80 p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl group hover:border-teal-500/50 transition-all">
                 <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-slate-900 mb-6 shadow-lg shadow-teal-500/20">
                    <span className="material-symbols-outlined text-3xl font-bold">favorite</span>
                 </div>
                 <h4 className="text-white font-black text-lg mb-4 uppercase tracking-tighter">Ruby's Motivation</h4>
                 <p className="text-slate-400 text-sm leading-loose italic">
                   "Success in Stylistics isn't about memorizing; it's about seeing the patterns Mick described, but through our eyes."
                 </p>
                 <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-black text-teal-500 uppercase tracking-widest">
                    <span>From Ruby with Love</span>
                    <span className="material-symbols-outlined text-sm">verified</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
           {/* Primary Hub */}
           <Link href="/chapters" className="md:col-span-8 group relative overflow-hidden rounded-[4rem] bg-white dark:bg-slate-900 p-12 border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-[120px]">explore</span>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div>
                    <span className="text-teal-500 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Interactive Learning</span>
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Visual Journey Map</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-md">Navigate the 9 comprehensive chapters of stylistics via our island-based curriculum map.</p>
                 </div>
                 <div className="mt-12 flex items-center gap-4 text-slate-900 dark:text-white font-black uppercase text-xs tracking-widest">
                    Explore Now
                    <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                 </div>
              </div>
           </Link>

           {/* Material Hub */}
           <Link href="/material" className="md:col-span-4 group relative overflow-hidden rounded-[4rem] bg-teal-500 p-12 shadow-2xl shadow-teal-500/10 hover:shadow-teal-500/20 transition-all">
              <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-8">
                    <span className="material-symbols-outlined text-3xl">auto_stories</span>
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Study Guide</h2>
                    <p className="text-slate-900/70 font-bold leading-relaxed">Summarized notes with Arabic explanations.</p>
                 </div>
              </div>
           </Link>

           {/* Word Box */}
           <Link href="/word-box" className="md:col-span-4 group relative overflow-hidden rounded-[4rem] bg-white dark:bg-slate-900 p-12 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white mb-8 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-teal-500 dark:group-hover:text-slate-900 transition-all">
                 <span className="material-symbols-outlined text-2xl">style</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">The Word Box</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Flashcards & Training mode.</p>
           </Link>

           {/* Exam Practice */}
           <Link href="/exam" className="md:col-span-8 group relative overflow-hidden rounded-[4rem] bg-slate-100 dark:bg-slate-900 p-12 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all">
              <div className="flex flex-col md:flex-row gap-12 items-center h-full">
                 <div className="flex-1">
                    <span className="px-3 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 inline-block">High Stakes</span>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Simulated Final Exam</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Test your knowledge with real past paper questions from 2020-2024.</p>
                 </div>
                 <div className="w-32 h-32 rounded-full border-[10px] border-teal-500/20 border-t-teal-500 flex items-center justify-center text-teal-500 font-black text-2xl">
                    0%
                 </div>
              </div>
           </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
