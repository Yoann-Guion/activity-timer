// lib/validation/history/history.schemas.ts
import { z } from "zod";
import { ActivitySchema } from "../activity/activity.schemas";

// Schema for validating weekly history entries
export const weeklyHistoryEntrySchema = z.object({
  weekNumber: z.number().int().min(1).max(53),
  year: z.number().int().min(2020),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  activities: z.array(ActivitySchema),
});

export const weeklyHistorySchema = z.array(weeklyHistoryEntrySchema);
