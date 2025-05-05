import { z } from "zod";
import { ActivitySchema } from "../activity/activity.schemas";

// Schema for validating a single week key
export const weekKeySchema = z
  .string()
  .regex(/^(\d{4})-W(\d{1,2})$/, "Invalid week key");

// Schema for validating weekly history entries
export const weeklyHistoryEntrySchema = z.object({
  weekKey: weekKeySchema,
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  activities: z.array(ActivitySchema),
});

export const weeklyHistorySchema = z.array(weeklyHistoryEntrySchema);
