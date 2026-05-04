"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { sounds } from "@/lib/sounds";

export default function SessionTracker() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [sessionPoints, setSessionPoints] = useState(0);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    // We want to give 5 points every 5 minutes.
    // That means an interval of 5 * 60 * 1000 = 300,000 ms.
    const INTERVAL_MS = 5 * 60 * 1000;

    const interval = setInterval(() => {
      const rewardPoints = async () => {
        try {
          const res = await fetch("/api/save-score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              userName: user.fullName || "Student",
              points: 5,
            }),
          });
          
          if (res.ok) {
            setSessionPoints((prev) => prev + 5);
            sounds.playSuccess();
            // You could optionally show a toast notification here
          }
        } catch (error) {
          console.error("Failed to reward session points", error);
        }
      };

      rewardPoints();
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isLoaded, isSignedIn, user]);

  if (!isSignedIn || sessionPoints === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 bg-teal-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-fade-in-up z-50 flex items-center gap-2">
      <span className="material-symbols-outlined text-sm">local_fire_department</span>
      Study Streak: +{sessionPoints} pts!
    </div>
  );
}
