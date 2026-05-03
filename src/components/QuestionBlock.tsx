"use client";

import { QuizQuestion } from "@/types";

interface QuestionBlockProps {
  question: QuizQuestion;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  showFeedback: boolean;
  questionNumber: number;
  totalQuestions: number;
}

const optionLetters = ["A", "B", "C", "D"];

export default function QuestionBlock({
  question,
  selectedIndex,
  onSelect,
  showFeedback,
  questionNumber,
  totalQuestions,
}: QuestionBlockProps) {
  const getOptionStyle = (index: number) => {
    if (!showFeedback) {
      if (selectedIndex === index) {
        return "border-2 border-primary bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.1)]";
      }
      return "border border-slate-100 bg-white hover:border-primary hover:shadow-md";
    }
    // After answering
    if (index === question.correctIndex) {
      return "border-2 border-teal-500 bg-teal-50";
    }
    if (selectedIndex === index && index !== question.correctIndex) {
      return "border-2 border-error bg-red-50";
    }
    return "border border-slate-100 bg-white opacity-60";
  };

  const getLetterStyle = (index: number) => {
    if (!showFeedback) {
      if (selectedIndex === index) {
        return "bg-primary text-white";
      }
      return "bg-surface-container-low text-on-surface-variant group-hover:bg-primary-container group-hover:text-on-primary";
    }
    if (index === question.correctIndex) return "bg-teal-500 text-white";
    if (selectedIndex === index && index !== question.correctIndex)
      return "bg-error text-white";
    return "bg-surface-container-low text-on-surface-variant";
  };

  return (
    <div>
      {/* Question Header */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <div className="flex gap-2">
            <span className="font-label-sm text-label-sm text-on-secondary-container bg-secondary-container px-3 py-1 rounded-full uppercase">
              Current Session
            </span>
            {question.type === "theoretical" && (
              <span className="font-label-sm text-label-sm text-on-tertiary-container bg-tertiary-container px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">book</span>
                Word Box (Theoretical)
              </span>
            )}
            {question.type === "applied" && (
              <span className="font-label-sm text-label-sm text-on-primary-container bg-primary-container px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">edit_note</span>
                Applied Analysis
              </span>
            )}
          </div>
          <h1 className="font-headline-lg text-headline-lg mt-2 text-primary">
            Question {questionNumber} of {totalQuestions}
          </h1>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-slate-100 rounded-xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8">
        <h2 className="font-headline-md text-headline-md text-primary leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* MCQ Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && onSelect(index)}
            disabled={showFeedback}
            className={`quiz-option group flex items-center text-left p-6 rounded-[1.5rem] cursor-pointer transition-all duration-300 ${getOptionStyle(index)} ${showFeedback ? "cursor-default" : "hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] animate-fade-in-up"}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span
              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg mr-6 transition-all duration-300 ${getLetterStyle(index)} shadow-sm`}
            >
              {optionLetters[index]}
            </span>
            <span className={`font-body-lg text-lg flex-1 ${showFeedback && index === question.correctIndex ? "text-teal-900 font-bold" : showFeedback && selectedIndex === index ? "text-red-900" : "text-slate-600 group-hover:text-primary"}`}>
              {option}
            </span>
            {showFeedback && index === question.correctIndex && (
              <span className="material-symbols-outlined ml-auto text-teal-500 filled text-3xl animate-scale-in">
                check_circle
              </span>
            )}
            {showFeedback && selectedIndex === index && index !== question.correctIndex && (
              <span className="material-symbols-outlined ml-auto text-error filled text-3xl animate-scale-in">
                cancel
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mt-8 animate-fade-in-up">
          <div className="bg-slate-900 text-white rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden">
             <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
             <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 relative z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-2xl md:text-4xl text-primary">lightbulb</span>
              </div>
              <div>
                <h3 className="font-headline-md text-xl md:text-3xl mb-3 text-white font-bold leading-tight">
                  {selectedIndex === question.correctIndex ? "Spot on Analysis! 🎯" : "Wait, let's analyze this... 🧐"}
                </h3>
                <div className="space-y-4">
                  <p className="font-body-md md:font-body-lg text-lg md:text-xl text-slate-300 leading-relaxed font-serif italic">
                    {question.explanation}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-xs uppercase tracking-widest">
                      Tip
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Review this concept in the Word Box Library for more depth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
