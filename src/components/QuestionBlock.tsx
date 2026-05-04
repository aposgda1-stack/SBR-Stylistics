"use client";

import { QuizQuestion } from "@/types";
import { sounds } from "@/lib/sounds";

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
        return "border-2 border-primary dark:border-teal-500 bg-primary/5 dark:bg-teal-500/10 shadow-lg";
      }
      return "border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary dark:hover:border-teal-500 hover:shadow-md";
    }
    // After answering
    if (index === question.correctIndex) {
      return "border-2 border-teal-500 bg-teal-50 dark:bg-teal-900/30";
    }
    if (selectedIndex === index && index !== question.correctIndex) {
      return "border-2 border-red-500 bg-red-50 dark:bg-red-900/30";
    }
    return "border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-40";
  };

  const getLetterStyle = (index: number) => {
    if (!showFeedback) {
      if (selectedIndex === index) {
        return "bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900";
      }
      return "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700";
    }
    if (index === question.correctIndex) return "bg-teal-500 text-white";
    if (selectedIndex === index && index !== question.correctIndex)
      return "bg-red-500 text-white";
    return "bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-50";
  };

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;
    sounds.playClick();
    onSelect(index);
    if (index === question.correctIndex) {
      sounds.playSuccess();
    } else {
      sounds.playError();
    }
  };

  return (
    <div>
      {/* Question Header */}
      <div className="mb-4 md:mb-6 flex justify-between items-end px-1">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-[10px] md:text-xs font-bold text-on-secondary-container bg-secondary-container px-3 py-1 rounded-full uppercase tracking-wider">
              Question {questionNumber}
            </span>
            {question.type === "theoretical" && (
              <span className="text-[10px] md:text-xs font-bold text-on-tertiary-container bg-tertiary-container px-3 py-1 rounded-full uppercase flex items-center gap-1 tracking-wider">
                <span className="material-symbols-outlined text-xs">book</span>
                Theoretical
              </span>
            )}
            {question.type === "applied" && (
              <span className="text-[10px] md:text-xs font-bold text-on-primary-container bg-primary-container px-3 py-1 rounded-full uppercase flex items-center gap-1 tracking-wider">
                <span className="material-symbols-outlined text-xs">edit_note</span>
                Applied
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* MCQ Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={showFeedback}
            className={`quiz-option group flex items-center text-left p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${getOptionStyle(index)} ${showFeedback ? "cursor-default" : "hover:scale-[1.01] hover:-translate-y-1 active:scale-[0.98] animate-fade-in-up"}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span
              className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-base md:text-lg mr-4 md:mr-6 transition-all duration-300 ${getLetterStyle(index)} shadow-sm`}
            >
              {optionLetters[index]}
            </span>
            <span className={`text-sm md:text-lg flex-1 ${showFeedback && index === question.correctIndex ? "text-teal-900 dark:text-teal-400 font-bold" : showFeedback && selectedIndex === index ? "text-red-900 dark:text-red-400" : "text-slate-600 dark:text-slate-400 group-hover:text-primary"}`}>
              {option}
            </span>
            {showFeedback && index === question.correctIndex && (
              <span className="material-symbols-outlined ml-2 text-teal-500 filled text-2xl md:text-3xl animate-scale-in">
                check_circle
              </span>
            )}
            {showFeedback && selectedIndex === index && index !== question.correctIndex && (
              <span className="material-symbols-outlined ml-2 text-error filled text-2xl md:text-3xl animate-scale-in">
                cancel
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mt-8 animate-fade-in-up">
          <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden border border-white/5">
             <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
             <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 relative z-10">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-xl md:text-4xl text-primary">lightbulb</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-2xl mb-2 text-white font-bold leading-tight">
                  {selectedIndex === question.correctIndex ? "Spot on Analysis! 🎯" : "Wait, let's analyze this... 🧐"}
                </h3>
                <div className="space-y-4">
                  <p className="text-sm md:text-xl text-slate-300 leading-relaxed font-serif italic">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
