"use client";

import { v4 as uuidv4 } from "uuid";

import { IActivity, INewActivity, TimerSession } from "@/@types/activity";
import { create } from "zustand";
// import { persist } from "zustand/middleware";
interface ActivityStore {
  activities: IActivity[];
  timers: TimerSession[];
  activeTimer: TimerSession | null;
  pauseStartTime: number | null;
  totalPausedTime: number;

  // Actions
  addActivity: (activity: INewActivity) => void;
  deleteActivity: (id: string) => void;
  startTimer: (activityId: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  timers: [],
  activeTimer: null,
  pauseStartTime: null,
  totalPausedTime: 0,

  // Add a new activity to the store
  addActivity: (activity) =>
    set((state) => {
      const newActivity: IActivity = {
        id: uuidv4(),
        name: activity.name,
        weeklyGoal: activity.weeklyGoal,
        weeklyProgress: 0,
        color: activity.color,
        createdAt: new Date(),
      };
      return { activities: [...state.activities, newActivity] };
    }),

  // Delete an activity from the store
  deleteActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    })),

  // Start a timer for a selected activity
  startTimer: (activityId) =>
    set((state) => {
      // Create a new timer
      const newTimer: TimerSession = {
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

      // Clear pause start time and add the duration to total paused time (null indicates timer is running)
      return {
        pauseStartTime: null,
        totalPausedTime: state.totalPausedTime + pauseDuration,
      };
    }),

  // Stop the active timer and update the activity's weekly progress
  stopTimer: () => {
    set((state) => {
      // Only stop if there's an active timer
      if (!state.activeTimer) return state;

      // Calculate the total paused time including current pause if timer is paused
      const totalPauseTime = state.pauseStartTime
        ? state.totalPausedTime + (new Date().getTime() - state.pauseStartTime)
        : state.totalPausedTime;

      // Update the active timer with the end time and duration
      const updatedTimer = {
        ...state.activeTimer,
        endTime: new Date(),
        duration:
          (new Date().getTime() -
            new Date(state.activeTimer.startTime).getTime() -
            totalPauseTime) /
          1000,
        isActive: false,
      };

      // Update the weekly progress of the activity
      const updatedActivities = state.activities.map((activity) => {
        if (activity.id === updatedTimer.activityId) {
          return {
            ...activity,
            weeklyProgress:
              activity.weeklyProgress + updatedTimer.duration / 60,
          };
        }
        return activity;
      });

      // Update the store and reset the active timer and pause state
      return {
        activities: updatedActivities,
        timers: state.timers.map((timer) =>
          timer.id === state.activeTimer?.id ? updatedTimer : timer
        ),
        activeTimer: null,
        pauseStartTime: null,
        totalPausedTime: 0,
      };
    });
  },
}));
