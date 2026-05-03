"use client";

import { useState, useEffect } from "react";

interface LessonToolsProps {
  title: string;
  content: string; // The full text content to read
}

export default function LessonTools({ title, content }: LessonToolsProps) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const msg = new SpeechSynthesisUtterance();
      msg.text = `${title}. ${content}`;
      msg.rate = 0.9;
      msg.onend = () => setIsReading(false);
      setSpeech(msg);
    }
  }, [title, content]);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
    if (!isFocusMode) {
      document.body.classList.add("focus-mode");
    } else {
      document.body.classList.remove("focus-mode");
    }
  };

  const toggleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else if (speech) {
      window.speechSynthesis.speak(speech);
      setIsReading(true);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 md:right-12 z-50 flex flex-col gap-3">
      {/* Read Aloud Button */}
      <button
        onClick={toggleReadAloud}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
          isReading ? "bg-error text-white animate-pulse" : "bg-primary text-white"
        }`}
        title={isReading ? "Stop Reading" : "Read Aloud (Free TTS)"}
      >
        <span className="material-symbols-outlined">
          {isReading ? "stop_circle" : "record_voice_over"}
        </span>
      </button>

      {/* Focus Mode Button */}
      <button
        onClick={toggleFocusMode}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 ${
          isFocusMode ? "bg-teal-500 text-white" : "bg-white dark:bg-slate-800 text-primary dark:text-teal-400 border border-outline-variant"
        }`}
        title={isFocusMode ? "Exit Focus Mode" : "Focus Mode"}
      >
        <span className="material-symbols-outlined">
          {isFocusMode ? "visibility" : "visibility_off"}
        </span>
      </button>
      
      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 text-primary dark:text-teal-400 border border-outline-variant flex items-center justify-center shadow-2xl transition-all active:scale-95"
        title="Scroll to Top"
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </div>
  );
}
