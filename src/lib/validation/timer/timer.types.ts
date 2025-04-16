import { z } from "zod";
import { TimerSchema } from "./timer.schemas";

export type ValidatedTimer = z.infer<typeof TimerSchema>;

// Interface for timer
export interface TimerSliceState {
  timers: ValidatedTimer[];
  activeTimer: ValidatedTimer | null;
  pauseStartTime: number | null;
  totalPausedTime: number;

  // Actions
  startTimer: (activityId: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
}
