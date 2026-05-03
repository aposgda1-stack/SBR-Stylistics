"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import definitionsData from "@/data/definitions-bank.json";

interface DefinitionItem {
  term: string;
  definition: string;
}

export default function DefinitionsPage() {
  const [items, setItems] = useState<DefinitionItem[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle definitions and terms
    const shuffled = [...definitionsData].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setShuffledTerms([...definitionsData].map(d => d.term).sort(() => Math.random() - 0.5));
  }, []);

  const handleTermClick = (term: string) => {
    if (showResults) return;
    setSelectedTerm(term === selectedTerm ? null : term);
  };

  const handleBlankClick = (index: number) => {
    if (showResults) return;
    if (selectedTerm) {
      setUserAnswers(prev => ({ ...prev, [index]: selectedTerm }));
      setSelectedTerm(null);
    } else if (userAnswers[index]) {
      // Clear blank if clicked without selected term
      const newAnswers = { ...userAnswers };
      delete newAnswers[index];
      setUserAnswers(newAnswers);
    }
  };

  const checkResults = () => {
    setShowResults(true);
  };

  const reset = () => {
    setShowResults(false);
    setUserAnswers({});
    setSelectedTerm(null);
    const shuffled = [...definitionsData].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setShuffledTerms([...definitionsData].map(d => d.term).sort(() => Math.random() - 0.5));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <span className="material-symbols-outlined text-3xl">dictionary</span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl mb-4 text-slate-900">
            Definitions Master
          </h1>
          <p className="font-body-lg text-slate-500 max-w-2xl mx-auto">
            Test your knowledge of stylistic terminology. Select a term from the word box and place it in the correct definition.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Word Box */}
        <div className="sticky top-6 z-30 bg-white/80 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 shadow-xl mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">inventory_2</span>
            <h2 className="font-label-md text-primary uppercase tracking-widest text-sm">Word Box (قائمة المصطلحات)</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {shuffledTerms.map((term) => {
              const isUsed = Object.values(userAnswers).includes(term);
              const isSelected = selectedTerm === term;
              return (
                <button
                  key={term}
                  onClick={() => handleTermClick(term)}
                  disabled={showResults || isUsed}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isUsed 
                      ? 'bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed'
                      : isSelected
                        ? 'bg-primary text-white shadow-lg scale-105'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  {term}
                </button>
              );
            })}
          </div>
          {selectedTerm && (
            <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-xl flex items-center gap-3 animate-pulse">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Placing:</span>
              <span className="font-bold text-slate-800">{selectedTerm}</span>
              <button 
                onClick={() => setSelectedTerm(null)}
                className="ml-auto text-slate-400 hover:text-error"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 gap-6">
          {items.map((item, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl p-6 border transition-all duration-500 ${
                showResults 
                  ? userAnswers[index] === item.term 
                    ? 'border-teal-200 bg-teal-50/30' 
                    : 'border-red-200 bg-red-50/30'
                  : 'border-slate-100 hover:shadow-lg'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-slate-400">
                  {index + 1}
                </div>
                
                <div className="flex-grow space-y-4 w-full">
                  <div className="flex flex-wrap items-center gap-3 font-body-lg text-lg text-slate-700 leading-relaxed">
                    <button
                      onClick={() => handleBlankClick(index)}
                      className={`min-w-[180px] h-10 px-4 rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-300 ${
                        userAnswers[index]
                          ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm'
                          : 'border-slate-300 hover:border-primary/50 text-slate-400'
                      } ${showResults ? (userAnswers[index] === item.term ? 'border-teal-500 text-teal-600 bg-teal-50' : 'border-red-500 text-red-600 bg-red-50') : ''}`}
                    >
                      {userAnswers[index] || "Click to place term"}
                    </button>
                    <span>: {item.definition}</span>
                  </div>

                  {showResults && userAnswers[index] !== item.term && (
                    <div className="flex items-center gap-2 text-sm font-bold text-error animate-fade-in mt-4">
                      <span className="material-symbols-outlined text-sm">info</span>
                      The Correct Answer is: <span className="text-slate-900 ml-1">{item.term}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex items-center justify-center gap-6 pb-20">
          {!showResults ? (
            <button
              onClick={checkResults}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-12 py-5 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check All Answers
            </button>
          ) : (
            <button
              onClick={reset}
              className="px-12 py-5 bg-slate-800 text-white rounded-2xl font-bold uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Try Again
            </button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
