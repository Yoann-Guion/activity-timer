// store/index.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ActivitySlice, createActivitySlice } from "./slices/activitySlice";
import { createTimerSlice, TimerSlice } from "./slices/timerSlice";

// Combine both slices into one store
export type StoreState = ActivitySlice & TimerSlice;

/**
 * Creates the Zustand store for managing activities and timers
 */
export const useActivityStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createActivitySlice(...a),
      ...createTimerSlice(...a),
    }),
    {
      name: "activity-timer-storage",
      storage: createJSONStorage(() => localStorage),
      // Save only the activities to localStorage
      partialize: (state) => ({
        activities: state.activities,
      }),
    }
  )
);
