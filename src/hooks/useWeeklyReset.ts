// hooks/useWeeklyReset.ts
import { useEffect } from "react";
import { useActivityStore } from "@/lib/useActivityStore";
import { getWeekNumber } from "@/lib/utils";

// Hook to reset weekly progress
export function useWeeklyReset() {
  const { resetWeeklyProgress } = useActivityStore();

  useEffect(() => {
    // Retrieve the current week number
    const now = new Date();
    const currentWeek = `${now.getFullYear()}-W${getWeekNumber(now)
      .toString()
      .padStart(2, "0")}`;

    // Retrieve the last saved week number from the local storage
    const lastResetWeek = localStorage.getItem("lastResetWeek");

    // If we've never backed up or if we're in a new week
    if (!lastResetWeek || lastResetWeek !== currentWeek) {
      // Reset the weekly progress
      resetWeeklyProgress();

      // Save the current week number in local storage
      localStorage.setItem("lastResetWeek", currentWeek);
    }
  }, [resetWeeklyProgress]);
}
