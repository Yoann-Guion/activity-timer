import { useActivityStore } from "@/lib/useActivityStore";
import { getCurrentWeekKey } from "@/lib/utils/date";

export function useAvailableWeeks(): string[] {
  const weeklyHistory = useActivityStore((state) => state.weeklyHistory || []);
  const currentWeekKey = getCurrentWeekKey();

  // Extraire les clés de semaine du tableau d'historique
  const archivedWeekKeys = weeklyHistory.map((entry) => entry.weekKey);

  // Vérifier si la semaine actuelle est déjà dans l'historique
  const allWeeks = archivedWeekKeys.includes(currentWeekKey)
    ? archivedWeekKeys
    : [...archivedWeekKeys, currentWeekKey];

  // Tri des semaines par ordre décroissant (plus récent en premier)
  return allWeeks.sort().reverse();
}
