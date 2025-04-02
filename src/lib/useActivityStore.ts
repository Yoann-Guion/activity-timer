"use client";

import { v4 as uuidv4 } from "uuid";

import { IActivity, INewActivity, TimerSession } from "@/@types/activity";
import { create } from "zustand";
// import { persist } from "zustand/middleware";
interface ActivityStore {
  activities: IActivity[];
  timers: TimerSession[];
  activeTimer: TimerSession | null;

  // Actions
  addActivity: (activity: INewActivity) => void;
  deleteActivity: (id: string) => void;
  startTimer: (activityId: string) => void;
}

export const useActivityStore = create<ActivityStore>((set, get) => ({
  activities: [],
  timers: [],
  activeTimer: null,

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

      // Add the new timer to the store and set it as the active timer
      return {
        timers: [...state.timers, newTimer],
        activeTimer: newTimer,
      };
    }),
}));
