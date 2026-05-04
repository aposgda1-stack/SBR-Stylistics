"use client";

import { useState } from "react";
import materialData from "@/data/material.json";
import Footer from "@/components/Footer";

interface Card {
  term: string;
  definition: string;
  category: string;
}

export default function FlashcardsPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Flatten material data into cards
  const cards: Card[] = materialData.flatMap(section => {
    return section.content.split("\n")
      .filter(line => line.startsWith("**") && line.includes("**: "))
      .map(line => {
        const [term, def] = line.split("**: ");
        return {
          term: term.replace(/\*\*/g, ""),
          definition: def,
          category: section.section
        };
      });
  });

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  if (cards.length === 0) return <div>No flashcards available.</div>;

  const currentCard = cards[currentIdx];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-24 flex flex-col items-center">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-teal-100 dark:border-teal-900/30">
            <span className="material-symbols-outlined text-sm">style</span>
            Memory Booster
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
            Definition Flashcards
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-bold">
            Master the core terminology of English Stylistics.
          </p>
        </div>

        {/* Card Container */}
        <div className="w-full max-w-xl perspective-1000 h-[400px] md:h-[450px]">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* Front Side */}
            <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-teal-500 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-[20px_20px_0px_rgba(0,0,0,0.05)] dark:shadow-[20px_20px_0px_rgba(20,184,166,0.05)]">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">{currentCard.category}</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                {currentCard.term}
              </h2>
              <div className="mt-12 flex items-center gap-2 text-primary font-bold animate-pulse">
                <span className="material-symbols-outlined">touch_app</span>
                <span className="text-xs uppercase tracking-widest">Tap to reveal</span>
              </div>
            </div>

            {/* Back Side */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 text-white rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl">
              <h3 className="text-lg font-black uppercase tracking-[0.3em] text-teal-400 mb-6">Definition</h3>
              <p className="text-xl md:text-2xl leading-relaxed font-serif italic text-slate-300">
                {currentCard.definition}
              </p>
              <div className="mt-12 flex items-center gap-2 text-teal-500 font-bold">
                <span className="material-symbols-outlined">refresh</span>
                <span className="text-xs uppercase tracking-widest">Tap to flip back</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-16 flex items-center gap-8">
          <button 
            onClick={prevCard}
            className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">
            {currentIdx + 1} / {cards.length}
          </div>
          <button 
            onClick={nextCard}
            className="w-16 h-16 rounded-full bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>

        <div className="mt-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
          Tip: Try to recall the definition before flipping the card!
        </div>
      </main>
      <Footer />
    </div>
  );
}
