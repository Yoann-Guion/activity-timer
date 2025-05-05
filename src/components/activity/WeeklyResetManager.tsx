"use client";

import { useWeeklyArchiveAndReset } from "@/hooks/useWeeklyArchiveAndReset";

// Component to manage the weekly reset of activities
export default function WeeklyResetManager() {
  useWeeklyArchiveAndReset();

  // This component doesn't render anything
  return null;
}
