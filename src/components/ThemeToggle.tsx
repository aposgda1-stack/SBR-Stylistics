"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes: Array<"light" | "dark" | "sepia" | "oled"> = ["light", "dark", "sepia", "oled"];
  
  const cycleTheme = () => {
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case "light": return "light_mode";
      case "dark": return "dark_mode";
      case "sepia": return "menu_book";
      case "oled": return "nights_stay";
      default: return "settings";
    }
  };

  const getLabel = () => {
    switch (theme) {
      case "light": return "Light";
      case "dark": return "Dark";
      case "sepia": return "Reading";
      case "oled": return "OLED";
      default: return "";
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-outline-variant hover:border-primary transition-all active:scale-95 shadow-sm"
      aria-label="Cycle theme"
    >
      <span className="material-symbols-outlined text-[20px] text-primary">
        {getIcon()}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
        {getLabel()}
      </span>
      
      {/* Tooltip on hover */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-on-primary text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        Switch Theme
      </div>
    </button>
  );
}
