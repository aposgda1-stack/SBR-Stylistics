"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function ProgressSaver({ lessonId }: { lessonId: string }) {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      const saveProgress = async () => {
        try {
          await fetch("/api/save-progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lessonId }),
          });
        } catch (error) {
          console.error("Failed to save progress:", error);
        }
      };
      saveProgress();
    }
  }, [lessonId, isSignedIn]);

  return null;
}
