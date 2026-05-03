"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="w-full animate-fade-in-up"
    >
      {children}
    </div>
  );
}
