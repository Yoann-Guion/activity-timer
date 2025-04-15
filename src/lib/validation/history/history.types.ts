import { z } from "zod";
import {
  weeklyHistoryEntrySchema,
  weeklyHistorySchema,
} from "./history.schemas";
import {
  ActivitySliceState,
  ValidatedActivity,
  ValidatedSession,
} from "../activity/activity.types";

// Type for validating weekly history entries
export type ValidatedWeeklyHistoryEntry = z.infer<
  typeof weeklyHistoryEntrySchema
>;
export type ValidatedWeeklyHistory = z.infer<typeof weeklyHistorySchema>;

export interface HistorySliceState {
  weeklyHistory: ValidatedWeeklyHistory;

  // Actions
  saveWeekToHistory: () => void;
  getHistoryForWeek: (
    weekNumber: number,
    year: number
  ) => ValidatedWeeklyHistoryEntry | undefined;
  clearHistory: () => void;
}

// Type used in the implementation of the history slice with dependency on ActivitySlice
export type HistorySliceWithDependencies = HistorySliceState &
  Pick<ActivitySliceState, "activities">;

// Activity in ISO format as stored in localStorage (not yet converted)
export type HistoryActivityFromStorage = Omit<
  ValidatedActivity,
  "createdAt" | "sessions"
> & {
  createdAt: string;
  sessions: HistorySessionFromStorage[];
};

export type HistorySessionFromStorage = Omit<
  ValidatedSession,
  "startTime" | "endTime"
> & {
  startTime: string;
  endTime: string;
};
