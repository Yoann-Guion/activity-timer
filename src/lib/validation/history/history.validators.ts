import { weeklyHistorySchema } from "./history.schemas";
import {
  HistoryActivityFromStorage,
  ValidatedWeeklyHistory,
} from "./history.types";

/**
 * Validates the weekly history data from local storage.
 * @param historyData - Data to validate retrieved from local storage.
 * @returns Validated weekly history or an empty array if validation fails.
 */
export function validateHistoryFromStorage(
  historyData: unknown
): ValidatedWeeklyHistory {
  try {
    if (!historyData) return [];

    const processedData: ValidatedWeeklyHistory = Array.isArray(historyData)
      ? historyData.map((entry) => ({
          ...entry,
          activities: (entry.activities as HistoryActivityFromStorage[]).map(
            (activity) => ({
              ...activity,
              createdAt: new Date(activity.createdAt),
              sessions: activity.sessions.map((session) => ({
                ...session,
                startTime: new Date(session.startTime),
                endTime: new Date(session.endTime),
              })),
            })
          ),
        }))
      : [];

    const validatedHistory = weeklyHistorySchema.parse(processedData);
    return validatedHistory;
  } catch (error) {
    console.error("Erreur de validation de l'historique:", error);
    return [];
  }
}
