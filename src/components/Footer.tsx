"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/",         icon: "home",         label: "Home" },
  { href: "/chapters", icon: "map",           label: "Journey" },
  { href: "/material", icon: "auto_stories",  label: "Guide" },
  { href: "/progress", icon: "emoji_events",  label: "Dashboard" },
  { href: "/exam",     icon: "quiz",          label: "Exam" },
  { href: "/word-box", icon: "style",         label: "Words" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      {/* Bottom Nav Bar — fixed to bottom, scrollable */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--outline-variant)] safe-area-pb">
        <div className="flex overflow-x-auto no-scrollbar px-2 py-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all min-w-[64px] ${
                  isActive
                    ? "text-teal-500"
                    : "text-[var(--on-surface-variant)]"
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] transition-all ${isActive ? "filled scale-110" : ""}`}>
                  {link.icon}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${isActive ? "text-teal-500" : ""}`}>
                  {link.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-teal-500 mt-0.5" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Tiny copyright — inside page before nav */}
      <div className="max-w-lg mx-auto px-4 pb-2 pt-4">
        <p className="text-[8px] text-center font-bold text-[var(--on-surface-variant)] opacity-40 uppercase tracking-widest">
          © 2026 The Final Chapter · Non-profit · For classmates
        </p>
      </div>
    </>
  );
}
