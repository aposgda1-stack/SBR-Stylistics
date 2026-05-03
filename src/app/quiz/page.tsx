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

  const [userResponses, setUserResponses] = useState<{ type: string; isCorrect: boolean }[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12 * 60); // 12 minutes
  const [loading, setLoading] = useState(true);

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
    // Save score to database
    fetch("/api/save-score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId: quizId,
        score: score,
        totalQuestions: questions.length
      }),
    }).catch(err => console.error("Failed to save score:", err));
  }, [score, questions.length, quizId]);

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
      setScore((s) => s + 1);
    }
    setUserResponses(prev => [...prev, { type: questions[currentIdx].type || "general", isCorrect }]);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      handleFinish();
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedIndex(null);
      setShowFeedback(false);
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
    const pct = Math.round((score / questions.length) * 100);
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
        <main className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-center animate-fade-in-up">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 ${
                isPassing ? "bg-teal-50" : "bg-red-50"
              }`}
            >
              <span
                className={`material-symbols-outlined text-4xl filled ${
                  isPassing ? "text-teal-500" : "text-error"
                }`}
              >
                {isPassing ? "emoji_events" : "sentiment_dissatisfied"}
              </span>
            </div>
            <h2 className="font-display-lg text-display-lg mb-4">
              {isPassing ? "Well Done!" : "Keep Practicing"}
            </h2>
            <p className="font-body-lg text-on-surface-variant mb-10">
              You scored <span className="font-bold text-primary">{score}</span> out of{" "}
              <span className="font-bold">{questions.length}</span> questions correctly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Score ring */}
              <div className="relative w-40 h-40 mx-auto">
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
                  <span className="font-display-lg text-4xl font-bold">{pct}%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Score</span>
                </div>
              </div>

              {/* Performance Analysis Cards */}
              <div className="flex flex-col gap-4 text-left">
                <h3 className="font-headline-sm text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  Performance Analysis
                </h3>
                
                {theoryScore !== null && (
                  <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-label-sm text-slate-500 uppercase tracking-wider">Theoretical Mastery</span>
                      <span className={`font-bold ${theoryScore >= 70 ? 'text-teal-600' : 'text-orange-500'}`}>{theoryScore}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${theoryScore >= 70 ? 'bg-teal-500' : 'bg-orange-500'}`} 
                        style={{ width: `${theoryScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {theoryScore >= 80 ? "Excellent understanding of core definitions." : "You should review the word boxes for theoretical concepts."}
                    </p>
                  </div>
                )}

                {appliedScore !== null && (
                  <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-label-sm text-slate-500 uppercase tracking-wider">Analytical Application</span>
                      <span className={`font-bold ${appliedScore >= 70 ? 'text-teal-600' : 'text-orange-500'}`}>{appliedScore}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${appliedScore >= 70 ? 'bg-teal-500' : 'bg-orange-500'}`} 
                        style={{ width: `${appliedScore}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      {appliedScore >= 80 ? "Brilliant job applying concepts to literary passages!" : "Try to focus on the 'Applied' analysis steps in each lesson."}
                    </p>
                  </div>
                )}
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
                  setTimeLeft(12 * 60);
                  setUserResponses([]);
                }}
                className="flex-1 px-8 py-4 border border-slate-200 text-primary rounded-xl font-label-sm font-bold tracking-wider uppercase hover:bg-slate-50 transition-all"
              >
                Retry Section
              </button>
              {nextLesson && chapterId ? (
                <Link
                  href={`/lessons/${chapterId}/${nextLesson}`}
                  className="flex-1 px-8 py-4 bg-primary text-white rounded-xl font-label-sm font-bold tracking-wider uppercase hover:opacity-90 transition-all text-center flex items-center justify-center gap-2"
                >
                  Proceed to Next
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              ) : (
                <Link
                  href="/lessons"
                  className="flex-1 px-8 py-4 bg-primary text-white rounded-xl font-label-sm font-bold tracking-wider uppercase hover:opacity-90 transition-all text-center"
                >
                  Back to Curriculum
                </Link>
              )}
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
      <main className="max-w-4xl mx-auto px-4 md:px-margin-desktop py-12">
        {/* Timer & Progress */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke={timeLeft < 60 ? "#ba1a1a" : "#14b8a6"}
                  strokeWidth="3"
                  strokeDasharray={`${(timeLeft / (12 * 60)) * 100} 100`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px] text-slate-500">
                {formatTime(timeLeft)}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Time Remaining</p>
              <p className={`text-xl font-display-md font-bold ${timeLeft < 60 ? "text-error" : "text-primary"}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-md w-full">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</span>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div key={currentIdx} className="animate-fade-in-up">
          <QuestionBlock
            question={currentQuestion}
            selectedIndex={selectedIndex}
            onSelect={handleSelect}
            showFeedback={showFeedback}
            questionNumber={currentIdx + 1}
            totalQuestions={questions.length}
          />
        </div>

        {/* Proceed Button */}
        {showFeedback && (
          <div className="mt-10 flex justify-end animate-fade-in-up">
            <button
              onClick={handleNext}
              className="bg-primary hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg active:scale-95"
            >
              <span className="font-label-sm text-label-sm uppercase tracking-widest">
                {currentIdx + 1 >= questions.length ? "See Results" : "Proceed to Next"}
              </span>
              <span className="material-symbols-outlined">arrow_forward</span>
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
