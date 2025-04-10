"use client";

import ActivitiesOverview from "../cards/ActivitiesOverview";
import AchievedGoals from "../cards/AchievedGoals";
import TotalTimeDisplay from "../cards/TotalTimeDisplay";
import NoActivity from "../activity/NoActivity";
import { useActivityStore } from "@/lib/useActivityStore";

export default function OverviewContainer() {
  const { activities } = useActivityStore();

  return (
    <>
      {activities.length === 0 ? (
        <NoActivity />
      ) : (
        <div className="space-y-6">
          <ActivitiesOverview activities={activities} />

          <div className="grid gap-4 md:grid-cols-2">
            <AchievedGoals activities={activities} />
            <TotalTimeDisplay activities={activities} />
          </div>
        </div>
      )}
    </>
  );
}
