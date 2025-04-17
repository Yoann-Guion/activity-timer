import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ActivityActions } from "@/components/activity/ActivityActions";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import { formatMinutes } from "@/lib/utils/time";
import { useScopedI18n } from "@locales/client";

interface ActivitiesOverviewProps {
  activities: ValidatedActivity[];
}

export default function ActivitiesOverview({
  activities,
}: ActivitiesOverviewProps) {
  const tSummary = useScopedI18n("pages.summary");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tSummary("overview.title")}</CardTitle>
        <CardDescription>{tSummary("overview.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => {
            const percentage = Math.min(
              100,
              (activity.weeklyProgress / activity.weeklyGoal) * 100
            );
            return (
              <div key={activity.id} className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: activity.color }}
                    />
                    <span>{activity.name}</span>
                    <div className="ml-2">
                      <ActivityActions activity={activity} compact={true} />
                    </div>
                  </div>

                  <span className="text-sm">
                    {formatMinutes(activity.weeklyProgress)} / &nbsp;
                    {formatMinutes(activity.weeklyGoal)}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {percentage >= 100
                      ? tSummary("goalReached")
                      : `${Math.round(percentage)}% ${tSummary(
                          "goalProgress"
                        )}`}
                  </span>
                  <span>
                    {percentage >= 100
                      ? `+${formatMinutes(
                          activity.weeklyProgress - activity.weeklyGoal
                        )}`
                      : `${formatMinutes(
                          activity.weeklyGoal - activity.weeklyProgress
                        )} ${tSummary("remaining")}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
