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

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option === currentQuestion?.correct) {
      setScore(s => s + 10);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-12 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <span className="material-symbols-outlined text-[120px]">school</span>
        </div>
        <div className="max-w-lg mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-teal-500/10 text-teal-600 mb-6">
            <span className="material-symbols-outlined text-3xl font-bold">dictionary</span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl mb-4 text-slate-900 dark:text-white font-bold tracking-tight">
            The Word Box
          </h1>
          <p className="font-body-lg text-slate-500 max-w-2xl mx-auto mb-8">
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
                <div className="px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 font-bold text-teal-600">
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
               <div className="space-y-8">
                  <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-teal-500/30">
                     <p className="text-xs font-bold text-teal-500 uppercase tracking-widest mb-2">Identify the definition for:</p>
                     <h2 className="text-4xl font-serif italic text-slate-900 dark:text-white">{currentQuestion.term}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                     {currentQuestion.options.map((option, i) => (
                       <button
                         key={i}
                         onClick={() => handleOptionSelect(option)}
                         disabled={showResult}
                         className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                           showResult
                           ? option === currentQuestion.correct
                             ? "bg-teal-50 border-teal-500 text-teal-900 dark:bg-teal-900/20 dark:text-teal-200"
                             : option === selectedOption
                             ? "bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20 dark:text-red-200"
                             : "bg-slate-50 border-slate-100 opacity-50 dark:bg-slate-800 dark:border-slate-700"
                           : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-teal-500 hover:shadow-xl dark:hover:bg-slate-800"
                         }`}
                       >
                         <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                           {String.fromCharCode(65 + i)}
                         </span>
                         <span className="text-sm md:text-base leading-relaxed">{option}</span>
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
            <div className="max-w-md mx-auto mb-12 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                type="text" 
                placeholder="Search definitions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all shadow-sm"
              />
            </div>

            {filteredDefinitions.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                <p className="text-slate-500 font-body-lg">No terms found matching "{searchTerm}"</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredDefinitions.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-xs">
                            {item.term.charAt(0).toUpperCase()}
                         </div>
                         <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif italic">
                           {item.term}
                         </h3>
                      </div>
                      <div className="w-full h-px bg-slate-50 dark:bg-slate-800" />
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.definition}
                      </p>
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
