import { z } from "zod";
import {
  ActivitySchema,
  NewActivitySchema,
  SessionSchema,
} from "./activity.schemas";

// Schema for validating activity sessions with real dates
export type ValidatedActivity = z.infer<typeof ActivitySchema>;
export type ValidatedSession = z.infer<typeof SessionSchema>;

export type ValidatedNewActivity = z.infer<typeof NewActivitySchema>;

// Intermediate type for JSON data (from localStorage)
export type ActivityWithIsoDates = Omit<
  ValidatedActivity,
  "createdAt" | "sessions"
> & {
  createdAt: string;
  sessions: SessionWithIsoDates[];
};
export type SessionWithIsoDates = Omit<
  ValidatedSession,
  "startTime" | "endTime"
> & {
  startTime: string;
  endTime: string;
};

export interface ActivitySliceState {
  activities: ValidatedActivity[];

  // Actions
  addActivity: (activity: ValidatedNewActivity) => void;
  updateActivity: (activity: ValidatedActivity) => void;
  deleteActivity: (id: string) => void;
  addSessionToActivity: (session: ValidatedSession) => void;
  resetWeeklyProgress: () => void;
}
