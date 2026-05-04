"use client";

import { useState, useEffect } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function WelcomeModal() {
  const { isSignedIn, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    // Only show modal to guests who haven't seen it
    const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeenModal && !isSignedIn) {
      // Small delay so the page renders first
      const t = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, [isLoaded, isSignedIn]);

  const closeAsGuest = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcomeModal", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-8 duration-500">
        
        {/* Header */}
        <div className="relative bg-slate-900 p-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(20,184,166,0.15),transparent_70%)]" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
              </span>
              Final Semester 2026
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter leading-tight">
              Hey my friend,<br/>
              <span className="text-teal-400">welcome to your platform.</span>
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <p className="text-slate-600 dark:text-slate-400 font-bold leading-relaxed mb-8">
            Sign in to save your progress, earn points, and appear on the leaderboard. 
            Your journey deserves to be remembered.
          </p>

          {/* Primary: Sign In */}
          <SignInButton mode="modal">
            <button className="w-full py-5 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl mb-4">
              Sign In / Create Account
            </button>
          </SignInButton>

          {/* Secondary: Guest */}
          <button
            onClick={closeAsGuest}
            className="w-full py-4 text-slate-400 font-bold text-sm hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            Continue as guest (progress won't be saved)
          </button>
        </div>
      </div>
    </div>
  );
}
