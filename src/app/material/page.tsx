"use client";

import { useState } from "react";
import materialData from "@/data/material.json";
import Footer from "@/components/Footer";

export default function MaterialPage() {
  const [activeSection, setActiveSection] = useState(materialData[0].id);

  const currentSection = materialData.find((m) => m.id === activeSection);

  // Helper to parse simple markdown bolding and clean up text
  const formatContent = (text: string) => {
    return text.split("**").map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-slate-900 dark:text-white font-black">{part}</strong> : part
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-serif">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <span className="material-symbols-outlined text-[200px]">history_edu</span>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10 font-sans">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500/10 text-teal-600 text-xs font-black uppercase tracking-[0.3em] mb-10 border border-teal-500/20">
            <span className="material-symbols-outlined text-sm">verified_user</span>
            FULL CURRICULUM 2026
          </div>
          <h1 className="text-6xl md:text-8xl mb-8 text-slate-900 dark:text-white font-black tracking-tighter">
            STYLISTICS
          </h1>
          <p className="text-slate-400 dark:text-slate-500 max-w-2xl mx-auto text-2xl leading-relaxed font-bold italic">
            "Detailed content with Egyptian breakdowns."
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-20 pb-32 flex flex-col lg:flex-row gap-16">
        {/* Sidebar */}
        <aside className="w-full lg:w-96 flex-shrink-0 font-sans">
          <div className="sticky top-24 space-y-10">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
               <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] text-[11px] mb-10 px-2 flex items-center justify-between">
                 CONTENTS
                 <span className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[11px]">{materialData.length}</span>
               </h3>
               <div className="flex flex-col gap-4">
                 {materialData.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => setActiveSection(item.id)}
                     className={`text-left px-8 py-6 rounded-[2rem] font-black text-sm transition-all flex items-start gap-4 ${
                       activeSection === item.id
                         ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 scale-[1.03]"
                         : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent"
                     }`}
                   >
                     <span className={`mt-1 text-[10px] opacity-40 ${activeSection === item.id ? "text-teal-400 opacity-100" : ""}`}>{item.section}</span>
                     <span className="flex-1 leading-tight">{item.title}</span>
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <article className="flex-1 bg-white dark:bg-slate-900 rounded-[5rem] p-12 md:p-24 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 min-h-[900px] animate-fade-in-up">
          {currentSection ? (
            <div className="max-w-none">
              <div className="mb-24 border-b border-slate-50 dark:border-slate-800 pb-20">
                 <div className="flex items-center gap-4 text-teal-600 font-black text-xs uppercase tracking-[0.4em] mb-8 font-sans">
                    <span className="w-16 h-[2px] bg-teal-500" />
                    {currentSection.section}
                 </div>
                 <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter">
                   {currentSection.title}
                 </h1>
                 <h2 className="text-3xl font-bold text-slate-300 dark:text-slate-600 dir-rtl">
                   {currentSection.arabicTitle}
                 </h2>
              </div>

              <div className="space-y-16 text-slate-700 dark:text-slate-300 leading-[2.3] text-2xl">
                {currentSection.content.split("\n").map((line, idx) => {
                  // Title Rendering
                  if (line.startsWith("### ")) {
                    const isEgyptian = line.includes("شعبولي الموضوع كدا");
                    return (
                      <h3 key={idx} className={`text-3xl font-black mt-24 mb-12 flex items-center gap-6 font-sans ${isEgyptian ? "text-teal-600 dir-rtl" : "text-slate-900 dark:text-white"}`}>
                         {!isEgyptian && <span className="w-3 h-10 bg-teal-500 rounded-full" />}
                         {line.replace("### ", "")}
                         {isEgyptian && <span className="material-symbols-outlined text-4xl">emoji_objects</span>}
                      </h3>
                    );
                  }

                  // Definitions/Bold Blocks Rendering
                  if (line.startsWith("**") && line.includes("**:")) {
                     const parts = line.split("**: ");
                     return (
                       <div key={idx} className="p-12 bg-slate-50 dark:bg-slate-800/50 rounded-[3.5rem] border-2 border-slate-100 dark:border-slate-800 my-16 relative overflow-hidden group hover:border-teal-500/30 transition-all">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform" />
                          <strong className="text-slate-900 dark:text-white font-black block mb-6 text-3xl font-sans tracking-tight">{parts[0].replace("**", "")}</strong>
                          <span className="text-slate-600 dark:text-slate-400 italic block leading-relaxed">{formatContent(parts[1])}</span>
                       </div>
                     );
                  }

                  // List Item Rendering
                  if (line.startsWith("*   ") || line.startsWith("- ") || line.startsWith("1. ") || line.startsWith("2. ")) {
                    return (
                      <div key={idx} className="flex items-start gap-8 ml-8 my-6 bg-slate-50/50 dark:bg-slate-800/20 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                         <div className="w-4 h-4 bg-teal-500 rounded-full mt-5 flex-shrink-0 shadow-lg shadow-teal-500/40" />
                         <p className="font-bold text-slate-800 dark:text-slate-200">{formatContent(line.replace(/^[*\d.-]+\s+/, ""))}</p>
                      </div>
                    );
                  }

                  if (line.trim() === "") return <div key={idx} className="h-8" />;
                  
                  // Egyptian Section Content
                  const isArabic = /[\u0600-\u06FF]/.test(line);
                  return (
                    <p 
                      key={idx} 
                      className={`font-bold ${isArabic ? "text-slate-600 dark:text-slate-400 text-3xl leading-[2.6] bg-teal-50/20 dark:bg-teal-900/10 p-12 rounded-[3rem] border-r-8 border-teal-500 shadow-inner" : "font-medium"}`}
                      dir={isArabic ? "rtl" : "ltr"}
                    >
                      {formatContent(line)}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 py-40">
              <span className="material-symbols-outlined text-8xl mb-8 opacity-20">history_edu</span>
              <p className="font-black text-3xl uppercase tracking-widest opacity-30">Full Material Hub</p>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
