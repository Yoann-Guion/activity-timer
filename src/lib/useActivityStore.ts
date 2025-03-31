"use client";

import { Activity } from "@/@types/activity";
import { create } from "zustand";

interface ActivityStore {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],

  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity],
    })),
}));
