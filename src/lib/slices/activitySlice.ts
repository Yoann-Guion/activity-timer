import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";
import { IActivity, INewActivity, ISession } from "@/@types/activity";

export interface ActivitySlice {
  activities: IActivity[];

  // Actions
  addActivity: (activity: INewActivity) => void;
  updateActivity: (activity: IActivity) => void;
  deleteActivity: (id: string) => void;
  addSessionToActivity: (session: ISession) => void;
  resetWeeklyProgress: () => void;
}

/**
 * Creates the activity slice for the Zustand store
 * @param set - The Zustand set function to update the store state
 * @returns The activity slice with actions to manage activities and sessions
 */
export const createActivitySlice: StateCreator<
  ActivitySlice,
  [],
  [],
  ActivitySlice
> = (set) => ({
  activities: [],

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
        sessions: [],
      };
      return { activities: [...state.activities, newActivity] };
    }),

  // Update an existing activity in the store
  updateActivity: (updatedActivity) =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      ),
    })),

  // Delete an activity from the store
  deleteActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    })),

  // Add a session to an activity and update weekly progress
  addSessionToActivity: (session) =>
    set((state) => ({
      activities: state.activities.map((activity) => {
        if (activity.id === session.activityId) {
          return {
            ...activity,
            weeklyProgress: activity.weeklyProgress + session.duration,
            sessions: [...(activity.sessions || []), session],
          };
        }
        return activity;
      }),
    })),

  // Reset the weekly progress of all activities
  resetWeeklyProgress: () =>
    set((state) => ({
      activities: state.activities.map((activity) => ({
        ...activity,
        weeklyProgress: 0,
        sessions: [],
      })),
    })),
});
