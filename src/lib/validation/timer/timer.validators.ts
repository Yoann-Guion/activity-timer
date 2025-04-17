import { ValidatedTimer } from "./timer.types";
import { ValidatedSession } from "../activity/activity.types";
import { SessionSchema } from "../activity/activity.schemas";

/**
 * Converts a timer into a validated activity session
 * @param timer - Timer to convert
 * @param pausedTime - Total pause time in milliseconds
 * @returns Activity session validated or null if validation failed
 */
export function createSessionFromTimer(
  timer: ValidatedTimer,
  pausedTime: number
): ValidatedSession | null {
  try {
    if (!timer.endTime) {
      throw new Error("Le timer doit être terminé pour créer une session");
    }

    const sessionData = {
      id: timer.id,
      activityId: timer.activityId,
      startTime: timer.startTime,
      endTime: timer.endTime,
      duration: timer.duration / 60, // in minutes
      pausedTime: pausedTime / 1000, // in secondes
    };

    // Validate the session data
    return SessionSchema.parse(sessionData);
  } catch (error) {
    console.error(
      "Erreur lors de la création de la session depuis le timer:",
      error
    );
    return null;
  }
}
