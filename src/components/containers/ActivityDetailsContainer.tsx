"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import NoActivity from "../activity/NoActivity";
import ActivityDetailsCard from "../cards/ActivityDetailsCard";
import { getCurrentWeekKey } from "@/lib/utils/date";
import { useWeeklySummary } from "@/hooks/useWeeklyHistory";

export default function ActivityDetailsContainer() {
  const params = useParams();

  // State to manage the selected week
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekKey());
  // State for the activity
  const [activity, setActivity] = useState<ValidatedActivity | null>(null);
  // State for the percentage of the progress bar
  const [percentage, setPercentage] = useState(0);

  // Fetch the summary of the selected week
  const { activities } = useWeeklySummary(selectedWeek);

  // Get the activity id from the URL
  const activityId = params.activityId as string;

  useEffect(() => {
    // Find the activity by ID
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

  return (
    <>
      {!activity ? (
        <NoActivity />
      ) : (
        <ActivityDetailsCard
          activity={activity}
          percentage={percentage}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
      )}
    </>
  );
}
