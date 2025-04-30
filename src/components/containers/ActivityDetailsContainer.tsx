"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";

import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import NoActivity from "../activity/NoActivity";
import ActivityDetailsCard from "../cards/ActivityDetailsCard";
import { getCurrentWeekKey } from "@/lib/utils/date";
import { useWeeklySummary } from "@/hooks/useWeeklyHistory";
import { validateWeekKey } from "@/lib/validation/history/history.validators";

export default function ActivityDetailsContainer() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the activity id from the URL
  const activityId = params.activityId as string;
  // Get the week key from the URL and validate it
  const weekKeyFromParams = searchParams.get("week");
  const validatedWeekKey = validateWeekKey(weekKeyFromParams);

  // State to manage the selected week
  const [selectedWeek, setSelectedWeek] = useState(
    validatedWeekKey ?? getCurrentWeekKey()
  );

  // State for the activity
  const [activity, setActivity] = useState<ValidatedActivity | null>(null);
  // State for the percentage of the progress bar
  const [percentage, setPercentage] = useState(0);

  // Fetch the summary of the selected week
  const { activities } = useWeeklySummary(selectedWeek);

  // Fetch the activity details from the store
  useEffect(() => {
    // Find the activity by its ID
    const foundActivity = activities.find((act) => act.id === activityId);

    if (foundActivity) {
      setActivity(foundActivity);
      // Calculate percentage and store it in the state
      setPercentage(
        Math.min(
          100,
          (foundActivity.weeklyProgress / foundActivity.weeklyGoal) * 100
        )
      );
    } else {
      setActivity(null);
      setPercentage(0);
    }
  }, [activityId, activities]);

  const handleWeekChange = (newWeekKey: string) => {
    setSelectedWeek(newWeekKey);
    const params = new URLSearchParams(searchParams.toString());
    params.set("week", newWeekKey);

    router.replace(`${pathname}?${params.toString()}`);
  };

  console.log("activity", activity);
  console.log("weekKeyFromParams", weekKeyFromParams);
  console.log("validatedWeekKey", validatedWeekKey);
  console.log("selectedWeek", selectedWeek);

  return (
    <>
      {!activity ? (
        <NoActivity />
      ) : (
        <ActivityDetailsCard
          activity={activity}
          percentage={percentage}
          selectedWeek={selectedWeek}
          setSelectedWeek={handleWeekChange}
        />
      )}
    </>
  );
}
