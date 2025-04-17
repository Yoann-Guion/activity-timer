import { useActivityStore } from "@/lib/useActivityStore";
import { getCurrentWeekKey } from "@/lib/utils/date";

/**
 * Custom hook to get the available weeks for a specific activity.
 *
 * @param {string} activityId - The ID of the activity.
 * @returns {string[]} - An array of week keys where the activity was archived.
 */
export function useAvailableWeeksForActivity(activityId: string): string[] {
  const weeklyHistory = useActivityStore((state) => state.weeklyHistory || []);
  const currentWeekKey = getCurrentWeekKey();

  // Get the keys of the weeks where the activity was archived
  const archivedWeekKeys = weeklyHistory
    .filter((entry) =>
      entry.activities.some((activity) => activity.id === activityId)
    )
    .map((entry) => entry.weekKey);

  // Check if the current week is already in the archived weeks
  const isCurrentActivity = useActivityStore(
    (state) => !!state.activities.find((a) => a.id === activityId)
  );

  const allWeeks =
    isCurrentActivity && !archivedWeekKeys.includes(currentWeekKey)
      ? [...archivedWeekKeys, currentWeekKey]
      : archivedWeekKeys;

  // Sort the weeks in descending order
  return allWeeks.sort().reverse();
}
