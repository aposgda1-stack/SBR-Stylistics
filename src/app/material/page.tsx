"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import materialData from "@/data/material.json";

export default function MaterialPage() {
  const [activeChapter, setActiveChapter] = useState(materialData[0].id);

  const currentMaterial = materialData.find((m) => m.id === activeChapter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <span className="material-symbols-outlined text-[150px]">auto_stories</span>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-teal-500/10 text-teal-600 mb-8 shadow-inner">
            <span className="material-symbols-outlined text-4xl font-bold">menu_book</span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-6xl mb-6 text-slate-900 dark:text-white font-bold tracking-tight">
            Academic Material
          </h1>
          <p className="font-body-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            The full curriculum, summarized by Professor Adel. Dive deep into the theories of Stylistics.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 pb-32 flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
               <h3 className="font-bold text-slate-400 uppercase tracking-[0.2em] text-[10px] mb-6 px-2">Table of Contents</h3>
               <div className="flex flex-col gap-3">
                 {materialData.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => setActiveChapter(item.id)}
                     className={`text-left px-5 py-4 rounded-2xl font-bold text-sm transition-all flex items-center gap-3 ${
                       activeChapter === item.id
                         ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                         : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                     }`}
                   >
                     <span className={`w-2 h-2 rounded-full ${activeChapter === item.id ? "bg-teal-400" : "bg-slate-300 dark:bg-slate-700"}`} />
                     {item.title.split(":")[0]}
                   </button>
                 ))}
               </div>
            </div>
            
            {/* Quick Tips Box */}
            <div className="bg-teal-500 rounded-[2.5rem] p-8 text-slate-900 shadow-lg shadow-teal-500/10">
               <span className="material-symbols-outlined text-3xl mb-4 font-bold">lightbulb</span>
               <h4 className="font-bold text-lg mb-2">Prof. Adel's Tip</h4>
               <p className="text-sm leading-relaxed opacity-80">
                 Read carefully and try to find these patterns in the poems we studied. Analysis is all about pattern recognition!
               </p>
            </div>
          </div>
        </aside>

        {/* Content Reader */}
        <article className="flex-1 bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800 min-h-[600px] animate-fade-in-up">
          {currentMaterial ? (
            <div className="max-w-none">
              <div className="mb-12 border-b border-slate-50 dark:border-slate-800 pb-10">
                 <div className="flex items-center gap-3 text-teal-600 font-bold text-xs uppercase tracking-widest mb-4">
                    <span className="material-symbols-outlined text-sm">auto_stories</span>
                    Full Chapter View
                 </div>
                 <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                   {currentMaterial.title}
                 </h1>
              </div>

              <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-loose text-lg">
                {currentMaterial.content.split("\n").map((line, idx) => {
                  if (line.startsWith("### ")) {
                    return (
                      <h3 key={idx} className="text-2xl font-bold mt-12 mb-6 text-slate-900 dark:text-white flex items-center gap-3">
                         <div className="w-2 h-8 bg-teal-500 rounded-full" />
                         {line.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (line.startsWith("**") && line.includes("**:")) {
                     const parts = line.split("**: ");
                     return (
                       <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 my-6">
                          <strong className="text-slate-900 dark:text-white font-bold block mb-1">{parts[0].replace("**", "")}</strong>
                          <span className="text-slate-600 dark:text-slate-400">{parts[1]}</span>
                       </div>
                     );
                  }
                  if (line.startsWith("*   ") || line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) {
                    return (
                      <div key={idx} className="flex items-start gap-4 ml-4 my-2">
                         <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-3 flex-shrink-0" />
                         <p>{line.replace(/^[*\d.]+\s+/, "")}</p>
                      </div>
                    );
                  }
                  if (line.trim() === "") return <div key={idx} className="h-4" />;
                  return <p key={idx} className="font-body-lg">{line}</p>;
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
              <span className="material-symbols-outlined text-6xl mb-4">import_contacts</span>
              <p className="font-bold text-xl">Select a chapter to begin reading.</p>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
