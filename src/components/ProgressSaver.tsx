"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function ProgressSaver({ lessonId }: { lessonId: string }) {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!lessonId) return;

    // 1. Instant Local Save (Safe for 500+ users, 0 server load)
    const localProgress = localStorage.getItem("stylistics_progress") || "[]";
    const progressArr = JSON.parse(localProgress);
    if (!progressArr.includes(lessonId)) {
      progressArr.push(lessonId);
      localStorage.setItem("stylistics_progress", JSON.stringify(progressArr));
    }

    // 2. Server Sync (Background)
    if (isSignedIn) {
      const saveProgress = async (retries = 3) => {
        try {
          const res = await fetch("/api/save-progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lessonId }),
          });
          if (!res.ok && retries > 0) throw new Error("Retry");
        } catch (error) {
          if (retries > 0) {
            setTimeout(() => saveProgress(retries - 1), 2000); // Retry after 2s
          }
          console.error("Progress sync deferred:", error);
        }
      };
      saveProgress();
    }
  }, [lessonId, isSignedIn]);

  return null;
}
