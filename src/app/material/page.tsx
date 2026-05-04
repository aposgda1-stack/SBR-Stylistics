"use client";

import { useState } from "react";
import materialData from "@/data/material.json";
import Footer from "@/components/Footer";

export default function MaterialPage() {
  const [activeSection, setActiveSection] = useState(materialData[0].id);

  const currentSection = materialData.find((m) => m.id === activeSection);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-serif">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <span className="material-symbols-outlined text-[200px]">history_edu</span>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10 font-sans">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="material-symbols-outlined text-sm">verified</span>
            Official Study Guide
          </div>
          <h1 className="text-5xl md:text-7xl mb-6 text-slate-900 dark:text-white font-black tracking-tighter">
            STYLISTICS
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed font-medium">
            SUMMARIZED BY PROF. MICK
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
             <span className="flex items-center gap-2"><span className="text-teal-500">⭐</span> Frequently Examined</span>
             <span className="flex items-center gap-2"><span className="text-teal-500">📝</span> Arabic Explanation</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 pb-32 flex flex-col lg:flex-row gap-16">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-96 flex-shrink-0 font-sans">
          <div className="sticky top-24 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.02)]">
               <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] text-xs mb-8 px-2 flex items-center justify-between">
                 Contents
                 <span className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[10px]">{materialData.length}</span>
               </h3>
               <div className="flex flex-col gap-4">
                 {materialData.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => setActiveSection(item.id)}
                     className={`text-left px-6 py-5 rounded-[1.5rem] font-bold text-sm transition-all flex items-start gap-4 ${
                       activeSection === item.id
                         ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-[1.02]"
                         : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                     }`}
                   >
                     <span className={`mt-1 text-[10px] opacity-50 ${activeSection === item.id ? "text-teal-400" : ""}`}>{item.section}</span>
                     <span className="flex-1">{item.title}</span>
                   </button>
                 ))}
               </div>
            </div>
            
            {/* Guide Info */}
            <div className="bg-teal-500 rounded-[3rem] p-10 text-slate-900 shadow-2xl shadow-teal-500/20">
               <h4 className="font-black text-xl mb-4 uppercase italic">Exam Tip</h4>
               <p className="text-sm leading-loose opacity-90 font-medium">
                 Definitions must be written in a word-box format and can be in your own words — but must be grammatically correct and accurate.
               </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <article className="flex-1 bg-white dark:bg-slate-900 rounded-[4rem] p-10 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 min-h-[800px] animate-fade-in-up">
          {currentSection ? (
            <div className="max-w-none">
              <div className="mb-20 border-b border-slate-50 dark:border-slate-800 pb-16">
                 <div className="flex items-center gap-4 text-teal-600 font-black text-xs uppercase tracking-[0.3em] mb-6 font-sans">
                    <span className="w-12 h-[1px] bg-teal-500" />
                    {currentSection.section}
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                   {currentSection.title}
                 </h1>
                 <h2 className="text-2xl font-bold text-slate-400 dark:text-slate-500 dir-rtl">
                   {currentSection.arabicTitle}
                 </h2>
              </div>

              <div className="space-y-12 text-slate-700 dark:text-slate-300 leading-[2.2] text-xl">
                {currentSection.content.split("\n").map((line, idx) => {
                  if (line.startsWith("### ")) {
                    return (
                      <h3 key={idx} className="text-3xl font-black mt-20 mb-10 text-slate-900 dark:text-white flex items-center gap-4 font-sans">
                         <span className="text-teal-500">{line.includes("⭐") ? "⭐" : line.includes("📝") ? "📝" : "✦"}</span>
                         {line.replace(/### |⭐ |📝 /, "")}
                      </h3>
                    );
                  }
                  if (line.startsWith("**") && line.includes("**:")) {
                     const parts = line.split("**: ");
                     return (
                       <div key={idx} className="p-10 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 my-10 relative overflow-hidden group hover:border-teal-500/30 transition-all">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform" />
                          <strong className="text-slate-900 dark:text-white font-black block mb-4 text-2xl font-sans tracking-tight">{parts[0].replace("**", "")}</strong>
                          <span className="text-slate-600 dark:text-slate-400 italic block mb-4">{parts[1]}</span>
                       </div>
                     );
                  }
                  if (line.startsWith("*   ") || line.startsWith("- ")) {
                    return (
                      <div key={idx} className="flex items-start gap-6 ml-6 my-4 bg-white dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-50 dark:border-slate-800">
                         <div className="w-3 h-3 bg-teal-500 rounded-full mt-4 flex-shrink-0 shadow-lg shadow-teal-500/40" />
                         <p className="font-medium">{line.replace(/^[*-]\s+/, "")}</p>
                      </div>
                    );
                  }
                  if (line.trim() === "") return <div key={idx} className="h-8" />;
                  
                  // Arabic text detection for RTL
                  const isArabic = /[\u0600-\u06FF]/.test(line);
                  return (
                    <p 
                      key={idx} 
                      className={`font-medium ${isArabic ? "text-slate-500 text-2xl leading-[2.5] bg-teal-50/30 dark:bg-teal-900/10 p-8 rounded-[2rem] border-l-4 border-teal-500" : ""}`}
                      dir={isArabic ? "rtl" : "ltr"}
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 py-40">
              <span className="material-symbols-outlined text-8xl mb-8 opacity-20">import_contacts</span>
              <p className="font-black text-3xl uppercase tracking-widest opacity-30">Select a Section</p>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
