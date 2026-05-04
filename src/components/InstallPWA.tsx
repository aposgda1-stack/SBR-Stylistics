"use client";

import { useState, useEffect } from "react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Listen for install prompt (Android/Chrome)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowTutorial(true);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      // Fallback for browsers that don't support the prompt or if it hasn't fired yet
      alert("To install: Open browser menu (three dots) and select 'Install' or 'Add to Home screen'");
    }
  };

  if (isInstalled) return null;

  return (
    <>
      <div className="mb-4">
        <button
          onClick={handleInstallClick}
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/20 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined filled">install_mobile</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-black uppercase tracking-tight">Download App</p>
              <p className="text-[10px] font-bold opacity-80">Add to Home Screen for fast access</p>
            </div>
          </div>
          <span className="material-symbols-outlined">download</span>
        </button>
      </div>

      {/* iOS Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[var(--surface)] p-8 rounded-[2.5rem] border border-[var(--outline-variant)] shadow-2xl max-w-xs text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-teal-500/10 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">ios_share</span>
            </div>
            <h3 className="text-xl font-black text-[var(--on-surface)] mb-2">Install on iPhone</h3>
            <p className="text-sm text-[var(--on-surface-variant)] mb-6 leading-relaxed">
              1. Tap the <strong className="text-[var(--on-surface)]">Share</strong> button at the bottom of your browser.<br/>
              2. Scroll down and tap <strong className="text-[var(--on-surface)]">Add to Home Screen</strong>.
            </p>
            <button 
              onClick={() => setShowTutorial(false)}
              className="w-full py-3 bg-[var(--on-surface)] text-[var(--surface)] rounded-xl font-black text-xs uppercase tracking-widest"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
