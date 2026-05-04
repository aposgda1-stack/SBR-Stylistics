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
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <span className="material-symbols-outlined text-3xl">menu_book</span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl mb-4 text-slate-900 dark:text-white">
            Curriculum Material
          </h1>
          <p className="font-body-lg text-slate-500 max-w-2xl mx-auto">
            Read the course material quietly, without distractions. Select a chapter below.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 pb-24 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-4 px-2">Chapters</h3>
            <div className="flex flex-col gap-2">
              {materialData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveChapter(item.id)}
                  className={`text-left px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    activeChapter === item.id
                      ? "bg-primary text-white shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Reader */}
        <article className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 min-h-[500px]">
          {currentMaterial ? (
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-primary prose-a:text-primary prose-strong:text-slate-900 dark:prose-strong:text-white">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                {currentMaterial.title}
              </h1>
              {/* Parse newlines as paragraphs/breaks for simple markdown-like rendering */}
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-loose text-lg font-body-lg">
                {currentMaterial.content.split("\n").map((line, idx) => {
                  if (line.startsWith("### ")) {
                    return <h3 key={idx} className="text-2xl font-bold mt-8 mb-4 text-slate-900 dark:text-white font-serif">{line.replace("### ", "")}</h3>;
                  }
                  if (line.startsWith("**") && line.includes("**:")) {
                     const parts = line.split("**: ");
                     return <p key={idx}><strong>{parts[0].replace("**", "")}:</strong> {parts[1]}</p>;
                  }
                  if (line.startsWith("*   ") || line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ") || line.startsWith("4. ") || line.startsWith("5. ")) {
                    return <li key={idx} className="ml-6 list-disc">{line.replace(/^[*\d.]+\s+/, "")}</li>;
                  }
                  if (line.trim() === "") return <br key={idx} />;
                  return <p key={idx}>{line}</p>;
                })}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400">
              Select a chapter to read.
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
