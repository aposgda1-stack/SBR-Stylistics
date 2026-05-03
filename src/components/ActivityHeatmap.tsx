"use client";

import { useEffect, useState } from "react";

export default function ActivityHeatmap() {
  const [activity, setActivity] = useState<number[]>([]);
  
  useEffect(() => {
    // Simulate activity data for the last 90 days
    // In a real app, this would come from the database
    // We'll generate a pseudo-random but stable set based on user ID or just random for demo
    const days = 100;
    const data = Array.from({ length: days }, () => Math.floor(Math.random() * 5));
    setActivity(data);
  }, []);

  const getColor = (level: number) => {
    switch (level) {
      case 0: return "bg-slate-100 dark:bg-slate-800";
      case 1: return "bg-teal-200 dark:bg-teal-900";
      case 2: return "bg-teal-400 dark:bg-teal-700";
      case 3: return "bg-teal-600 dark:bg-teal-500";
      case 4: return "bg-teal-800 dark:bg-teal-300";
      default: return "bg-slate-100 dark:bg-slate-800";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline-sm text-lg font-bold text-slate-900 dark:text-white">Learning Activity</h3>
          <p className="text-xs text-slate-400">Your study progress over the last 3 months</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400 mr-1">Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} className={`w-3 h-3 rounded-[2px] ${getColor(l)}`} />
          ))}
          <span className="text-[10px] text-slate-400 ml-1">More</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
        {activity.map((level, i) => (
          <div 
            key={i} 
            className={`heatmap-cell ${getColor(level)}`} 
            title={`Day ${i}: ${level} lessons`}
          />
        ))}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-4">
          <div className="text-center">
            <span className="block text-[10px] text-slate-400 uppercase font-bold">Current Streak</span>
            <span className="text-lg font-bold text-primary dark:text-teal-400">12 Days</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-slate-400 uppercase font-bold">Longest Streak</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">24 Days</span>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-[10px] text-slate-400 uppercase font-bold">Total Lessons</span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">158</span>
        </div>
      </div>
    </div>
  );
}
