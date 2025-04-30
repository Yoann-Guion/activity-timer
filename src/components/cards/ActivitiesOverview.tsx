import Link from "next/link";
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
import { useCurrentLocale, useScopedI18n } from "@locales/client";

interface ActivitiesOverviewProps {
  activities: ValidatedActivity[];
  selectedWeek: string;
}

export default function ActivitiesOverview({
  activities,
  selectedWeek,
}: ActivitiesOverviewProps) {
  const tSummary = useScopedI18n("pages.summary");
  const currentLocale = useCurrentLocale();

  return (
    <Card className="dark:bg-gray-900 dark:border-gray-800 bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="border-gray-800">
          {tSummary("overview.title")}
        </CardTitle>
        <CardDescription className="">
          {tSummary("overview.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 ">
        <div className="space-y-2">
          {activities.map((activity) => {
            const percentage = Math.min(
              100,
              (activity.weeklyProgress / activity.weeklyGoal) * 100
            );
            return (
              <Link
                href={`/${currentLocale}/activity/${activity.id}/${selectedWeek}`}
                key={activity.id}
                className="block"
              >
                <div
                  className="sm:mx-0 border dark:border-gray-800 border-gray-200 rounded-2xl p-2.5 
                         dark:hover:border-gray-700 hover:border-gray-300 
                         dark:hover:bg-gray-800 hover:bg-gray-100
                         hover:scale-[1.02] transition-all duration-200 
                         dark:bg-gray-900 bg-white cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: activity.color }}
                        />
                        <span>{activity.name}</span>
                        <div
                          className="ml-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ActivityActions
                            activity={activity}
                            selectedWeek={selectedWeek}
                            compact={true}
                          />
                        </div>
                      </div>

                      <span className="text-sm mt-3 text-gray-600 dark:text-gray-400">
                        {formatMinutes(activity.weeklyProgress)} / &nbsp;
                        {formatMinutes(activity.weeklyGoal)}
                      </span>
                    </div>
                    <Progress
                      value={percentage}
                      className="h-2 dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
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
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
