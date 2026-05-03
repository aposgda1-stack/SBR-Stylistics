"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ExamQuestion } from "@/types";
import Footer from "@/components/Footer";

const TOTAL_TIME = 60 * 60; // 60 minutes
const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function ExamPage() {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [loading, setLoading] = useState(true);

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
    // Score calculation happens inside this function in the render logic below, 
    // but we need the value here to save. 
    // Since state hasn't updated yet, we calculate locally.
  }, []);

  // Use an effect to save score once submitted is true
  useEffect(() => {
    if (submitted && questions.length > 0) {
      const correct = questions.filter(
        (q) => answers[q.id] === q.correctIndex
      ).length;

      fetch("/api/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: "final_exam",
          score: correct,
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
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
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
          <h2 className="font-display-md text-2xl font-bold text-slate-900">No Exam Questions Found</h2>
          <p className="font-body-md text-slate-500">
            The exam content is currently unavailable. Please check back later.
          </p>
          <Link 
            href="/progress" 
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
        <main className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                isPassing ? "bg-teal-50" : "bg-red-50"
              }`}
            >
              <span
                className={`material-symbols-outlined text-5xl filled ${
                  isPassing ? "text-teal-500" : "text-error"
                }`}
              >
                {isPassing ? "workspace_premium" : "sentiment_dissatisfied"}
              </span>
            </div>
            <h1 className="font-display-lg text-display-lg mb-4">
              {isPassing ? "Exam Passed!" : "Exam Complete"}
            </h1>
            <p className="font-body-lg text-on-surface-variant">
              You answered <span className="font-bold text-primary">{correct}</span> of{" "}
              <span className="font-bold">{questions.length}</span> questions correctly.
            </p>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-4 gap-4 mb-12">
            <div className="col-span-4 md:col-span-1 p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <span className="block font-label-sm text-slate-400 mb-2">Score</span>
              <span className={`text-4xl font-serif font-bold ${isPassing ? "text-teal-600" : "text-error"}`}>
                {pct}%
              </span>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <span className="block font-label-sm text-slate-400 mb-2">Correct</span>
              <span className="text-3xl font-serif font-bold text-teal-600">{correct}</span>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <span className="block font-label-sm text-slate-400 mb-2">Wrong</span>
              <span className="text-3xl font-serif font-bold text-error">
                {questions.length - correct - (questions.length - Object.keys(answers).length)}
              </span>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
              <span className="block font-label-sm text-slate-400 mb-2">Skipped</span>
              <span className="text-3xl font-serif font-bold text-slate-400">
                {questions.length - Object.keys(answers).length}
              </span>
            </div>
          </div>

          {/* Review */}
          <div className="space-y-4 mb-12">
            <h3 className="font-headline-md text-headline-md">Answer Review</h3>
            {questions.map((q, idx) => {
              const chosen = answers[q.id];
              const isCorrect = chosen === q.correctIndex;
              const skipped = chosen === undefined;
              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border ${
                    skipped
                      ? "border-slate-200 bg-white"
                      : isCorrect
                      ? "border-teal-200 bg-teal-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        skipped
                          ? "bg-slate-200 text-slate-500"
                          : isCorrect
                          ? "bg-teal-500 text-white"
                          : "bg-error text-white"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-body-md font-semibold text-on-surface mb-1 line-clamp-2">
                        {q.question}
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        {skipped ? (
                          "Skipped"
                        ) : isCorrect ? (
                          <span className="text-teal-700">
                            ✓ {q.options[chosen]}
                          </span>
                        ) : (
                          <>
                            <span className="text-red-700 line-through mr-2">
                              {q.options[chosen]}
                            </span>
                            <span className="text-teal-700">
                              → {q.options[q.correctIndex]}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 px-8 py-4 border border-slate-200 text-primary rounded-xl font-label-sm font-bold tracking-wider uppercase hover:bg-slate-50 transition-all text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/quiz"
              className="flex-1 px-8 py-4 bg-primary text-on-primary rounded-xl font-label-sm font-bold tracking-wider uppercase hover:opacity-90 transition-all text-center"
            >
              Practice More
            </Link>
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
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Exam Header */}
        <div className="mb-12 border-l-4 border-primary pl-6">
          <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block tracking-widest uppercase">
            Academic Assessment
          </span>
          <h1 className="font-display-lg text-display-lg text-on-surface">
            Comprehensive Stylistics Exam
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Question */}
          <div className="lg:col-span-8 space-y-8">
            {/* Question Card */}
            <div className="bg-surface-container-lowest border border-outline-variant p-8 md:p-12 rounded-xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between mb-8">
                <span className="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container px-3 py-1 rounded-full">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <div className="flex gap-2">
                  <button
                    className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors"
                    title="Flag question"
                  >
                    flag
                  </button>
                  <button
                    className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors"
                    title="Bookmark"
                  >
                    bookmark
                  </button>
                </div>
              </div>

              <h2 className="font-headline-lg text-headline-lg mb-10 text-on-surface leading-tight">
                {currentQuestion.question}
              </h2>

              {currentQuestion.passage && (
                <div className="p-6 bg-surface-container-low border-l-2 border-primary-container rounded-r-lg mb-10 italic text-body-lg font-body-lg text-on-primary-container">
                  {currentQuestion.passage}
                </div>
              )}

              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = answers[currentQuestion.id] === idx;
                  return (
                    <label
                      key={idx}
                      className={`flex items-center p-5 border rounded-lg cursor-pointer transition-all group ${
                        isSelected
                          ? "border-primary-container bg-primary-fixed/30"
                          : "border-outline-variant bg-white hover:border-primary-container"
                      }`}
                    >
                      <input
                        type="radio"
                        name="exam_option"
                        className="w-5 h-5 text-primary-container focus:ring-primary-container border-outline-variant"
                        checked={isSelected}
                        onChange={() => handleAnswer(currentQuestion.id, idx)}
                      />
                      <span
                        className={`ml-4 font-body-md text-body-md ${
                          isSelected
                            ? "text-on-primary-fixed font-semibold"
                            : "text-on-surface group-hover:text-primary-container"
                        }`}
                      >
                        <span className="font-bold mr-2">{OPTION_LETTERS[idx]}.</span>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center py-4">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="px-8 py-4 border border-outline-variant rounded-lg font-label-sm text-label-sm text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_left</span>
                Previous Question
              </button>
              <button
                onClick={() =>
                  setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))
                }
                disabled={currentIdx === questions.length - 1}
                className="px-10 py-4 bg-primary text-on-primary rounded-lg font-label-sm text-label-sm tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next Question
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Right Column: Status & Navigator */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Status Panel */}
            <div className="bg-surface-container-highest p-8 rounded-xl space-y-8">
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant block mb-4 tracking-widest uppercase">
                  Remaining Time
                </span>
                <div
                  className={`flex items-center gap-4 ${
                    timeLeft < 300 ? "text-error" : "text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-4xl">timer</span>
                  <span className="text-4xl font-serif font-semibold tracking-tighter">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="w-full bg-outline-variant h-1 rounded-full mt-6 overflow-hidden">
                  <div
                    className={`h-full transition-all ${timeLeft < 300 ? "bg-error" : "bg-primary"}`}
                    style={{ width: `${timePct}%` }}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant">
                <span className="font-label-sm text-label-sm text-on-surface-variant block mb-4 tracking-widest uppercase">
                  Completion Status
                </span>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-3xl font-serif font-semibold">
                    {answeredCount}/{questions.length}
                  </span>
                  <span className="font-body-md text-on-surface-variant">
                    {completionPct}% Complete
                  </span>
                </div>
                <div className="w-full bg-outline-variant h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2E7D32] h-full transition-all"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Navigator */}
            <div className="bg-white border border-outline-variant p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08)]">
              <span className="font-label-sm text-label-sm text-on-surface-variant block mb-6 tracking-widest uppercase">
                Question Navigator
              </span>
              <div className="grid grid-cols-5 gap-3">
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-bold cursor-pointer transition-all hover:scale-105 ${
                        isCurrent
                          ? "border-2 border-primary bg-primary-fixed/50 text-primary ring-2 ring-primary ring-offset-2"
                          : isAnswered
                          ? "border border-primary-container bg-primary-container text-on-primary"
                          : "border border-outline-variant bg-surface text-on-surface-variant hover:border-primary"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-primary-container" />
                  <span className="text-xs text-on-surface-variant font-label-sm uppercase">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm border border-outline-variant bg-surface" />
                  <span className="text-xs text-on-surface-variant font-label-sm uppercase">Unanswered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm border-2 border-primary bg-primary-fixed/50" />
                  <span className="text-xs text-on-surface-variant font-label-sm uppercase">Current</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full py-6 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm tracking-[0.2em] uppercase font-bold rounded-xl shadow-lg hover:brightness-95 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              Submit Exam
              <span className="material-symbols-outlined">send</span>
            </button>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
