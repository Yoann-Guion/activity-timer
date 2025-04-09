import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert hours and minutes into minutes only
 * @param hours - Number of hours
 * @param minutes - Number of minutes
 * @returns Total minutes
 */
export const convertToTotalMinutes = (
  hours: string | number,
  minutes: string | number
): number => {
  return (
    (Number.parseInt(hours.toString()) || 0) * 60 +
    (Number.parseInt(minutes.toString()) || 0)
  );
};

/**
 * Convert total minutes into hours and minutes
 * @param totalMinutes - Total minutes to convert
 * @returns Object containing hours and minutes as strings
 */
export const convertFromTotalMinutes = (
  totalMinutes: number
): { hours: string; minutes: string } => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours: hours.toString(),
    minutes: minutes.toString(),
  };
};

/**
 * Format seconds into a human-readable string
 * @param seconds - Number of seconds to format
 * @returns Formatted string in the format "HH:MM:SS"
 */
export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

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
 * Format a date according to the specified locale ('fr' or 'en')
 *
 * @param date - Date to format
 * @param locale - Locale for formatting ('fr' for French, 'en' for English)
 * @returns Formatted date string
 */
export function formatDate(date: Date, locale: string): string {
  if (!date) return "";

  const currentDate = new Date(date);

  if (locale === "fr") {
    // French format:  08 avril 2025
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return currentDate.toLocaleDateString("fr-FR", options);
  } else {
    // English format: April 08, 2025
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "2-digit",
      year: "numeric",
    };
    return currentDate.toLocaleDateString("en-US", options);
  }
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
