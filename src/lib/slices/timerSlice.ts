import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";
import { ValidatedSession } from "../validation/activity/activity.types";
import {
  TimerSliceState,
  ValidatedTimer,
} from "../validation/timer/timer.types";
import { createSessionFromTimer } from "../validation/timer/timer.validators";

/**
 * Creates the timer slice for the Zustand store
 *
 * @param set - The Zustand set function to update the store state
 * @param get - The Zustand get function to access the store state
 * @returns The timer slice with actions to manage timers
 */
export const createTimerSlice: StateCreator<
  TimerSliceState & {
    addSessionToActivity: (session: ValidatedSession) => void;
  },
  [],
  [],
  TimerSliceState
> = (set, get) => ({
  timers: [],
  activeTimer: null,
  pauseStartTime: null,
  totalPausedTime: 0,

  // Start a timer for a selected activity
  startTimer: (activityId) =>
    set((state) => {
      // Create a new timer
      const newTimer: ValidatedTimer = {
        id: uuidv4(),
        activityId,
        startTime: new Date(),
        endTime: null,
        duration: 0,
        isActive: true,
      };

      // Add the new timer to the store, set it as the active timer and reset pause state
      return {
        timers: [...state.timers, newTimer],
        activeTimer: newTimer,
        pauseStartTime: null,
        totalPausedTime: 0,
      };
    }),

  // Pause the active timer
  pauseTimer: () =>
    set((state) => {
      // Only pause if there's an active timer and it's not already paused
      if (!state.activeTimer || state.pauseStartTime !== null) return state;
      return {
        pauseStartTime: new Date().getTime(),
      };
    }),

  // Resume the active timer
  resumeTimer: () =>
    set((state) => {
      // Only resume if there's an active timer and it's currently paused
      if (!state.activeTimer || state.pauseStartTime === null) return state;

      // Calculate how long this pause lasted
      const pauseDuration = new Date().getTime() - state.pauseStartTime;

      // Clear pause start time and add the duration to total paused time
      return {
        pauseStartTime: null,
        totalPausedTime: state.totalPausedTime + pauseDuration,
      };
    }),

  // Stop the active timer, update the activity's weekly progress and save the session
  stopTimer: () => {
    set((state) => {
      // Only stop if there's an active timer
      if (!state.activeTimer) return state;

      // Calculate the total paused time including current pause if timer is paused
      const totalPauseTime = state.pauseStartTime
        ? state.totalPausedTime + (new Date().getTime() - state.pauseStartTime)
        : state.totalPausedTime;

      const endTime = new Date();
      const { activeTimer } = state;

      // Update the active timer with the end time and duration
      const updatedTimer = {
        ...activeTimer,
        endTime,
        duration:
          (new Date().getTime() -
            new Date(activeTimer.startTime).getTime() -
            totalPauseTime) /
          1000,
        isActive: false,
      };

      // Create a validated session from the timer
      const validatedSession = createSessionFromTimer(
        updatedTimer,
        totalPauseTime
      );

      if (validatedSession) {
        // Add the session to the activity via the activity slice
        get().addSessionToActivity(validatedSession);
      } else {
        console.error("La session n'a pas pu être créée à partir du timer");
      }

      // Update the store and reset the active timer and pause state
      return {
        timers: state.timers.map((timer) =>
          timer.id === activeTimer.id ? updatedTimer : timer
        ),
        activeTimer: null,
        pauseStartTime: null,
        totalPausedTime: 0,
      };
    });
  },
});
