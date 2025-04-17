import { StateCreator } from "zustand";
import {
  HistorySliceState,
  HistorySliceWithDependencies,
} from "../validation/history/history.types";
import { weeklyHistoryEntrySchema } from "../validation/history/history.schemas";
import { ValidatedActivity } from "../validation/activity/activity.types";
import {
  getCurrentWeekKey,
  getWeekEndDate,
  getWeekStartDate,
} from "../utils/date";

/**
 * Creates the history slice for the Zustand store
 * @param set - The Zustand set function to update the store state
 * @param get - The Zustand get function to access the store state
 * @param activities - The activities slice state to access the current activities
 * @returns The history slice with actions to manage weekly history
 */
export const createHistorySlice: StateCreator<
  HistorySliceWithDependencies,
  [],
  [],
  HistorySliceState
> = (set, get) => ({
  weeklyHistory: [],

  // Save the current week's activities to history
  saveWeekToHistory: () => {
    const { activities } = get();

    // If there are no activities, do not proceed
    if (!activities || activities.length === 0) return;

    const weekKey = getCurrentWeekKey();
    const startDate = getWeekStartDate().toISOString();
    const endDate = getWeekEndDate().toISOString();

    try {
      // Deep copy of activities to avoid mutation
      const activitiesCopy: ValidatedActivity[] = JSON.parse(
        JSON.stringify(activities)
      );

      // Process activities to convert date strings to Date objects
      const processedActivities = activitiesCopy.map((activity) => ({
        ...activity,
        createdAt: new Date(activity.createdAt),

        sessions: activity.sessions?.map((session) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: new Date(session.endTime),
        })),
      }));

      // Creating and validating the history entry with Zod
      const historyEntry = weeklyHistoryEntrySchema.parse({
        weekKey,
        startDate,
        endDate,
        activities: processedActivities,
      });

      set((state) => ({
        weeklyHistory: [...state.weeklyHistory, historyEntry],
      }));
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'entrée d'historique:",
        error
      );
    }
  },

  // Get the history for a specific week using the weekKey
  getHistoryForWeek: (weekKey: string) => {
    const { weeklyHistory } = get();
    return weeklyHistory.find((entry) => entry.weekKey === weekKey);
  },

  // Clear the history
  clearHistory: () => set({ weeklyHistory: [] }),
});
