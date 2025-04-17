import { useActivityStore } from "@/lib/useActivityStore";
import { getCurrentWeekKey } from "@/lib/utils/date";

export function useAvailableWeeks(): string[] {
  const weeklyHistory = useActivityStore((state) => state.weeklyHistory || []);
  const currentWeekKey = getCurrentWeekKey();

  // Extract the week keys from the weekly history
  const archivedWeekKeys = weeklyHistory.map((entry) => entry.weekKey);

  // Check if the current week is already in the archived weeks
  const allWeeks = archivedWeekKeys.includes(currentWeekKey)
    ? archivedWeekKeys
    : [...archivedWeekKeys, currentWeekKey];

  // Sort the weeks in descending order
  return allWeeks.sort().reverse();
}
