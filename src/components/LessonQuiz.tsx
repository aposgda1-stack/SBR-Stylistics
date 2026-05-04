"use client";

import { useState } from "react";
import QuestionBlock from "./QuestionBlock";
import { QuizQuestion } from "@/types";
import Link from "next/link";

interface LessonQuizProps {
  questions: QuizQuestion[];
  chapterId: string;
  nextLesson?: string;
}

export default function LessonQuiz({ questions, chapterId, nextLesson }: LessonQuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [savedTotalScore, setSavedTotalScore] = useState<number | null>(null);

  if (!questions || questions.length === 0) return null;

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
    if (index === questions[currentIdx].correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = async () => {
    if (currentIdx + 1 >= questions.length) {
      setFinished(true);
      // Calculate final score as a percentage
      const finalScore = Math.round((correctCount / questions.length) * 100);
      try {
        const qId = questions[0]?.quizId;
        if (!qId) return;

        const res = await fetch("/api/save-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quizId: qId,
            score: finalScore,
            totalQuestions: questions.length
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setSavedTotalScore(data.totalScore);
        }

        // Dispatch event for real-time UI updates (TopBar + Leaderboard)
        window.dispatchEvent(new Event("progressUpdated"));
      } catch (error) {
        console.error("Failed to save score:", error);
      }
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedIndex(null);
      setShowFeedback(false);
    }
  };

  if (finished) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-center text-white shadow-2xl animate-fade-in-up">
        <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-4xl text-slate-900 font-bold">check</span>
        </div>
        <h2 className="text-4xl font-black mb-2">Section Complete! 🏆</h2>
        <p className="text-7xl font-black text-teal-400 my-6">{pct}%</p>
        <p className="text-slate-400 font-bold text-sm mb-2">
          {correctCount} correct out of {questions.length} questions
        </p>
        {savedTotalScore !== null && (
          <div className="inline-flex items-center gap-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 rounded-full px-6 py-3 mb-8 font-black text-sm">
            <span className="material-symbols-outlined text-lg filled">emoji_events</span>
            Total Points: {savedTotalScore}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button 
            onClick={() => {
              setCurrentIdx(0);
              setSelectedIndex(null);
              setShowFeedback(false);
              setCorrectCount(0);
              setFinished(false);
              setSavedTotalScore(null);
            }}
            className="px-8 py-4 border border-white/20 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
          >
            Retry Quiz
          </button>
          {nextLesson && (
            <Link 
              href={`/chapters/${chapterId}/${nextLesson}`}
              className="px-8 py-4 bg-teal-500 text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all"
            >
              Next Lesson
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="lesson-quiz" className="mt-32 pt-20 border-t border-slate-100 dark:border-slate-800">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">SECTION QUIZ</h2>
          <p className="text-teal-600 font-bold text-sm tracking-widest uppercase mt-1">Test your understanding</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Progress</span>
          <span className="text-2xl font-black text-primary dark:text-teal-500">{currentIdx + 1} / {questions.length}</span>
        </div>
      </div>

      <QuestionBlock
        question={questions[currentIdx]}
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
        showFeedback={showFeedback}
        questionNumber={currentIdx + 1}
        totalQuestions={questions.length}
      />

      {showFeedback && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            className="w-full sm:w-auto bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 px-10 py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl"
          >
            <span className="uppercase tracking-[0.2em] text-xs">
              {currentIdx + 1 >= questions.length ? "Finish Section" : "Next Question"}
            </span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
