// Utility functions for date formatting and calculations

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
 * Gets the current week key in the format YYYY-WWW
 * @returns string - Current week key (ex: "2025-W16")
 */
export function getCurrentWeekKey(): string {
  const now = new Date();
  const weekNumber = getWeekNumber(now);
  const year = now.getFullYear();
  return `${year}-W${String(weekNumber).padStart(2, "0")}`;
}

/**
 * Function to get the year and week number from a week key
 * @param weekKey - The week key in the format "YYYY-WWW" (ex: "2025-W16")
 * @returns { year: number, weekNumber: number }
 */
export function getWeekInfoFromKey(weekKey: string): {
  year: number;
  weekNumber: number;
} {
  const parts = weekKey.split("-W");
  return {
    year: parseInt(parts[0]),
    weekNumber: parseInt(parts[1]),
  };
}

/**
 * Gets the start and end dates for a specific week key
 * @param weekKey - The week key in the format "YYYY-WWW"
 * @returns { start: Date, end: Date }
 */
export function getWeekDatesFromKey(weekKey: string): {
  start: Date;
  end: Date;
} {
  const { year, weekNumber } = getWeekInfoFromKey(weekKey);

  // Find the first day of the year
  const firstDayOfYear = new Date(Date.UTC(year, 0, 1));

  // Find the first Thursday of the year (ISO week date system uses Thursday)
  const firstThursdayOfYear = new Date(firstDayOfYear);
  firstThursdayOfYear.setDate(
    firstThursdayOfYear.getDate() + (4 - firstThursdayOfYear.getDay() || 7)
  );

  // Calculate the Monday of the first week
  const firstMondayOfYear = new Date(firstThursdayOfYear);
  firstMondayOfYear.setDate(firstThursdayOfYear.getDate() - 3);

  // Calculate the Monday of the requested week
  const mondayOfRequestedWeek = new Date(firstMondayOfYear);
  mondayOfRequestedWeek.setDate(
    firstMondayOfYear.getDate() + (weekNumber - 1) * 7
  );
  mondayOfRequestedWeek.setHours(0, 0, 0, 0);

  // Calculate the Sunday of the requested week
  const sundayOfRequestedWeek = new Date(mondayOfRequestedWeek);
  sundayOfRequestedWeek.setDate(mondayOfRequestedWeek.getDate() + 6);
  sundayOfRequestedWeek.setHours(23, 59, 59, 999);

  return { start: mondayOfRequestedWeek, end: sundayOfRequestedWeek };
}

/**
 * Formats a week range in a user-friendly way
 * @param weekKey - The week key in the format "YYYY-WWW"
 * @param locale - The locale for formatting ('fr' for French, 'en' for English)
 * @returns Formatted week range string
 */
export function formatWeekRange(weekKey: string, locale: string): string {
  const weekNumber = parseInt(weekKey.split("-W")[1]);
  const { start, end } = getWeekDatesFromKey(weekKey);

  const sameMonth = start.getMonth() === end.getMonth();

  if (locale === "fr") {
    const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const fullEndDate = dateFormatter.format(end);
    const fullStartDate = sameMonth
      ? start.getDate().toString()
      : dateFormatter.format(start).replace(` ${start.getFullYear()}`, "");

    return `du ${fullStartDate} au ${fullEndDate} (semaine ${weekNumber})`;
  } else {
    const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    });

    const dayFormatter = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
    });

    const monthFormatter = new Intl.DateTimeFormat("en-US", {
      month: "long",
    });

    if (sameMonth) {
      // Same month : "April 21-27, 2025 (week 17)"
      const monthYear = monthYearFormatter.format(start);
      const startDay = dayFormatter.format(start);
      const endDay = dayFormatter.format(end);

      return `${
        monthYear.split(" ")[0]
      } ${startDay} - ${endDay}, ${start.getFullYear()} (week ${weekNumber})`;
    } else {
      // Different months : "April 28 - May 4, 2025 (week 18)"
      const startMonth = monthFormatter.format(start);
      const startDay = dayFormatter.format(start);
      const endMonth = monthFormatter.format(end);
      const endDay = dayFormatter.format(end);

      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${end.getFullYear()} (week ${weekNumber})`;
    }
  }
}
