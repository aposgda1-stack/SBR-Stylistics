import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 py-16 border-t border-slate-200 dark:border-slate-800 mb-16 md:mb-0 transition-colors">
      <div className="w-full px-8 flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto gap-12">
        <div className="flex flex-col items-center md:items-start gap-4 flex-1">
          <span className="font-serif text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Stylestics Platform
            <span className="material-symbols-outlined text-primary text-xl">school</span>
          </span>
          <span className="font-sans text-xs text-slate-500 font-bold tracking-widest uppercase bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
            Class of 2026 🎓
          </span>
          <p className="font-body-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-md text-center md:text-left italic mt-2">
            "To the incredible Seniors of 2026: This platform was built with love, stress, and a lot of late nights, just like your studying. I am beyond proud to see you all graduate. You survived the un-survivable. Now go crush that final exam!" — Ruby ❤️
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-6 flex-1 w-full border-t border-slate-200 dark:border-slate-800 md:border-none pt-8 md:pt-0">
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            <Link href="/" className="text-slate-500 hover:text-primary transition-all font-sans text-sm font-bold">Home</Link>
            <Link href="/chapters" className="text-slate-500 hover:text-primary transition-all font-sans text-sm font-bold">Curriculum</Link>
            <Link href="/definitions" className="text-slate-500 hover:text-primary transition-all font-sans text-sm font-bold">Definitions</Link>
            <Link href="/progress" className="text-slate-500 hover:text-primary transition-all font-sans text-sm font-bold">Leaderboard</Link>
          </div>
          <p className="font-sans text-xs text-slate-400 dark:text-slate-500 text-center md:text-right mt-4 leading-relaxed">
            © 2026 Stylestics Platform. Summarized by Ruby.<br /> Dedicated to the greatest graduating batch.
          </p>
          
          <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl max-w-lg ml-auto border border-slate-200 dark:border-slate-700/50">
            <p className="font-sans text-[10px] md:text-xs text-slate-500 dark:text-slate-400 text-center md:text-right leading-relaxed text-balance" dir="rtl">
              <strong className="text-slate-700 dark:text-slate-300">تنويه هام:</strong> هذه المنصة غير ربحية تماماً، وغير مملوكة أو تابعة لأي مؤسسة تعليمية أو جهة رسمية. المنصة لا تخضع لإشراف أي جهة، أو دكتور، أو شخصية أكاديمية. تم تصميمها بجهد شخصي تطوعي بهدف وحيد وهو مساعدة الطلاب في المذاكرة وتشجيعهم على تحصيل العلم.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
