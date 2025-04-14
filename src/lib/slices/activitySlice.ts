import { StateCreator } from "zustand";
import { buildValidatedActivity } from "../validation/activity/activity.validators";
import {
  ValidatedActivity,
  ValidatedNewActivity,
  ValidatedSession,
} from "../validation/activity/activity.types";

export interface ActivitySlice {
  activities: ValidatedActivity[];

  // Actions
  addActivity: (activity: ValidatedNewActivity) => void;
  updateActivity: (activity: ValidatedActivity) => void;
  deleteActivity: (id: string) => void;
  addSessionToActivity: (session: ValidatedSession) => void;
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
      const newActivity = buildValidatedActivity(activity);
      if (!newActivity) {
        // todo : voir pour afficher toast ?
        return state;
      }
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
