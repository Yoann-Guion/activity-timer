import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import { ActivityActions } from "../activity/ActivityActions";
import { SessionsTable } from "../activity/SessionsTable";
import { Play } from "lucide-react";
import Link from "next/link";
import {
  useCurrentLocale,
  useI18n,
  useScopedI18n,
} from "../../../locales/client";
import { formatDate, formatMinutes } from "@/lib/utils";
import { useActivityStore } from "@/lib/useActivityStore";

interface ActivityDetailsCardProps {
  activity: ValidatedActivity;
  percentage: number;
}

export default function ActivityDetailsCard({
  activity,
  percentage,
}: ActivityDetailsCardProps) {
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  const t = useI18n();
  const tDetails = useScopedI18n("pages.details");

  const { activeTimer, startTimer } = useActivityStore();

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-2.5"
          style={{ backgroundColor: activity.color }}
        />
        <CardHeader className="pt-1 flex justify-between items-center">
          <CardTitle className="flex gap-2">
            {activity.name}
            <div className="text-xs text-muted-foreground pt-0.5">
              {tDetails("createdAt")}
              {formatDate(activity.createdAt, currentLocale)}
            </div>
          </CardTitle>
          <div className="flex items-end space-x-2">
            <div className="ml-2">
              <ActivityActions activity={activity} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>{tDetails("totalProgress")} </span>
                <span>
                  {formatMinutes(activity.weeklyProgress)} / &nbsp;
                  {formatMinutes(activity.weeklyGoal)}
                </span>
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>
                  {percentage >= 100
                    ? t("pages.summary.goalReached")
                    : `${Math.round(percentage)}% ${t(
                        "pages.summary.goalProgress"
                      )}`}
                </span>
                <span>
                  {percentage >= 100
                    ? `+${formatMinutes(
                        activity.weeklyProgress - activity.weeklyGoal
                      )}`
                    : `${formatMinutes(
                        activity.weeklyGoal - activity.weeklyProgress
                      )} ${t("pages.summary.remaining")}`}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {tDetails("sessionHistory")}
                </h3>
                <Button
                  onClick={() => {
                    if (activeTimer) {
                      if (activeTimer.activityId === activity.id) {
                        router.push(`/${currentLocale}/timer`);
                        return;
                      }
                      toast.error(
                        <div>
                          {t("pages.home.timerAlreadyRunning.title")}
                          <br />
                          <Link
                            href={`/${currentLocale}/timer`}
                            className="block mt-2 text-blue-500 font-medium hover:underline"
                          >
                            {t("pages.home.timerAlreadyRunning.link")}
                          </Link>
                        </div>
                      );
                      return;
                    }
                    startTimer(activity.id);
                    router.push(`/${currentLocale}/timer`);
                  }}
                  size="sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {t("common.actions.start")}
                </Button>
              </div>

              <SessionsTable activity={activity} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
