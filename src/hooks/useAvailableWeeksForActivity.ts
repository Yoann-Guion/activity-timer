import { useActivityStore } from "@/lib/useActivityStore";
import { getCurrentWeekKey } from "@/lib/utils/date";

export function useAvailableWeeksForActivity(activityId: string): string[] {
  const weeklyHistory = useActivityStore((state) => state.weeklyHistory || []);
  const currentWeekKey = getCurrentWeekKey();

  // Filtrer les semaines où l'activité est présente
  const archivedWeekKeys = weeklyHistory
    .filter((entry) =>
      entry.activities.some((activity) => activity.id === activityId)
    )
    .map((entry) => entry.weekKey);

  // Si l'activité est aussi active cette semaine, on ajoute la semaine courante
  const isCurrentActivity = useActivityStore(
    (state) => !!state.activities.find((a) => a.id === activityId)
  );

  const allWeeks =
    isCurrentActivity && !archivedWeekKeys.includes(currentWeekKey)
      ? [...archivedWeekKeys, currentWeekKey]
      : archivedWeekKeys;

  // Retourne les clés de semaine triées (de la plus récente à la plus ancienne)
  return allWeeks.sort().reverse();
}
