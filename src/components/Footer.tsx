"use client";

export default function Footer() {
  return (
    <footer className="mt-8 pb-10 px-6">
      <div className="p-6 bg-[var(--surface-variant)]/30 rounded-3xl border border-[var(--outline-variant)]">
         <p className="text-[10px] text-[var(--on-surface-variant)] leading-loose text-center" dir="rtl">
            <strong className="text-[var(--on-surface)] block mb-1">تنويه هام:</strong> 
            هذه المنصة تطوعية بالكامل وغير ربحية. تم تصميمها بجهد شخصي لمساعدة زملائي الطلاب. لا تتبع المنصة أي جهة رسمية.
         </p>
      </div>

      <div className="text-center mt-6 space-y-1">
         <p className="text-[9px] font-black text-[var(--on-surface-variant)] uppercase tracking-[0.2em] opacity-40">Summarized by Ruby ❤️</p>
         <p className="text-[8px] text-[var(--on-surface-variant)] uppercase tracking-widest opacity-30">© 2026 The Final Chapter</p>
      </div>
    </footer>
  );
}
