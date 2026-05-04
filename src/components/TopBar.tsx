"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";
import SearchModal from "./SearchModal";

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/material", label: "Material" },
  { href: "/word-box", label: "Word Box" },
  { href: "/chapters", label: "Chapters" },
  { href: "/exam", label: "Exam" },
];

export default function TopBar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.08)]">
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <nav className="flex justify-between items-center w-full px-6 py-3 max-w-7xl mx-auto">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xl font-serif font-bold tracking-tighter text-slate-900 dark:text-white">
            Stylestics Platform
          </span>
          <span className="text-[10px] font-sans text-slate-400 dark:text-slate-500 italic tracking-wide mt-0.5">
            Class of 2026 🎓 Summarized by Ruby
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-serif tracking-tight transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-slate-900 dark:text-white font-bold border-b-2 border-slate-900 dark:border-white pb-0.5"
                  : "text-slate-500 font-medium hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-slate-700"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="text-xs font-bold uppercase tracking-widest">Search</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-sm font-medium text-white bg-slate-900 hover:bg-slate-700 transition-colors px-4 py-1.5 rounded-lg">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-2 mr-2 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-full">
              <span className="material-symbols-outlined text-[18px] text-yellow-600 filled">emoji_events</span>
              <UserScore />
            </div>
            <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}

function UserScore() {
  const [score, setScore] = useState<number | null>(null);

  const fetchScore = () => {
    fetch("/api/user/progress")
      .then((res) => res.json())
      .then((data) => setScore(data.score))
      .catch(() => setScore(0));
  };

  useEffect(() => {
    fetchScore();
    
    // Refresh score in real-time when progress changes
    const handleUpdate = () => fetchScore();
    window.addEventListener("progressUpdated", handleUpdate);
    return () => window.removeEventListener("progressUpdated", handleUpdate);
  }, []);

  return (
    <span className="text-xs font-black text-yellow-700 dark:text-yellow-500">
      {score !== null ? `${score} pts` : "..."}
    </span>
  );
}
