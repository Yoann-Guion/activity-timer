import Link from "next/link";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Play } from "lucide-react";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import { ActivityActions } from "../activity/ActivityActions";
import { SessionsTable } from "../activity/SessionsTable";
import { formatMinutes } from "@/lib/utils/time";
import {
  formatDate,
  formatWeekRange,
  getCurrentWeekKey,
} from "@/lib/utils/date";
import { useActivityStore } from "@/lib/useActivityStore";
import { useAvailableWeeksForActivity } from "@/hooks/useAvailableWeeksForActivity";
import { useCurrentLocale, useI18n, useScopedI18n } from "@locales/client";

interface ActivityDetailsCardProps {
  activity: ValidatedActivity;
  percentage: number;
  selectedWeek: string;
  setSelectedWeek: (weekKey: string) => void;
}

export default function ActivityDetailsCard({
  activity,
  percentage,
  selectedWeek,
  setSelectedWeek,
}: ActivityDetailsCardProps) {
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  const t = useI18n();
  const tDetails = useScopedI18n("pages.details");
  const tA11y = useScopedI18n("accessibility.weekSelector");

  const { activeTimer, startTimer } = useActivityStore();

  // Get a list of available weeks
  const weeks = useAvailableWeeksForActivity(activity.id);

  const currentWeekKey = useMemo(() => getCurrentWeekKey(), []);
  const selectedWeekText = useMemo(() => {
    return formatWeekRange(selectedWeek, currentLocale);
  }, [selectedWeek, currentLocale]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="relative overflow-hidden" role="region">
        <div
          className="absolute top-0 left-0 w-full h-2.5"
          style={{ backgroundColor: activity.color }}
          aria-hidden="true"
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
              <Progress
                value={percentage}
                className="h-2"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
              />
              <div
                className="flex justify-between text-xs text-muted-foreground mt-1"
                aria-live="polite"
              >
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
                  aria-label={`${t("common.actions.start")} ${activity.name}`}
                >
                  <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t("common.actions.start")}
                </Button>
              </div>

              <div className="mb-2">
                <Select
                  value={selectedWeek}
                  onValueChange={setSelectedWeek}
                  aria-label={tA11y("weekSelector")}
                  aria-describedby="week-status"
                >
                  <SelectTrigger
                    className="w-full md:w-80"
                    aria-label={tA11y("selectWeekButton")}
                  >
                    <SelectValue
                      placeholder={t("pages.summary.inputPlaceholder")}
                      aria-label={`${tA11y(
                        "selectedWeekLabel"
                      )}: ${selectedWeekText}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{tA11y("availableWeeks")}</SelectLabel>
                      {weeks.map((weekKey) => {
                        const formattedWeek = formatWeekRange(
                          weekKey,
                          currentLocale
                        );
                        const isCurrent = weekKey === currentWeekKey;
                        return (
                          <SelectItem
                            key={weekKey}
                            value={weekKey}
                            aria-label={
                              isCurrent
                                ? `${formattedWeek} (${tA11y(
                                    "currentWeekLabel"
                                  )})`
                                : formattedWeek
                            }
                            aria-current={isCurrent ? "date" : undefined}
                          >
                            {formattedWeek}

                            {isCurrent && (
                              <span className="sr-only">
                                ({tA11y("currentWeekLabel")})
                              </span>
                            )}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div aria-labelledby={`sessions-heading-${activity.name}`}>
                <SessionsTable activity={activity} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
