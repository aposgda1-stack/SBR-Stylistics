"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getAllChapters } from "@/lib/contentService";
import definitions from "@/data/definitions-bank.json";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ type: string; title: string; href: string; excerpt: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const searchResults: any[] = [];

    // Search Chapters & Lessons
    const chapters = getAllChapters();
    chapters.forEach((ch) => {
      if (ch.title.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: "Chapter",
          title: ch.title,
          href: "/lessons",
          excerpt: ch.description,
        });
      }
      ch.lessons.forEach((ls) => {
        if (ls.title.toLowerCase().includes(lowerQuery) || ls.subtitle.toLowerCase().includes(lowerQuery)) {
          searchResults.push({
            type: "Lesson",
            title: ls.title,
            href: `/lessons/${ch.id}/${ls.id}`,
            excerpt: ls.subtitle,
          });
        }
      });
    });

    // Search Definitions
    definitions.forEach((def) => {
      if (def.term.toLowerCase().includes(lowerQuery) || def.definition.toLowerCase().includes(lowerQuery)) {
        searchResults.push({
          type: "Definition",
          title: def.term,
          href: "/definitions",
          excerpt: def.definition,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center p-4 md:p-20 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300 border border-slate-100 dark:border-slate-800">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons, definitions, or topics..."
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <span className="material-symbols-outlined text-slate-400">close</span>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === "" ? (
            <div className="py-20 text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-slate-100 dark:text-slate-800">manage_search</span>
              <p className="text-slate-400 font-medium">Type something to search the curriculum...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              {results.map((res, i) => (
                <Link
                  key={res.id || i}
                  href={res.type === "Lesson" ? `/chapters/${res.chapterId}/${res.id}` : res.href || "/chapters"}
                  onClick={onClose}
                  className="flex items-start gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <span className="material-symbols-outlined text-xl">
                      {res.type === "Definition" ? "dictionary" : res.type === "Lesson" ? "school" : "account_tree"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">{res.type}</span>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">{res.title}</h4>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{res.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-slate-100 dark:text-slate-800">sentiment_dissatisfied</span>
              <p className="text-slate-400 font-medium">No results found for "{query}"</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest px-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-sm">Enter</span> to select
            </span>
            <span className="flex items-center gap-1">
              <span className="p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-sm">Esc</span> to close
            </span>
          </div>
          <span>Stylistics Search</span>
        </div>
      </div>
    </div>
  );
}
