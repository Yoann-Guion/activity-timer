"use client";

import { AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface TransitionProviderProps {
  children: ReactNode;
}

/**
 * A provider that manages page transitions using AnimatePresence from framer motion
 */
export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={pathname}>{children}</div>
    </AnimatePresence>
  );
}
