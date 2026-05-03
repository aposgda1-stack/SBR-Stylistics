"use client";

import { useState, useEffect } from "react";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcomeModal", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform animate-in zoom-in-95 duration-300 border border-slate-100">
        <div className="relative h-40 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="absolute top-4 right-4">
            <button 
              onClick={closeModal}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div className="flex flex-col items-center text-white">
            <span className="material-symbols-outlined text-5xl mb-2">school</span>
            <h2 className="text-2xl font-serif font-bold tracking-tight text-center">Final Chapter</h2>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Welcome Seniors! 🎓</h3>
          <h4 className="text-lg font-bold text-primary mb-4">مرحباً بكم يا سينيورز</h4>
          
          <p className="text-slate-600 leading-relaxed mb-6 font-serif">
            هذا هو الترم الأخير في مسيرتنا التعليمية، وفخورون جداً بوصولكم لهذه المرحلة النهائية. دعونا نختم الرحلة بكل تميز.
          </p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 relative">
             <span className="material-symbols-outlined absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-primary rounded-full px-2 text-lg">favorite</span>
            <p className="text-sm text-slate-700 italic font-medium leading-relaxed">
              "مصنوع بكل الحب بواسطة زميلكم الذي يتمنى لكم كل التوفيق في نهاية هذه الرحلة." ❤️
            </p>
          </div>

          <SignedOut>
            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-900">
                سجل دخولك الآن لحفظ تقدمك ودرجاتك في الاختبارات
              </p>
              <SignInButton mode="modal">
                <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95">
                  تسجيل الدخول / Get Started
                </button>
              </SignInButton>
              <button 
                onClick={closeModal}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                سأقوم بالاستكشاف أولاً
              </button>
            </div>
          </SignedOut>

          <div className="flex justify-center mt-6">
            <button 
              onClick={closeModal}
              className="w-full sm:w-auto text-slate-900 font-bold px-12 py-4 rounded-2xl border-2 border-slate-900 hover:bg-slate-50 transition-all active:scale-95"
            >
              دخول المنصة / Enter Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
