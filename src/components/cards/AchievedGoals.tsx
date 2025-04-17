import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import { useScopedI18n } from "@locales/client";

interface AchievedGoalsProps {
  activities: ValidatedActivity[];
}

export default function AchievedGoals({ activities }: AchievedGoalsProps) {
  const tSummary = useScopedI18n("pages.summary");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tSummary("stats.goalsReached.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <span className="text-4xl font-bold">
            {activities.filter((a) => a.weeklyProgress >= a.weeklyGoal).length}
          </span>
          <span className="text-xl text-muted-foreground">
            &nbsp;/ {activities.length}
          </span>
          <p className="text-muted-foreground mt-2">
            {tSummary("stats.goalsReached.completed")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
