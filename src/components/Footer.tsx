import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
            STYLISTICS <span className="text-teal-500">2026</span>
          </Link>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-500">Home</Link>
            <Link href="/chapters" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-500">Journey</Link>
            <Link href="/material" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-500">Guide</Link>
            <Link href="/word-box" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-500">Glossary</Link>
          </nav>
        </div>
        
        <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
           <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-loose text-center" dir="rtl">
              <strong className="text-slate-900 dark:text-white block mb-2">تنويه هام:</strong> 
              هذه المنصة تطوعية بالكامل وغير ربحية. تم تصميمها بجهد شخصي لمساعدة زملائي الطلاب. لا تتبع المنصة أي جهة رسمية.
           </p>
        </div>

        <div className="text-center space-y-2">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Summarized by Ruby ❤️</p>
           <p className="text-[9px] text-slate-300 dark:text-slate-600 uppercase tracking-widest">© 2026 The Final Chapter</p>
        </div>
      </div>
    </footer>
  );
}
