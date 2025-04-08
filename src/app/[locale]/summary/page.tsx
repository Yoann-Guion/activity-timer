"use client";

import { useMemo } from "react";
import { useCurrentLocale, useScopedI18n } from "../../../../locales/client";
import { formatMinutes, getWeekEndDate, getWeekStartDate } from "@/lib/utils";
import { PageTransition } from "@/components/animation/PageTransition";
import { useActivityStore } from "@/lib/useActivityStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ActivityActions } from "@/components/activityActions";

export default function Summary() {
  const tCommon = useScopedI18n("common.emptyState");
  const tSummary = useScopedI18n("pages.summary");
  const currentLocale = useCurrentLocale();
  const { activities } = useActivityStore();

  // Calculate week start and end dates
  const weekStart = useMemo(() => getWeekStartDate(), []);
  const weekEnd = useMemo(() => getWeekEndDate(), []);

  /**
   * Format date to display in a user-friendly way
   * Example: "15 mars"
   */
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(currentLocale, {
      day: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <PageTransition>
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{tSummary("title")} </h1>
          <p className="text-muted-foreground">
            {tSummary("currentWeek")}&nbsp;:&nbsp;
            {tSummary("dateRange", {
              start: formatDate(weekStart),
              end: formatDate(weekEnd),
            })}
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">
              {tCommon("noActivities")}
            </h2>
            <p className="text-muted-foreground">{tCommon("createFirst")}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{tSummary("overview.title")}</CardTitle>
                <CardDescription>
                  {tSummary("overview.description")}
                </CardDescription>
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
                              <ActivityActions
                                activity={activity}
                                compact={true}
                              />
                            </div>
                          </div>

                          <span className="text-sm">
                            {formatMinutes(activity.weeklyProgress)} /
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

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{tSummary("stats.goalsReached.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-4">
                    <span className="text-4xl font-bold">
                      {
                        activities.filter(
                          (a) => a.weeklyProgress >= a.weeklyGoal
                        ).length
                      }
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
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
