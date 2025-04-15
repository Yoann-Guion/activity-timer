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

  // Create a new date object to avoid mutating the original date
  const monday = new Date(now);
  monday.setDate(diff);
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

/**
 * Get the week number of the year for a given date
 * @param date - Date to get the week number from
 * @returns The week number of the year (1-53)
 */
export function getWeekNumber(date: Date): number {
  // Create a copy of the date object to avoid mutating the original date
  const d = new Date(date);
  // Reset time to midnight to normalize the date
  d.setHours(0, 0, 0, 0);
  // Move to Thursday of the current ISO week to ensure correct week number calculation
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  // Take January 1st as the first week of the year
  const yearStart = new Date(d.getFullYear(), 0, 1);
  // Calculate the number of days since the start of the year
  const daysSinceYearStart = (d.getTime() - yearStart.getTime()) / 86400000;
  // Calculate the week number and return it
  return Math.ceil((daysSinceYearStart + 1) / 7);
}

/**
 * Function to get the year and week number from a week key
 * @param weekKey - The week key in the format "2025-W16"
 * @returns { year: number, weekNumber: number }
 */
export function getWeekInfoFromKey(weekKey: string) {
  const [yearStr, weekStr] = weekKey.split("-W");
  return {
    year: Number(yearStr),
    weekNumber: Number(weekStr),
  };
}
