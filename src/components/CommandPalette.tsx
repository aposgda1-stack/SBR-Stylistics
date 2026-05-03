"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAllChapters } from "@/lib/contentService";
import definitionsData from "@/data/definitions-bank.json";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const chapters = getAllChapters();
  const allLessons = chapters.flatMap(c => c.lessons.map(l => ({ ...l, chapterId: c.id, chapterTitle: c.title, type: 'lesson' })));
  const allDefinitions = definitionsData.map(d => ({ ...d, title: d.term, type: 'definition' }));
  
  const allItems = [...allLessons, ...allDefinitions];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const searchResults = allItems.filter(item => 
      (item as any).title.toLowerCase().includes(query.toLowerCase()) || 
      ((item as any).term && (item as any).term.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 8);
    setResults(searchResults);
  }, [query]);

  const handleSelect = (item: any) => {
    setIsOpen(false);
    setQuery("");
    if (item.type === 'lesson') {
      router.push(`/lessons/${item.chapterId}/${item.id}`);
    } else {
      router.push(`/definitions`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-lg text-slate-900 dark:text-white placeholder:text-slate-400"
            placeholder="Search lessons, definitions, or topics... (Ctrl+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700 px-2 py-1 rounded"
          >
            Esc
          </button>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto p-2">
          {results.length > 0 ? (
            results.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSelect(item)}
                className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-teal-500/10 flex items-center justify-center text-primary dark:text-teal-400">
                  <span className="material-symbols-outlined">
                    {item.type === 'lesson' ? 'school' : 'dictionary'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.type === 'lesson' ? `Chapter ${item.chapterTitle}` : 'Definition'}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </button>
            ))
          ) : query.trim() !== "" ? (
            <div className="p-8 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
              <p>No results found for "{query}"</p>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm">Type something to search the curriculum...</p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="border px-1 rounded">↑↓</span> to navigate</span>
            <span className="flex items-center gap-1"><span className="border px-1 rounded">Enter</span> to select</span>
          </div>
          <span>Stylistics Hub</span>
        </div>
      </div>
    </div>
  );
}
