"use client";

import { v4 as uuidv4 } from "uuid";

import { IActivity } from "@/@types/activity";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface ActivityStore {
  activities: IActivity[];
  addActivity: (activity: IActivity) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],

  addActivity: (activity) =>
    set((state) => {
      const newActivity = {
        id: uuidv4(),
        name: activity.name,
        weeklyGoal: activity.weeklyGoal,
        weeklyProgress: 0,
        color: activity.color,
        createdAt: new Date(),
      };
      return { activities: [...state.activities, newActivity] };
    }),
}));
