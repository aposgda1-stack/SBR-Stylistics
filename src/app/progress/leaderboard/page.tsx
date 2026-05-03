"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

interface LeaderboardEntry {
  name: string;
  totalScore: number;
  updatedAt: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="w-full aspect-[21/9] md:aspect-[21/6] rounded-3xl overflow-hidden shadow-sm mb-12 relative border border-slate-100 animate-fade-in-up">
          <img src="/images/leaderboard_hero.png" alt="Stylistics Leaderboard" className="w-full h-full object-cover" />
        </div>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full font-label-sm uppercase mb-4 border border-yellow-100 shadow-sm">
            <span className="material-symbols-outlined text-sm filled">emoji_events</span>
            Hall of Fame
          </div>
          <h1 className="text-display-lg font-serif font-bold text-slate-900 mb-4">Student Leaderboard</h1>
          <p className="text-slate-500 font-serif">Top 10 Stylisticians excelling in their educational journey.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          {loading ? (
            <div className="p-20 text-center text-slate-300">
              <div className="animate-spin mb-4 inline-block">
                <span className="material-symbols-outlined text-4xl">autorenew</span>
              </div>
              <p className="font-serif">Loading rankings...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="p-20 text-center text-slate-400 font-serif">
              <p>No rankings yet. Be the first to top the board!</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 font-bold text-slate-900 font-serif">Rank</th>
                  <th className="px-8 py-5 font-bold text-slate-900 font-serif">Student</th>
                  <th className="px-8 py-5 font-bold text-slate-900 font-serif text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => (
                  <tr 
                    key={idx} 
                    className={`border-b border-slate-50 hover:bg-slate-50/30 transition-colors ${idx === 0 ? "bg-yellow-50/20" : ""}`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        {idx === 0 ? (
                          <span className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-yellow-200">1</span>
                        ) : idx === 1 ? (
                          <span className="w-8 h-8 rounded-full bg-slate-300 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-slate-100">2</span>
                        ) : idx === 2 ? (
                          <span className="w-8 h-8 rounded-full bg-orange-300 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-orange-100">3</span>
                        ) : (
                          <span className="w-8 h-8 text-slate-400 flex items-center justify-center text-sm font-bold">{idx + 1}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                          {entry.name?.[0]?.toUpperCase() || "S"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 font-serif">{entry.name}</p>
                          <p className="text-xs text-slate-400 font-sans">Last active {new Date(entry.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="font-display-md text-xl font-bold text-primary font-serif">{entry.totalScore}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
