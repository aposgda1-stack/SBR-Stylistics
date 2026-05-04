"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",         label: "Home",      icon: "home" },
  { href: "/chapters", label: "Journey",   icon: "map" },
  { href: "/material", label: "Guide",     icon: "auto_stories" },
  { href: "/progress", label: "Stats",     icon: "analytics" },
  { href: "/exam",     label: "Exam",      icon: "quiz" },
  { href: "/word-box", label: "Words",     icon: "style" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (!mounted) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--outline-variant)] z-50 safe-area-pb">
      <div className="flex overflow-x-auto no-scrollbar px-2 py-1.5 scroll-smooth">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[72px] px-2 py-1 rounded-xl transition-all duration-200 active:scale-90 ${
                active
                  ? "text-teal-500"
                  : "text-[var(--on-surface-variant)]"
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] ${active ? "filled scale-110" : "opacity-70"}`}>
                {item.icon}
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest mt-0.5 ${active ? "opacity-100" : "opacity-60"}`}>
                {item.label}
              </span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-teal-500 mt-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
