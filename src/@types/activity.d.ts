export interface IActivity {
  id: string;
  name: string;
  weeklyGoal: number;
  weeklyProgress: number;
  color: string;
  createdAt: Date;
}

export interface TimerSession {
  id: string;
  activityId: string;
  startTime: Date;
  endTime: Date | null;
  duration: number;
  isActive: boolean;
}

/**
 * Type for new activity before being added to the store
 * @property {string} name - Name of the activity.
 * @property {number} weeklyGoal - Weekly goal in minutes.
 * @property {string} color - Color of the activity in hex format.
 */
export type INewActivity = Omit<
  IActivity,
  "id" | "weeklyProgress" | "createdAt"
>;
