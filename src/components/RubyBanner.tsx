"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

const rubyMessages = [
  "لو حسست إنك تعبت، متوقفش — وقف، خد نفس، وكمل. أنا واثق فيك.",
  "كل سؤال بتجاوبه صح ده خطوة أكبر مما بتتخيل. فخور بيك جداً.",
  "ربنا كريم وأنت بتذاكر بجد، النتيجة هتبقى تعبر عن جهدك.",
  "اذاكر بفهم مش بحفظ. الأمثلة هي مفتاح المادة دي.",
  "متقارنش نفسك بحد. مسارك ده خاص بيك أنت.",
  "الامتحان قرّب، بس أنت أقرب للنجاح. استمر.",
  "أنا بكتب المادة دي عشان أنت تعدّي. واثق إنك هتعدي.",
  "كل مرة بتراجع فيها، بتتقدم. حتى لو مش حاسس بكده.",
  "الموضوع ده مش صعب زي ما بان. انت فاهم أكتر مما بتحس.",
  "خلص الكويز ده وانت مش هتندم. الإحساس ده بعده تعملهولك باقي النهارده.",
];

export default function RubyBanner() {
  const { user } = useUser();
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.firstName) {
      setDisplayName(user.firstName);
    }
    setMessage(rubyMessages[Math.floor(Math.random() * rubyMessages.length)]);
  }, [user]);

  if (!message) return null;

  return (
    <div className="my-16 relative overflow-hidden rounded-[3rem] bg-slate-900 p-10 md:p-12 shadow-2xl group">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl group-hover:bg-teal-500/20 transition-all duration-1000" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] bg-teal-500 flex items-center justify-center flex-shrink-0 shadow-2xl shadow-teal-500/30">
          <span className="material-symbols-outlined text-3xl md:text-4xl text-slate-900 font-bold filled">favorite</span>
        </div>

        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 mb-3">
            روبي بيقول{displayName ? ` لـ ${displayName}` : ""} 💙
          </p>
          <p className="text-xl md:text-2xl text-slate-200 font-bold leading-relaxed text-right" dir="rtl">
            &ldquo;{message}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
