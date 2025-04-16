import { z } from "zod";

export const TimerSchema = z.object({
  id: z.string().uuid(),
  activityId: z.string().uuid(),
  startTime: z.date(),
  endTime: z.date().nullable(),
  duration: z.number(),
  isActive: z.boolean(),
});
