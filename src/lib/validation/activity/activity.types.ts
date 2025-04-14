import { z } from "zod";
import {
  ActivitySchema,
  NewActivitySchema,
  SessionSchema,
} from "./activity.schemas";

export type ValidatedActivity = z.infer<typeof ActivitySchema>;
export type ValidatedNewActivity = z.infer<typeof NewActivitySchema>;
export type ValidatedSession = z.infer<typeof SessionSchema>;
