"use client";

import { useWeeklyReset } from "@/hooks/useWeeklyReset";

// Component to manage the weekly reset of activities
export default function WeeklyResetManager() {
  useWeeklyReset();

  // This component doesn't render anything
  return null;
}
