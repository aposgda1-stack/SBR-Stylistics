"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/types";
import QuestionBlock from "@/components/QuestionBlock";
import Footer from "@/components/Footer";

export default function MockExamPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  // Initialize Exam
  const startExam = useCallback(async () => {
    try {
      const res = await fetch("/api/quiz?count=50");
      const data = await res.json();
      setQuestions(data);
      setAnswers(new Array(data.length).fill(null));
      setExamStarted(true);
    } catch (error) {
      console.error("Failed to start exam:", error);
    }
  }, []);

  // Timer Logic
  useEffect(() => {
    if (examStarted && !examFinished && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !examFinished) {
      finishExam();
    }
  }, [examStarted, examFinished, timeLeft]);

  const handleSelect = (index: number) => {
    if (examFinished) return;
    const newAnswers = [...answers];
    newAnswers[currentIdx] = index;
    setAnswers(newAnswers);
  };

  const finishExam = async () => {
    setExamFinished(true);
    // Calculate Score
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correctCount++;
    });
    const finalScore = correctCount * (100 / questions.length);

    // Save to Database
    try {
      await fetch("/api/save-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: "mock-final-exam",
          score: finalScore,
          totalQuestions: questions.length
        }),
      });
    } catch (error) {
      console.error("Failed to save exam score:", error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-slate-900 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <span className="material-symbols-outlined text-[300px]">timer</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter relative z-10">Mock Final Exam</h1>
          <p className="text-xl text-slate-400 mb-12 font-bold italic relative z-10">
            "50 Questions. 60 Minutes. One Goal: Excellence."
          </p>
          <div className="space-y-6 mb-12 text-left bg-white/5 p-8 rounded-3xl border border-white/10 relative z-10">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-teal-500">check_circle</span>
              <p className="text-slate-300 font-bold">Covers all curriculum chapters.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-teal-500">history</span>
              <p className="text-slate-300 font-bold">Timed for 60 minutes.</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-teal-500">analytics</span>
              <p className="text-slate-300 font-bold">Instant grading and feedback.</p>
            </div>
          </div>
          <button 
            onClick={startExam}
            className="w-full py-6 bg-teal-500 text-slate-900 rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-teal-500/20"
          >
            Start Final Battle
          </button>
        </div>
      </div>
    );
  }

  if (examFinished) {
    let correctCount = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correctCount++;
    });
    const pct = Math.round((correctCount / questions.length) * 100);
    const getGrade = (p: number) => {
      if (p >= 85) return { label: "Excellent (امتياز)", color: "text-teal-500" };
      if (p >= 75) return { label: "Very Good (جيد جداً)", color: "text-blue-500" };
      if (p >= 65) return { label: "Good (جيد)", color: "text-yellow-500" };
      if (p >= 50) return { label: "Pass (مقبول)", color: "text-orange-500" };
      return { label: "Fail (راسب)", color: "text-red-500" };
    };
    const grade = getGrade(pct);

    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 p-6 md:p-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 rounded-[3rem] p-12 text-center text-white shadow-2xl mb-12">
            <h2 className="text-2xl font-black uppercase tracking-widest text-teal-400 mb-4">Exam Result</h2>
            <div className="text-8xl md:text-[12rem] font-black tracking-tighter mb-4">{pct}%</div>
            <p className={`text-3xl md:text-5xl font-black mb-8 ${grade.color}`}>{grade.label}</p>
            <p className="text-slate-400 font-bold italic mb-12">
              "You answered {correctCount} out of {questions.length} correctly."
            </p>
            <button 
              onClick={() => router.push("/chapters")}
              className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all"
            >
              Back to Curriculum
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      {/* Exam Header */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">Mock Final Exam</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className={`px-6 py-2 rounded-full font-black text-xl flex items-center gap-2 ${timeLeft < 300 ? "bg-red-50 text-red-600 animate-pulse" : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"}`}>
          <span className="material-symbols-outlined text-xl">timer</span>
          {formatTime(timeLeft)}
        </div>
        <button 
          onClick={finishExam}
          className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl"
        >
          Submit Exam
        </button>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 md:py-24">
        <QuestionBlock 
          question={questions[currentIdx]}
          selectedIndex={answers[currentIdx]}
          onSelect={handleSelect}
          showFeedback={false} // No instant feedback in exam mode
          questionNumber={currentIdx + 1}
          totalQuestions={questions.length}
        />

        {/* Navigation */}
        <div className="mt-12 flex justify-between gap-4">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(prev => prev - 1)}
            className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30"
          >
            Previous
          </button>
          <button 
            disabled={currentIdx === questions.length - 1}
            onClick={() => setCurrentIdx(prev => prev + 1)}
            className="flex-1 py-5 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs disabled:opacity-30"
          >
            Next
          </button>
        </div>

        {/* Question Grid (Quick Nav) */}
        <div className="mt-20">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Jump to Question</h3>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                className={`w-full aspect-square rounded-lg flex items-center justify-center font-black text-[10px] transition-all ${
                  currentIdx === i 
                    ? "bg-primary text-white scale-110" 
                    : answers[i] !== null 
                      ? "bg-teal-100 dark:bg-teal-900/30 text-teal-600" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
