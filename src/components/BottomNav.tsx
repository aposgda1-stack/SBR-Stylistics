"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/material", label: "Material", icon: "menu_book" },
  { href: "/word-box", label: "Word Box", icon: "dictionary" },
  { href: "/chapters", label: "Chapters", icon: "school" },
  { href: "/exam", label: "Exam", icon: "workspace_premium" },
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
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pt-2 pb-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_-4px_rgba(15,23,42,0.06)] z-50">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-150 active:scale-90 ${
            isActive(item.href)
              ? "text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800"
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          <span className={`material-symbols-outlined ${isActive(item.href) ? "filled" : ""}`}>
            {item.icon}
          </span>
          <span className="font-serif text-[11px] uppercase tracking-widest mt-1">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}
