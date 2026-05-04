"use client";

import { useState, useEffect } from "react";

interface LeaderboardEntry {
  name: string;
  totalScore: number;
  updatedAt: string;
}

const rankStyles = [
  { bg: "bg-amber-400",  text: "text-white", shadow: "shadow-amber-200/50", medal: "🥇" },
  { bg: "bg-slate-300",  text: "text-white", shadow: "shadow-slate-200/50",  medal: "🥈" },
  { bg: "bg-orange-300", text: "text-white", shadow: "shadow-orange-200/50", medal: "🥉" },
];

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = () => {
    fetch("/api/leaderboard")
      .then(res => res.json())
      .then(data => { setEntries(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeaderboard();
    window.addEventListener("progressUpdated", fetchLeaderboard);
    return () => window.removeEventListener("progressUpdated", fetchLeaderboard);
  }, []);

  return (
    <div className="bg-[var(--surface)] border border-[var(--outline-variant)] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--outline-variant)]">
        <div>
          <p className="text-sm font-black text-[var(--on-surface)] uppercase tracking-tight">Leaderboard</p>
          <p className="text-[10px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">Top Achievers</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-lg">🏆</div>
      </div>

      {/* Body */}
      {loading ? (
        <div className="py-10 flex flex-col items-center gap-2 text-[var(--on-surface-variant)]">
          <span className="material-symbols-outlined text-3xl animate-spin">autorenew</span>
          <p className="text-[10px] font-black uppercase tracking-widest">Loading...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-[10px] font-black text-[var(--on-surface-variant)] uppercase tracking-widest">No rankings yet — complete a quiz to lead!</p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--outline-variant)]">
          {entries.map((entry, idx) => {
            const rank = rankStyles[idx];
            return (
              <div key={idx} className={`flex items-center gap-3 px-4 py-3 ${idx === 0 ? "bg-amber-400/5" : ""}`}>
                {/* Rank badge */}
                {idx < 3 ? (
                  <div className={`w-8 h-8 rounded-full ${rank.bg} ${rank.text} flex items-center justify-center text-xs font-black shadow ${rank.shadow} flex-shrink-0`}>
                    {idx + 1}
                  </div>
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center text-xs font-black text-[var(--on-surface-variant)] flex-shrink-0">
                    {idx + 1}
                  </div>
                )}

                {/* Avatar */}
                <div className="w-8 h-8 rounded-lg bg-[var(--surface-variant)] flex items-center justify-center text-[var(--on-surface-variant)] text-xs font-black flex-shrink-0 border border-[var(--outline-variant)]">
                  {entry.name?.[0]?.toUpperCase() || "S"}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[var(--on-surface)] truncate leading-none">{entry.name}</p>
                  <p className="text-[9px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest mt-0.5">
                    {new Date(entry.updatedAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Score */}
                <div className="flex-shrink-0 text-right">
                  <p className="text-base font-black text-teal-500 leading-none">{entry.totalScore}</p>
                  <p className="text-[9px] font-bold text-[var(--on-surface-variant)] uppercase tracking-widest">pts</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
