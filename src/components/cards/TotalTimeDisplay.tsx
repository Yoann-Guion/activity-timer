import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import { formatMinutes } from "@/lib/utils";
import { useScopedI18n } from "../../../locales/client";

interface TotalTimeDisplayProps {
  activities: ValidatedActivity[];
}

export default function TotalTimeDisplay({
  activities,
}: TotalTimeDisplayProps) {
  const tSummary = useScopedI18n("pages.summary");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{tSummary("stats.totalTime.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <span className="text-4xl font-bold">
            {formatMinutes(
              activities.reduce(
                (acc, activity) => acc + activity.weeklyProgress,
                0
              )
            )}
          </span>
          <p className="text-muted-foreground mt-2">
            {tSummary("stats.totalTime.thisWeek")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
