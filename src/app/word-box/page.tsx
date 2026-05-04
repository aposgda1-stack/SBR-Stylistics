"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import definitionsData from "@/data/definitions-bank.json";
import Confetti from "@/components/Confetti";

export default function WordBoxPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{ term: string; correct: string; options: string[] } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);

  const filteredDefinitions = definitionsData.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * definitionsData.length);
    const correctTerm = definitionsData[randomIndex];
    
    // Get 3 random distractors
    const distractors = definitionsData
      .filter(d => d.term !== correctTerm.term)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(d => d.definition);

    const options = [correctTerm.definition, ...distractors].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion({
      term: correctTerm.term,
      correct: correctTerm.definition,
      options
    });
    setSelectedOption(null);
    setShowResult(false);
  };

  useEffect(() => {
    if (isQuizMode && !currentQuestion) {
      startNewQuestion();
    }
  }, [isQuizMode]);

  const handleOptionSelect = async (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option === currentQuestion?.correct) {
      const newScore = score + 10;
      setScore(newScore);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      // Save score to DB
      try {
        const res = await fetch("/api/save-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizId: "word-box-training", score: 10, totalQuestions: 1 }),
        });
        if (res.ok) {
          const data = await res.json();
          window.dispatchEvent(new CustomEvent("progressUpdated", { detail: { totalScore: data.totalScore } }));
        }
      } catch (e) {
        console.error("Score save failed:", e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <header className="bg-[var(--surface)] border-b border-[var(--outline-variant)] py-8 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <span className="material-symbols-outlined text-[120px]">school</span>
        </div>
        <div className="max-w-lg mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-teal-500/10 text-teal-600 mb-6">
            <span className="material-symbols-outlined text-3xl font-bold">dictionary</span>
          </div>
          <h1 className="font-display-lg text-3xl md:text-4xl mb-3 text-[var(--on-surface)] font-bold tracking-tight">
            The Word Box
          </h1>
          <p className="text-sm text-[var(--on-surface-variant)] max-w-sm mx-auto mb-6">
            Master the terminology of Stylistics. Study or test yourself.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
               onClick={() => setIsQuizMode(!isQuizMode)}
               className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                 isQuizMode 
                 ? "bg-slate-900 text-white" 
                 : "bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/20"
               }`}
             >
               <span className="material-symbols-outlined text-sm">{isQuizMode ? 'list' : 'quiz'}</span>
               {isQuizMode ? "Back to List" : "Start Training Mode"}
             </button>
             {isQuizMode && (
                <div className="px-5 py-2.5 bg-[var(--surface-variant)] rounded-xl border border-[var(--outline-variant)] font-black text-teal-500 text-sm">
                   Score: {score}
                </div>
             )}
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-12 pb-24">
        {isQuizMode ? (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
             {currentQuestion && (
               <div className="space-y-5">
                  <div className="text-center p-8 bg-[var(--surface)] rounded-2xl border border-[var(--outline-variant)]">
                     <p className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-2">What is the definition of:</p>
                     <h2 className="text-3xl font-serif italic text-[var(--on-surface)]">{currentQuestion.term}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                     {currentQuestion.options.map((option, i) => (
                       <button
                         key={i}
                         onClick={() => handleOptionSelect(option)}
                         disabled={showResult}
                         className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center gap-3 text-sm ${
                           showResult
                           ? option === currentQuestion.correct
                             ? "bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300"
                             : option === selectedOption
                             ? "bg-red-500/10 border-red-500 text-red-700 dark:text-red-300"
                             : "bg-[var(--surface-variant)] border-[var(--outline-variant)] opacity-40"
                           : "bg-[var(--surface)] border-[var(--outline-variant)] text-[var(--on-surface)] hover:border-teal-500 active:scale-[0.98]"
                         }`}
                       >
                         <span className="w-7 h-7 rounded-lg bg-[var(--surface-variant)] flex items-center justify-center text-[10px] font-black text-[var(--on-surface-variant)] shrink-0">
                           {String.fromCharCode(65 + i)}
                         </span>
                         <span className="leading-relaxed">{option}</span>
                       </button>
                     ))}
                  </div>
                  
                  {showResult && (
                    <div className="pt-8 flex justify-center">
                       <button 
                         onClick={startNewQuestion}
                         className="px-10 py-5 bg-teal-500 text-slate-900 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-teal-400 transition-all flex items-center gap-3 shadow-xl shadow-teal-500/20 active:scale-95"
                       >
                         Next Question
                         <span className="material-symbols-outlined">arrow_forward</span>
                       </button>
                    </div>
                  )}
               </div>
             )}
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="mb-6 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[var(--on-surface-variant)] text-xl">search</span>
              <input 
                type="text" 
                placeholder="Search terms..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface)] text-[var(--on-surface)] placeholder:text-[var(--on-surface-variant)] focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              />
            </div>

            {filteredDefinitions.length === 0 ? (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-5xl text-[var(--on-surface-variant)] mb-3 block">search_off</span>
                <p className="text-[var(--on-surface-variant)] font-bold text-sm">No terms found for "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filteredDefinitions.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--outline-variant)] hover:border-teal-500/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                       <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                          {item.term.charAt(0).toUpperCase()}
                       </div>
                       <div className="flex-1">
                         <h3 className="text-sm font-black text-[var(--on-surface)] mb-1 italic">{item.term}</h3>
                         <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed">{item.definition}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
