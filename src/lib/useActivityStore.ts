// store/index.ts
import { create } from "zustand";
import { ActivitySlice, createActivitySlice } from "./slices/activitySlice";
import { createTimerSlice, TimerSlice } from "./slices/timerSlice";

// Combine both slices into one store
export type StoreState = ActivitySlice & TimerSlice;

/**
 * Creates the Zustand store for managing activities and timers
 */
export const useActivityStore = create<StoreState>()((...a) => ({
  ...createActivitySlice(...a),
  ...createTimerSlice(...a),
}));
