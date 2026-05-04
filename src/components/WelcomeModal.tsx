"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function WelcomeModal() {
  const { isSignedIn, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    const hasSeen = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeen && !isSignedIn) {
      const t = setTimeout(() => setIsOpen(true), 700);
      return () => clearTimeout(t);
    }
  }, [isLoaded, isSignedIn]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
      localStorage.setItem("hasSeenWelcomeModal", "true");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-end justify-center bg-slate-950/90 backdrop-blur-lg transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-lg bg-slate-900 rounded-t-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-300 ${closing ? "translate-y-full" : "translate-y-0"}`}
        onClick={e => e.stopPropagation()}
        style={{ animation: closing ? undefined : "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
      >
        {/* Pull handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
        </div>

        {/* Glow background */}
        <div className="relative px-7 pb-2 pt-2">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="relative z-10 flex items-center gap-2 mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse inline-block" />
              Final Semester · 2026
            </div>
          </div>

          {/* Heading */}
          <div className="relative z-10 mb-5">
            <h2 className="text-[1.75rem] font-black text-white tracking-tight leading-tight mb-3">
              يا صديقي.. 👋<br />
              <span className="text-teal-400">نورت المنصة الخاصة بنا.</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              This is our <strong className="text-white">final semester</strong> together. I'm genuinely proud of the journey we've shared. 
              Sign in to keep your progress safe, earn your place on the leaderboard, and let's finish this journey{" "}
              <strong className="text-teal-400">stronger than ever.</strong>
            </p>
          </div>

          {/* Divider */}
          <div className="relative z-10 border-t border-white/5 mb-5" />

          {/* Actions */}
          <div className="relative z-10 space-y-3 pb-8">
            {/* Primary: Sign In */}
            <Link
              href="/sign-in"
              onClick={handleClose}
              className="flex items-center justify-center gap-3 w-full py-4 bg-teal-500 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-teal-400 active:scale-95 transition-all shadow-xl shadow-teal-500/20"
            >
              <span className="material-symbols-outlined text-xl">login</span>
              Sign In / Create Account
            </Link>

            {/* Secondary: Guest */}
            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-2xl border border-white/10 text-slate-400 font-bold text-xs uppercase tracking-widest hover:border-white/20 hover:text-slate-300 active:scale-95 transition-all"
            >
              Continue as guest — progress won't be saved
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
