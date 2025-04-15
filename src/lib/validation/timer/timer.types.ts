import { z } from "zod";
import { TimerSessionSchema } from "./timer.schemas";

export type ValidatedTimerSession = z.infer<typeof TimerSessionSchema>;

// Interface for timer
export interface TimerSliceState {
  timers: ValidatedTimerSession[];
  activeTimer: ValidatedTimerSession | null;
  pauseStartTime: number | null;
  totalPausedTime: number;

  // Actions
  startTimer: (activityId: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
}
