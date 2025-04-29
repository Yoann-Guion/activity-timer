import { useEffect } from "react";
import { useActivityStore } from "@/lib/useActivityStore";
import { getCurrentWeekKey } from "@/lib/utils/date";

// Hook to reset weekly progress and save the previous week's data
export function useWeeklyArchiveAndReset() {
  const { resetWeeklyProgress, getHistoryForWeek, saveWeekToHistory } =
    useActivityStore();

  useEffect(() => {
    // Retrieve the current week number
    const currentWeekKey = getCurrentWeekKey();
    // Retrieve the last saved week number from the local storage
    const lastResetWeekKey = localStorage.getItem("lastResetWeekKey");

    if (lastResetWeekKey && lastResetWeekKey !== currentWeekKey) {
      // Check if the previous week's data is already saved
      const previousWeekHistory = getHistoryForWeek(lastResetWeekKey);

      if (!previousWeekHistory) {
        // If the previous week's data is not saved, save it
        saveWeekToHistory(lastResetWeekKey);
      }

      // Then, reset the weekly progress
      resetWeeklyProgress();

      // Update the last reset week in local storage
      localStorage.setItem("lastResetWeekKey", currentWeekKey);
    }
    // If the last reset week is not set, it means it's the first run of the app
    else if (!lastResetWeekKey) {
      localStorage.setItem("lastResetWeekKey", currentWeekKey);
    }
  }, [resetWeeklyProgress, saveWeekToHistory, getHistoryForWeek]);
}
