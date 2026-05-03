"use client";

import { useEffect, useState } from "react";

export default function Confetti() {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#6366f1", "#ec4899"];
    const newPieces = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 3,
      rotation: Math.random() * 360,
    }));
    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            opacity: 0.8,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
