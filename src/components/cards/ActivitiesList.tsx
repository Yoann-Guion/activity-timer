"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Play, RotateCw } from "lucide-react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import NoActivity from "../activity/NoActivity";
import { ActivityActions } from "../activity/ActivityActions";
import { useActivityStore } from "@/lib/useActivityStore";
import { formatMinutes } from "@/lib/utils/time";
import { useCurrentLocale, useScopedI18n } from "@locales/client";
import { ActivityCardSkeleton } from "../skeleton/ActivityCardSkeleton";

export default function ActivitiesList() {
  const router = useRouter();
  const tHome = useScopedI18n("pages.home");
  const tCommon = useScopedI18n("common.actions");
  const currentLocale = useCurrentLocale();

  const { activities, startTimer, activeTimer, isRehydrated } =
    useActivityStore();

  return !isRehydrated ? (
    <div className="grid gap-4 md:grid-cols-2">
      <ActivityCardSkeleton />
      <ActivityCardSkeleton />
      <ActivityCardSkeleton />
      <ActivityCardSkeleton />
    </div>
  ) : (
    <>
      {activities.length === 0 ? (
        <NoActivity />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {activities.map((activity) => (
            <Card key={activity.id} className="relative overflow-hidden">
              <div
                className="absolute top-0 left-0 w-full h-2.5"
                style={{ backgroundColor: activity.color }}
              />
              <CardHeader className="pt-1 flex justify-between items-center">
                <CardTitle>{activity.name}</CardTitle>
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
                      <span>{tHome("weeklyProgress")}</span>
                      <span>
                        {formatMinutes(activity.weeklyProgress)} / &nbsp;
                        {formatMinutes(activity.weeklyGoal)}
                      </span>
                    </div>
                    <Progress
                      value={
                        (activity.weeklyProgress / activity.weeklyGoal) * 100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    if (activeTimer) {
                      if (activeTimer.activityId === activity.id) {
                        router.push(`/${currentLocale}/timer`);
                        return;
                      }
                      toast.error(
                        <div>
                          {tHome("timerAlreadyRunning.title")}
                          <br />
                          <Link
                            href={`/${currentLocale}/timer`}
                            className="block mt-2 text-blue-500 font-medium hover:underline"
                          >
                            {tHome("timerAlreadyRunning.link")}
                          </Link>
                        </div>
                      );
                      return;
                    }
                    startTimer(activity.id);
                    router.push(`/${currentLocale}/timer`);
                  }}
                >
                  {activeTimer?.activityId === activity.id ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      {tCommon("inProgress")}
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      {tCommon("start")}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
