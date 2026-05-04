"use client";

import { useState, useEffect } from "react";

interface LeaderboardEntry {
  name: string;
  totalScore: number;
  updatedAt: string;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = () => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeaderboard();
    
    // Listen for progress updates to refresh leaderboard in real-time
    const handleUpdate = () => fetchLeaderboard();
    window.addEventListener("progressUpdated", handleUpdate);
    return () => window.removeEventListener("progressUpdated", handleUpdate);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Student Rankings</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Top 10 High Achievers</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-white flex items-center justify-center shadow-lg shadow-yellow-200">
          <span className="material-symbols-outlined filled">emoji_events</span>
        </div>
      </div>

      {loading ? (
        <div className="p-20 text-center text-slate-300">
          <div className="animate-spin mb-4 inline-block">
            <span className="material-symbols-outlined text-4xl">autorenew</span>
          </div>
          <p className="font-bold uppercase tracking-widest text-[10px]">Updating Hall of Fame...</p>
        </div>
      ) : entries.length === 0 ? (
        <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          <p>No rankings yet. Start a quiz to lead!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/30 dark:bg-slate-800/30 border-b border-slate-50 dark:border-slate-800">
                <th className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Rank</th>
                <th className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Student</th>
                <th className="px-8 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors ${idx === 0 ? "bg-yellow-50/10 dark:bg-yellow-900/5" : ""}`}
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      {idx === 0 ? (
                        <span className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-yellow-200">1</span>
                      ) : idx === 1 ? (
                        <span className="w-8 h-8 rounded-full bg-slate-300 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-slate-100">2</span>
                      ) : idx === 2 ? (
                        <span className="w-8 h-8 rounded-full bg-orange-300 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-orange-100">3</span>
                      ) : (
                        <span className="w-8 h-8 text-slate-400 flex items-center justify-center text-sm font-black">{idx + 1}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-black border border-slate-200 dark:border-slate-700">
                        {entry.name?.[0]?.toUpperCase() || "S"}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white tracking-tight">{entry.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Active {new Date(entry.updatedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-2xl font-black text-primary dark:text-teal-400 tracking-tighter">{entry.totalScore}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
