"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ExamQuestion } from "@/types";
import Footer from "@/components/Footer";

const TOTAL_TIME = 22 * 60; // 22 minutes
const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function ExamPage() {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(true);
  const examTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/exam")
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  useEffect(() => {
    if (submitted && questions.length > 0) {
      const correct = questions.filter(
        (q) => answers[q.id] === q.correctIndex
      ).length;

      // Higher weight for exam points: 20 per correct answer
      fetch("/api/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: "final_exam",
          score: correct * 20, 
          totalQuestions: questions.length
        }),
      }).catch(err => console.error("Failed to save exam score:", err));
    }
  }, [submitted, questions, answers]);

  useEffect(() => {
    if (loading || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, submitted, handleSubmit]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-5xl text-slate-300 animate-pulse">
            history_edu
          </span>
          <p className="font-body-lg text-on-surface-variant">Preparing your exam...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-sm px-4">
          <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-5xl text-slate-400">
              sentiment_dissatisfied
            </span>
          </div>
          <h2 className="font-display-md text-2xl font-bold text-slate-900 text-center">No Exam Questions Found</h2>
          <p className="font-body-md text-slate-500 text-center">
            The exam content is currently unavailable. Please check back later.
          </p>
          <Link 
            href="/chapters" 
            className="inline-flex px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 mt-4"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    const correct = questions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const pct = Math.round((correct / questions.length) * 100);
    const isPassing = pct >= 60;

    return (
      <>
        <main className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center mb-10 md:mb-12 animate-fade-in-up">
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                isPassing ? "bg-teal-50 dark:bg-teal-900/20" : "bg-red-50 dark:bg-red-900/20"
              }`}
            >
              <span
                className={`material-symbols-outlined text-4xl md:text-5xl filled ${
                  isPassing ? "text-teal-500" : "text-error"
                }`}
              >
                {isPassing ? "workspace_premium" : "sentiment_dissatisfied"}
              </span>
            </div>
            <h1 className="font-display-md text-3xl md:text-5xl mb-4 text-slate-900 dark:text-white">
              {isPassing ? "Exam Passed!" : "Exam Complete"}
            </h1>
            <p className="font-body-lg text-slate-600 dark:text-slate-400">
              Score: <span className="font-bold text-primary text-3xl">{pct}%</span>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Correct</span>
              <span className="text-2xl font-bold text-teal-600">{correct}</span>
            </div>
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Wrong</span>
              <span className="text-2xl font-bold text-error">
                {questions.length - correct - (questions.length - Object.keys(answers).length)}
              </span>
            </div>
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Skipped</span>
              <span className="text-2xl font-bold text-slate-400">
                {questions.length - Object.keys(answers).length}
              </span>
            </div>
            <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center shadow-sm">
              <span className="block text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total</span>
              <span className="text-2xl font-bold text-primary">{questions.length}</span>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Review</h3>
            {questions.map((q, idx) => {
              const chosen = answers[q.id];
              const isCorrect = chosen === q.correctIndex;
              const skipped = chosen === undefined;
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${skipped ? "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50" : isCorrect ? "border-teal-100 bg-teal-50/30" : "border-red-100 bg-red-50/30"}`}>
                   <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Question {idx + 1}</p>
                   <p className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">{q.question}</p>
                   <div className="text-xs font-medium">
                     {skipped ? <span className="text-slate-500">Not Answered</span> : isCorrect ? <span className="text-teal-600">✓ {q.options[chosen]}</span> : <span className="text-error">✗ {q.options[chosen]} (Correct: {q.options[q.correctIndex]})</span>}
                   </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="flex-1 px-8 py-4 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl font-bold text-xs uppercase tracking-widest text-center">Back Home</Link>
            <Link href="/chapters" className="flex-1 px-8 py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest text-center">Lessons</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const completionPct = Math.round((answeredCount / questions.length) * 100);
  const timePct = (timeLeft / TOTAL_TIME) * 100;

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
        <div ref={examTopRef} className="absolute top-0 left-0" />
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md -mx-4 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-row justify-between items-center gap-4 lg:hidden">
            <div className={`flex items-center gap-2 font-bold ${timeLeft < 300 ? "text-error" : "text-primary"}`}>
               <span className="material-symbols-outlined text-xl">timer</span>
               <span className="text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex-1 max-w-[120px] bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
               <div className="bg-[#2E7D32] h-full transition-all" style={{ width: `${completionPct}%` }} />
            </div>
            <button onClick={handleSubmit} className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg">Submit</button>
        </div>

        <div className="hidden lg:block mb-10 border-l-4 border-primary pl-6">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-1">Assessment</span>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Stylistics Final Exam</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mt-4 lg:mt-0">
          {/* Question Column */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-10 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="material-symbols-outlined text-slate-300">bookmark</span>
              </div>

              <h2 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              {currentQuestion.passage && (
                <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800 border-l-4 border-primary rounded-r-xl mb-8 italic text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  "{currentQuestion.passage}"
                </div>
              )}

              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentQuestion.id] === idx;
                  return (
                    <label key={idx} className={`flex items-center p-4 md:p-5 border-2 rounded-xl cursor-pointer transition-all ${isSelected ? "border-primary bg-primary/5" : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50"}`}>
                      <input type="radio" name="exam_option" className="w-5 h-5 accent-primary" checked={isSelected} onChange={() => handleAnswer(currentQuestion.id, idx)} />
                      <span className={`ml-4 text-sm md:text-base ${isSelected ? "font-bold text-primary" : "text-slate-600 dark:text-slate-400"}`}>
                        <span className="font-bold mr-2 text-slate-400">{OPTION_LETTERS[idx]}.</span> {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center py-6">
              <button onClick={() => { setCurrentIdx((i) => Math.max(0, i - 1)); examTopRef.current?.scrollIntoView({ behavior: "smooth" }); }} disabled={currentIdx === 0} className="p-3 md:px-8 md:py-4 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs uppercase tracking-widest disabled:opacity-30">Prev</button>
              <button onClick={() => { setCurrentIdx((i) => Math.min(questions.length - 1, i + 1)); examTopRef.current?.scrollIntoView({ behavior: "smooth" }); }} disabled={currentIdx === questions.length - 1} className="flex-1 ml-4 py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest disabled:opacity-30">Next Question</button>
            </div>
          </div>

          {/* Status Column (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24 h-fit">
            <div className="bg-slate-900 text-white p-8 rounded-2xl space-y-8">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Timer</span>
                <div className={`flex items-center gap-3 ${timeLeft < 300 ? "text-error" : "text-white"}`}>
                  <span className="material-symbols-outlined text-3xl">timer</span>
                  <span className="text-4xl font-bold tabular-nums">{formatTime(timeLeft)}</span>
                </div>
              </div>
              <div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Progress</span>
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-bold">{answeredCount}/{questions.length}</span>
                    <span className="text-xs text-slate-400">{completionPct}%</span>
                 </div>
                 <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full transition-all" style={{ width: `${completionPct}%` }} />
                 </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-4">Navigator</span>
               <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => (
                    <button key={q.id} onClick={() => setCurrentIdx(idx)} className={`w-full aspect-square rounded-lg text-xs font-bold transition-all ${idx === currentIdx ? "bg-primary text-white" : answers[q.id] !== undefined ? "bg-primary/10 text-primary" : "bg-slate-50 dark:bg-slate-800 text-slate-400"}`}>{idx + 1}</button>
                  ))}
               </div>
            </div>

            <button onClick={handleSubmit} className="w-full py-5 bg-teal-600 text-white font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-teal-700 transition-all">Submit Final Exam</button>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
