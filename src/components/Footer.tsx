import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 py-24 border-t border-slate-100 dark:border-slate-800 mb-16 md:mb-0 transition-colors">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Left Side: Brand & Message */}
        <div className="flex flex-col items-center md:items-start gap-6">
          <Link href="/" className="font-sans text-3xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-3">
            SBR STYLISTICS
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500">
             Senior Class of 2026 🎓
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium italic max-w-md text-center md:text-left">
            "To the incredible Seniors of 2026: You survived the un-survivable. Now go crush that final exam! This platform was built for you." <br />
            <span className="text-teal-500 not-italic font-black mt-2 block">— Ruby ❤️</span>
          </p>
        </div>
        
        {/* Right Side: Links & Disclaimer */}
        <div className="flex flex-col items-center md:items-end gap-10">
          <nav className="flex flex-wrap justify-center md:justify-end gap-8">
            <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-black uppercase tracking-widest">Home</Link>
            <Link href="/chapters" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-black uppercase tracking-widest">Journey</Link>
            <Link href="/material" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-black uppercase tracking-widest">Guide</Link>
            <Link href="/word-box" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-xs font-black uppercase tracking-widest">Glossary</Link>
          </nav>
          
          <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 max-w-xl">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-[2] text-center md:text-right font-bold" dir="rtl">
              <strong className="text-slate-900 dark:text-white font-black block mb-2 text-xs">تنويه هام:</strong> 
              هذه المنصة غير ربحية تماماً، وتطوعية بالكامل. تم تصميمها بجهد شخصي بهدف مساعدة الطلاب في المذاكرة وتشجيعهم على التفوق. لا تتبع المنصة أي جهة رسمية أو أكاديمية.
            </p>
          </div>
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center md:text-right">
             © 2026 Stylistics Platform. Summarized by Ruby. <br />
             Academic Excellence for the Greatest Batch.
          </div>
        </div>
      </div>
    </footer>
  );
}
