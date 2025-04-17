import { z } from "zod";

// Schema for validating activity sessions
export const SessionSchema = z.object({
  id: z.string().uuid(),
  activityId: z.string().uuid(),
  startTime: z.date(),
  endTime: z.date(),
  duration: z.number().positive(),
  pausedTime: z.number().optional(),
});

// Schema for validating new activities before being added to the store
export const NewActivitySchema = z.object({
  name: z.string().trim().min(1).max(32),
  weeklyGoal: z.number().positive(),
  color: z.string().regex(/^#([0-9A-F]{6})$/i),
});

// Schema for validating full activities in the store (extends NewActivitySchema)
export const ActivitySchema = NewActivitySchema.extend({
  id: z.string().uuid(),
  weeklyProgress: z.number().min(0),
  createdAt: z.date(),
  sessions: z.array(SessionSchema),
});
