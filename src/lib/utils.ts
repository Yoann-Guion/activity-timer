import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format minutes into a human-readable string
 * Examples:
 * - 75 minutes -> "1h 15min"
 * - 30 minutes -> "30min"
 */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  if (hours === 0) {
    return `${mins}min`;
  }

  return `${hours}h${mins > 0 ? ` ${mins}min` : ""}`;
}

/**
 * Get the start date of the current week (Monday)
 * Used for weekly progress tracking
 */
export function getWeekStartDate(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = sunday, 1 = monday...
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to start the week on Monday
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/**
 * Get the end date of the current week (Sunday)
 * Used for weekly progress tracking
 */
export function getWeekEndDate(): Date {
  const weekStart = getWeekStartDate();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd;
}
