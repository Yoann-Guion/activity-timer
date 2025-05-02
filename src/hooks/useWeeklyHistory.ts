import { useMemo } from "react";
import { useActivityStore } from "@/lib/useActivityStore";
import { getCurrentWeekKey } from "@/lib/utils/date";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";

/**
 * Custom hook to get the weekly summary of activities.
 *
 * @param {string} weekKey - The key of the week to retrieve the summary for.
 * @returns {Object} - An object containing whether it's the current week and the activities for that week.
 */
export function useWeeklySummary(weekKey: string): {
  isCurrentWeek: boolean;
  activities: ValidatedActivity[];
} {
  const currentWeekKey = getCurrentWeekKey();
  const isCurrentWeek = weekKey === currentWeekKey;

  const currentActivities = useActivityStore((state) => state.activities);
  const weeklyHistory = useActivityStore((state) => state.weeklyHistory);

  const activities = useMemo(() => {
    if (isCurrentWeek) {
      return currentActivities;
    } else {
      const weekEntry = weeklyHistory?.find(
        (entry) => entry.weekKey === weekKey
      );
      return weekEntry?.activities || [];
    }
  }, [isCurrentWeek, currentActivities, weeklyHistory, weekKey]);

  return {
    isCurrentWeek,
    activities,
  };
}
