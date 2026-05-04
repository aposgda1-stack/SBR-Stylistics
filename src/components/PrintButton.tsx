"use client";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="print:hidden flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-teal-500 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:-translate-y-1 transition-all"
    >
      <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
      Save as Study Guide
    </button>
  );
}
