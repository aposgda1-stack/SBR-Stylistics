"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import QuestionBlock from "@/components/QuestionBlock";
import { QuizQuestion } from "@/types";
import Footer from "@/components/Footer";
import Confetti from "@/components/Confetti";

function QuizContent() {
  const searchParams = useSearchParams();
  const quizId = searchParams.get("quizId") || "general_quiz";
  const nextLesson = searchParams.get("nextLesson");
  const chapterId = searchParams.get("chapterId");

  const [userResponses, setUserResponses] = useState<{ type: string; isCorrect: boolean; chosenIndex?: number }[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes
  const totalTime = 5 * 60;
  const [loading, setLoading] = useState(true);
  const quizTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/quiz?quizId=${quizId}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      });
  }, [quizId]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleFinish = useCallback(() => {
    setFinished(true);
    
    const correctAnswersCount = userResponses.filter(r => r.isCorrect).length;
    const isPerfect = correctAnswersCount === questions.length && questions.length > 0;
    
    // Improved Points System
    // Base points: 10 per correct answer
    // Speed bonus: up to 50 points based on time left
    // Perfect bonus: 50 points
    const timeBonus = Math.round((timeLeft / totalTime) * 50);
    const finalScore = score + (isPerfect ? 50 : 0) + (correctAnswersCount > 0 ? timeBonus : 0);

    // Save score to database
    fetch("/api/save-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId: quizId,
        score: finalScore,
        totalQuestions: questions.length
      }),
    }).catch(err => console.error("Failed to save score:", err));
  }, [score, questions.length, quizId, userResponses, timeLeft, totalTime]);

  useEffect(() => {
    if (loading || finished) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, finished, handleFinish]);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
    const isCorrect = index === questions[currentIdx].correctIndex;
    if (isCorrect) {
      setScore((s) => s + 10); 
    }
    setUserResponses(prev => [...prev, { type: questions[currentIdx].type || "general", isCorrect, chosenIndex: index }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      handleFinish();
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedIndex(null);
      setShowFeedback(false);
      // Smooth scroll to top of question on mobile
      quizTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-5xl text-slate-300 animate-pulse">
            quiz
          </span>
          <p className="font-body-lg text-on-surface-variant">Loading questions...</p>
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
          <h2 className="font-display-md text-2xl font-bold text-slate-900">No Questions Found</h2>
          <p className="font-body-md text-slate-500">
            There are currently no questions available for this specific quiz section. Please try another one.
          </p>
          <Link 
            href="/lessons" 
            className="inline-flex px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all active:scale-95 mt-4"
          >
            Back to Curriculum
          </Link>
        </div>
      </div>
    );
  }

  if (finished) {
    const correctAnswersCount = userResponses.filter(r => r.isCorrect).length;
    const isPerfect = correctAnswersCount === questions.length;
    const timeBonus = Math.round((timeLeft / totalTime) * 50);
    const finalScore = score + (isPerfect ? 50 : 0) + (correctAnswersCount > 0 ? timeBonus : 0);
    const pct = Math.round((correctAnswersCount / questions.length) * 100);
    const isPassing = pct >= 70;

    // Performance Analysis
    const theoryQuestions = userResponses.filter(r => r.type === "theoretical");
    const appliedQuestions = userResponses.filter(r => r.type === "applied");

    const theoryScore = theoryQuestions.length > 0 
      ? Math.round((theoryQuestions.filter(r => r.isCorrect).length / theoryQuestions.length) * 100) 
      : null;
    const appliedScore = appliedQuestions.length > 0 
      ? Math.round((appliedQuestions.filter(r => r.isCorrect).length / appliedQuestions.length) * 100) 
      : null;

    return (
      <>
        {pct === 100 && <Confetti />}
        <main className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] animate-fade-in-up">
            <div className="text-center mb-10">
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 ${
                  isPassing ? "bg-teal-50 dark:bg-teal-900/20" : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-3xl md:text-4xl filled ${
                    isPassing ? "text-teal-500" : "text-error"
                  }`}
                >
                  {isPassing ? "emoji_events" : "sentiment_dissatisfied"}
                </span>
              </div>
              <h2 className="font-display-md text-3xl md:text-5xl mb-4 text-slate-900 dark:text-white">
                {isPassing ? "Well Done!" : "Keep Practicing"}
              </h2>
              <div className="flex flex-col items-center gap-2 mb-4">
                <p className="font-body-lg text-slate-600 dark:text-slate-400">
                  Total Score: <span className="font-bold text-primary text-3xl">{finalScore}</span>
                </p>
                <div className="flex gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <span>Accuracy: {pct}%</span>
                  <span>Time Bonus: +{timeBonus}</span>
                </div>
              </div>
              {isPerfect && (
                <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-4 py-2 rounded-full font-bold text-xs mb-4 animate-bounce">
                  <span className="material-symbols-outlined text-sm">stars</span>
                  Perfect Score Bonus +50!
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke={isPassing ? "#14b8a6" : "#ba1a1a"}
                    strokeWidth="2.5"
                    strokeDasharray={`${pct} ${100 - pct}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display-md text-3xl font-bold text-slate-800 dark:text-white">{pct}%</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</span>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-left">
                <h3 className="font-headline-sm text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Performance
                </h3>
                
                {theoryScore !== null && (
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Theory</span>
                      <span className={`text-xs font-bold ${theoryScore >= 70 ? 'text-teal-600' : 'text-orange-500'}`}>{theoryScore}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${theoryScore >= 70 ? 'bg-teal-500' : 'bg-orange-500'}`} style={{ width: `${theoryScore}%` }} />
                    </div>
                  </div>
                )}

                {appliedScore !== null && (
                  <div className="p-3 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Applied</span>
                      <span className={`text-xs font-bold ${appliedScore >= 70 ? 'text-teal-600' : 'text-orange-500'}`}>{appliedScore}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden">
                      <div className={`h-full ${appliedScore >= 70 ? 'bg-teal-500' : 'bg-orange-500'}`} style={{ width: `${appliedScore}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-12 border-t border-slate-100 dark:border-slate-800 pt-10">
              <h3 className="font-headline-md text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">fact_check</span> Report
              </h3>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const response = userResponses[idx];
                  const isCorrect = response?.isCorrect;
                  return (
                    <div key={q.id} className={`p-4 rounded-2xl border ${isCorrect ? "border-teal-100 bg-teal-50/20" : "border-red-100 bg-red-50/20"}`}>
                      <p className="font-bold text-sm text-slate-900 dark:text-slate-200 mb-2">{idx + 1}. {q.question}</p>
                      <p className="text-xs text-slate-500 italic">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setCurrentIdx(0);
                  setScore(0);
                  setSelectedIndex(null);
                  setShowFeedback(false);
                  setFinished(false);
                  setTimeLeft(5 * 60);
                  setUserResponses([]);
                }}
                className="flex-1 px-8 py-4 border border-slate-200 dark:border-slate-700 text-primary dark:text-teal-400 rounded-xl font-bold uppercase tracking-widest text-xs"
              >
                Retry
              </button>
              <Link
                href={nextLesson && chapterId ? `/lessons/${chapterId}/${nextLesson}` : "/lessons"}
                className="flex-1 px-8 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs text-center flex items-center justify-center gap-2"
              >
                Continue
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + (showFeedback ? 1 : 0)) / questions.length) * 100;

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div ref={quizTopRef} className="absolute top-0 left-0" />
        
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md -mx-4 px-4 py-3 border-b border-slate-100 dark:border-slate-800 md:relative md:bg-transparent md:border-none md:p-0 md:mb-10 flex flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-14 md:h-14 relative">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke={timeLeft < 60 ? "#ba1a1a" : "#14b8a6"}
                  strokeWidth="4"
                  strokeDasharray={`${(timeLeft / totalTime) * 100} 100`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-[8px] md:text-[10px] text-slate-500">
                {formatTime(timeLeft)}
              </div>
            </div>
            <div className="hidden sm:block">
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Time</p>
              <p className={`text-sm md:text-lg font-bold ${timeLeft < 60 ? "text-error" : "text-primary"}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-[150px] md:max-w-md">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
              <span className="text-[10px] md:text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
          
          <div className="text-right">
             <span className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-widest block">Points</span>
             <span className="text-sm md:text-lg font-bold text-primary">{score}</span>
          </div>
        </div>

        <div key={currentIdx} className="mt-6 md:mt-0 animate-fade-in-up">
          <QuestionBlock
            question={currentQuestion}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            showFeedback={showFeedback}
            questionNumber={currentIdx + 1}
            totalQuestions={questions.length}
          />
        </div>

        {showFeedback && (
          <div className="mt-8 flex justify-center md:justify-end animate-fade-in-up">
            <button
              onClick={handleNext}
              className="w-full sm:w-auto bg-primary hover:bg-slate-800 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95"
            >
              <span className="font-label-sm text-xs md:text-sm uppercase tracking-widest">
                {currentIdx + 1 >= questions.length ? "Finish Quiz" : "Next Question"}
              </span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin text-primary">
          <span className="material-symbols-outlined text-4xl">autorenew</span>
        </div>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
