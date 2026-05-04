"use client";

import { useState, useEffect } from "react";
import { SignedOut, SignInButton, useUser } from "@clerk/nextjs";

export default function WelcomeModal() {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
    const savedGuestName = localStorage.getItem("guest_name");
    
    if (!hasSeenModal && !isSignedIn && !savedGuestName) {
      setIsOpen(true);
    }
  }, [isSignedIn]);

  const saveAndClose = () => {
    if (guestName.trim()) {
      localStorage.setItem("guest_name", guestName.trim());
    }
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcomeModal", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden transform animate-in zoom-in-95 duration-500 border border-slate-100 dark:border-slate-800">
        <div className="relative h-48 bg-slate-900 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500 via-transparent to-transparent"></div>
          </div>
          <div className="flex flex-col items-center text-white relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-teal-500 flex items-center justify-center shadow-2xl shadow-teal-500/20 mb-4 animate-bounce-subtle">
               <span className="material-symbols-outlined text-4xl font-black">school</span>
            </div>
            <h2 className="text-3xl font-black tracking-tighter uppercase">Academic Odyssey</h2>
          </div>
        </div>
        
        <div className="p-10 text-center">
          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Welcome, Scholar! 🎓</h3>
          <p className="text-slate-500 dark:text-slate-400 font-bold mb-8">
            Before we begin our final chapter together, how should I address you?
          </p>
          
          <div className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full px-8 py-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl focus:border-teal-500 outline-none transition-all font-black text-lg text-slate-900 dark:text-white text-center"
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-300">person</span>
            </div>

            <button 
              onClick={saveAndClose}
              disabled={!guestName.trim()}
              className="w-full bg-teal-500 text-slate-900 font-black py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-teal-500/20 disabled:opacity-30 disabled:hover:scale-100 uppercase tracking-widest text-sm"
            >
              Start My Journey
            </button>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Or sign in for permanent progress</p>
              <SignInButton mode="modal">
                <button className="text-xs font-black text-primary dark:text-teal-500 uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
                  Sign In / Create Account
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
