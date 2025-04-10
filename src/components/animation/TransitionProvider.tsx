"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";

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
