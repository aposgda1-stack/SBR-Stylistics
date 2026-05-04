"use client";

import { useState, useRef, useEffect } from "react";
import materialData from "@/data/material.json";
import Footer from "@/components/Footer";

export default function MaterialPage() {
  const [activeSection, setActiveSection] = useState(materialData[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentSection = materialData.find((m) => m.id === activeSection);

  // Auto-scroll the tabs to the active one
  useEffect(() => {
    const activeTab = document.getElementById(`tab-${activeSection}`);
    if (activeTab && scrollRef.current) {
      const scrollLeft = activeTab.offsetLeft - (scrollRef.current.offsetWidth / 2) + (activeTab.offsetWidth / 2);
      scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeSection]);

  // Better regex for bolding and removing **
  const formatContent = (text: string) => {
    if (!text) return "";
    const parts = text.split("**");
    return parts.map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-slate-900 dark:text-white font-black">{part}</strong> : part
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans pb-20">
      {/* Mobile-Friendly Header */}
      <header className="bg-slate-900 pt-16 pb-12 px-6 relative overflow-hidden text-center md:text-left">
         <div className="max-w-5xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
              Study Hub
            </h1>
            <p className="text-teal-400 text-sm font-bold uppercase tracking-[0.2em]">
              The Ultimate Curriculum Guide
            </p>
         </div>
         {/* Decorative circle */}
         <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
      </header>

      {/* Sticky Top Navigation (Mobile Friendly) */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
        <div 
          ref={scrollRef}
          className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar gap-3 px-6 py-4"
        >
          {materialData.map((item) => (
            <button
              id={`tab-${item.id}`}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20 scale-105"
                  : "text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {item.section}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentSection ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Section Heading */}
            <div className="text-center md:text-left">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter leading-tight">
                  {currentSection.title}
               </h2>
               <p className="text-slate-400 dark:text-slate-500 font-bold italic" dir="rtl">
                  {currentSection.arabicTitle}
               </p>
            </div>

            {/* Content Blocks */}
            <div className="space-y-12">
              {currentSection.content.split("\n").map((line, idx) => {
                if (!line.trim()) return <div key={idx} className="h-4" />;

                // Titles
                if (line.startsWith("### ")) {
                  const isSha3boli = line.includes("شعبولي الموضوع كدا");
                  return (
                    <h3 
                      key={idx} 
                      className={`text-2xl font-black mt-12 mb-6 flex items-center gap-4 ${
                        isSha3boli ? "text-teal-600 dir-rtl border-r-4 border-teal-500 pr-4" : "text-slate-900 dark:text-white"
                      }`}
                    >
                       {!isSha3boli && <div className="w-2 h-8 bg-slate-900 dark:bg-teal-500 rounded-full" />}
                       {line.replace("### ", "").replace(/\*\*/g, "")}
                    </h3>
                  );
                }

                // Bold Boxes/Definitions (Word Box Format)
                if (line.startsWith("**") && line.includes("**:")) {
                   const parts = line.split("**: ");
                   return (
                     <div key={idx} className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border-4 border-slate-900 dark:border-teal-500 shadow-[20px_20px_0px_rgba(0,0,0,0.1)] dark:shadow-[20px_20px_0px_rgba(20,184,166,0.1)] mb-12 transform hover:-translate-y-2 transition-transform">
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-teal-500 flex items-center justify-center text-white dark:text-slate-900">
                              <span className="material-symbols-outlined text-xl">menu_book</span>
                           </div>
                           <strong className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                             {parts[0].replace(/\*\*/g, "")}
                           </strong>
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 text-xl leading-relaxed font-bold border-l-4 border-slate-200 dark:border-slate-700 pl-6 italic">
                           {formatContent(parts[1])}
                        </div>
                     </div>
                   );
                }

                // Normal Paragraphs
                const isArabic = /[\u0600-\u06FF]/.test(line);
                return (
                  <p 
                    key={idx} 
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`text-lg md:text-xl leading-relaxed ${
                      isArabic 
                        ? "font-bold text-slate-600 dark:text-slate-300 bg-teal-50/30 dark:bg-teal-900/10 p-8 rounded-[2.5rem] border-l-4 border-teal-500" 
                        : "text-slate-500 dark:text-slate-400 font-medium"
                    }`}
                  >
                    {formatContent(line)}
                  </p>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="py-40 text-center text-slate-300">
             <span className="material-symbols-outlined text-6xl opacity-20">article</span>
             <p className="font-bold mt-4">Select a section to start</p>
          </div>
        )}
      </main>

      {/* Quick Navigation Footer (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-slate-900/90 backdrop-blur-md rounded-full shadow-2xl z-[60]">
         <button 
           onClick={() => {
              const idx = materialData.findIndex(m => m.id === activeSection);
              if (idx > 0) setActiveSection(materialData[idx-1].id);
           }}
           className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10"
         >
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
         </button>
         <div className="px-4 text-[10px] font-black text-white uppercase tracking-widest border-x border-white/10">
            {materialData.findIndex(m => m.id === activeSection) + 1} / {materialData.length}
         </div>
         <button 
           onClick={() => {
              const idx = materialData.findIndex(m => m.id === activeSection);
              if (idx < materialData.length - 1) setActiveSection(materialData[idx+1].id);
           }}
           className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white/10"
         >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
         </button>
      </div>

      <Footer />
    </div>
  );
}
