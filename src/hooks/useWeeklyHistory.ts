import { useActivityStore } from "@/lib/useActivityStore";
import { getCurrentWeekKey } from "@/lib/utils/date";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import { ValidatedWeeklyHistory } from "@/lib/validation/history/history.types";

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

  const activities = useActivityStore(
    (state: {
      weeklyHistory?: ValidatedWeeklyHistory;
      activities: ValidatedActivity[];
    }) => {
      if (isCurrentWeek) {
        return state.activities;
      } else {
        const weekEntry = state.weeklyHistory?.find(
          (entry) => entry.weekKey === weekKey
        );
        return weekEntry?.activities || [];
      }
    }
  );
  return {
    isCurrentWeek,
    activities,
  };
}
