import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ActivitySliceState } from "./validation/activity/activity.types";
import { TimerSliceState } from "./validation/timer/timer.types";
import { HistorySliceState } from "./validation/history/history.types";
import { createActivitySlice } from "./slices/activitySlice";
import { createTimerSlice } from "./slices/timerSlice";
import { createHistorySlice } from "./slices/historySlice";
import { createGlobalSlice, GlobalSliceState } from "./slices/globalSlice";
import { validateActivitiesFromStorage } from "./validation/activity/activity.validators";
import { validateHistoryFromStorage } from "./validation/history/history.validators";

// Combine all slices into one store
export type StoreState = ActivitySliceState &
  TimerSliceState &
  HistorySliceState &
  GlobalSliceState;

/**
 * Creates the Zustand store for managing activities and timers
 */
export const useActivityStore = create<StoreState>()(
  persist(
    (...a) => {
      // Combine all slices into one store
      const store = {
        ...createActivitySlice(...a),
        ...createTimerSlice(...a),
        ...createHistorySlice(...a),
        ...createGlobalSlice(...a),
      };
      return store;
    },
    {
      name: "trackivity-storage",
      storage: createJSONStorage(() => localStorage),
      // Save only the activities and weeklyHistory to localStorage
      partialize: (state) => ({
        activities: state.activities,
        weeklyHistory: state.weeklyHistory,
      }),
      // Rehydrate the store from localStorage with validation
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.activities) {
            state.activities = validateActivitiesFromStorage(state.activities);
          }
          if (state.weeklyHistory) {
            state.weeklyHistory = validateHistoryFromStorage(
              state.weeklyHistory
            );
          }
          state.setIsRehydrated(true);
        }
      },
    }
  )
);
