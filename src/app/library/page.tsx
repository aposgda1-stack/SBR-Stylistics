"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

interface Definition {
  id: string;
  term: string;
  definition: string;
  arabic: string;
}

export default function LibraryPage() {
  const [definitions, setDefinitions] = useState<Definition[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/glossary")
      .then((res) => res.json())
      .then((data) => setDefinitions(data));
  }, []);

  const filtered = definitions.filter(
    (d) =>
      d.term.toLowerCase().includes(search.toLowerCase()) ||
      d.arabic.includes(search)
  );

  return (
    <>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div 
          className="text-center mb-16 animate-fade-in-up"
        >
          <h1 className="font-display-lg text-6xl text-primary mb-4 font-bold">Word Box Library</h1>
          <p className="font-body-lg text-xl text-slate-500 max-w-2xl mx-auto font-serif italic">
            Comprehensive collection of all definitions and terms in Stylistics, categorized for your graduation journey.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors text-2xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search for a term (e.g., Cohesion, Foregrounding...)"
              className="w-full pl-16 pr-8 py-6 bg-white border border-slate-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none font-serif text-xl"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Definitions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item, idx) => (
            <div 
              key={item.id}
              className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-[0_10px_50px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="absolute -top-10 -right-10 opacity-[0.03] text-primary group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[150px]">auto_stories</span>
              </div>
              
              <div className="relative z-10">
                <h3 className="font-headline-md text-3xl text-primary mb-6 border-b-2 border-primary/5 pb-6 font-bold">
                  {item.term}
                </h3>
                
                <div className="space-y-8">
                  <div>
                    <span className="font-label-sm text-xs text-slate-400 uppercase tracking-[0.2em] block mb-3 font-bold">Definition</span>
                    <p className="font-body-lg text-xl text-slate-700 leading-relaxed font-serif">
                      {item.definition}
                    </p>
                  </div>
                  
                  <div className="bg-teal-50/30 p-8 rounded-3xl border border-teal-100/30 relative">
                     <span className="absolute top-4 left-4 material-symbols-outlined text-teal-200">translate</span>
                    <span className="font-label-sm text-xs text-teal-600/60 uppercase tracking-[0.2em] block mb-3 font-bold">Arabic Explanation</span>
                    <p className="font-body-lg text-xl text-teal-950 leading-relaxed text-right dir-rtl font-serif">
                      {item.arabic}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div 
            className="text-center py-20 animate-fade-in-up"
          >
            <span className="material-symbols-outlined text-8xl text-slate-200 mb-6 block">search_off</span>
            <p className="text-slate-400 font-serif italic text-2xl">No matching terms found. Try a different keyword.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
