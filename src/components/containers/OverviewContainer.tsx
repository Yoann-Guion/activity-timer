"use client";

import ActivitiesOverview from "../cards/ActivitiesOverview";
import AchievedGoals from "../cards/AchievedGoals";
import TotalTimeDisplay from "../cards/TotalTimeDisplay";
import NoActivity from "../activity/NoActivity";
import { useWeeklySummary } from "@/hooks/useWeeklySummary";

interface OverviewContainerProps {
  selectedWeek: string;
}

export default function OverviewContainer({
  selectedWeek,
}: OverviewContainerProps) {
  const { activities } = useWeeklySummary(selectedWeek);

  return (
    <>
      {activities.length === 0 ? (
        <NoActivity />
      ) : (
        <div className="space-y-6">
          <ActivitiesOverview
            activities={activities}
            selectedWeek={selectedWeek}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <AchievedGoals activities={activities} />
            <TotalTimeDisplay activities={activities} />
          </div>
        </div>
      )}
    </>
  );
}
