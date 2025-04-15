// Utility

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
