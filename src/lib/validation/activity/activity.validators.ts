import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  ActivitySchema,
  NewActivitySchema,
  SessionSchema,
} from "./activity.schemas";
import { ValidatedActivity } from "./activity.types";

// Safe parse for validating data
export const validateNewActivity = (data: unknown) =>
  NewActivitySchema.safeParse(data);

export const validateActivity = (data: unknown) =>
  ActivitySchema.safeParse(data);

export const validateSession = (data: unknown) => SessionSchema.safeParse(data);

// Function to build a new activity with validation
export const buildValidatedActivity = (
  input: unknown
): ValidatedActivity | null => {
  const result = NewActivitySchema.safeParse(input);
  if (!result.success) {
    console.error("Validation failed when building activity:", result.error);
    return null;
  }

  const validatedNewActivity = result.data;

  return {
    ...validatedNewActivity,
    id: uuidv4(),
    weeklyProgress: 0,
    createdAt: new Date(),
    sessions: [],
  };
};

// Validation and date parsing for activities from storage (JSON)
const parseDates = (item: any) => ({
  ...item,
  createdAt: item.createdAt ? new Date(item.createdAt) : null,
  sessions: Array.isArray(item.sessions)
    ? item.sessions.map((s: any) => ({
        ...s,
        startTime: new Date(s.startTime),
        endTime: new Date(s.endTime),
      }))
    : [],
});

// Validates and parses activities from local storage
export const validateActivitiesFromStorage = (data: unknown) => {
  if (!Array.isArray(data)) return [];

  return data
    .map(parseDates)
    .map((item) => {
      const result = ActivitySchema.safeParse(item);
      return result.success ? result.data : null;
    })
    .filter((item): item is z.infer<typeof ActivitySchema> => item !== null);
};
