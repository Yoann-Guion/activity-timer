"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IActivity } from "@/@types/activity";
import { PageTransition } from "@/components/animation/PageTransition";
import { EditActivityDialog } from "@/components/dialog/editActivityDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActivityStore } from "@/lib/useActivityStore";
import { Play, FilePen, Trash2 } from "lucide-react";
import { formatDate, formatMinutes } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { SessionsTable } from "@/components/activity/sessionsTable";
import { useCurrentLocale, useScopedI18n } from "../../../../../locales/client";
import { DeleteActivityDialog } from "@/components/dialog/deleteActivityDialog";
import Link from "next/link";

export default function ActivityDetails() {
  const params = useParams();
  const router = useRouter();
  const currentLocale = useCurrentLocale();
  const tSummary = useScopedI18n("pages.summary");
  const tHome = useScopedI18n("pages.home");

  const { activities, activeTimer, startTimer } = useActivityStore();

  // State for the activity
  const [activity, setActivity] = useState<IActivity | null>(null);
  // State for the percentage of the progress bar
  const [percentage, setPercentage] = useState(0);
  // States for the update dialog and delete confirmation
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Get the activity Id from the URL
  const activityId = params.activityId as string;

  useEffect(() => {
    // Find the activity by ID
    const foundActivity = activities.find((act) => act.id === activityId);

    if (foundActivity) {
      setActivity(foundActivity);
      // Calculate percentage and store it in the state
      setPercentage(
        Math.min(
          100,
          (foundActivity.weeklyProgress / foundActivity.weeklyGoal) * 100
        )
      );
    } else {
      setActivity(null);
      setPercentage(0);
    }
  }, [activityId, activities]);

  // todo: add a loading state

  if (!activity) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-medium mb-2">Activité non trouvée</h2>
        <p className="text-gray-500 mb-4">
          Cette activité n'existe pas ou a été supprimée.
        </p>
        <Button onClick={() => router.push("/")}>Retourner à l'accueil</Button>
      </div>
    );
  }

  return (
    <PageTransition>
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
                créé le {formatDate(activity.createdAt, currentLocale)}
              </div>
            </CardTitle>
            <div className="flex items-end space-x-2">
              <button
                onClick={() => setUpdateDialogOpen(true)}
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <FilePen className="h-5 w-5" />
              </button>

              <EditActivityDialog
                activity={activity}
                open={updateDialogOpen}
                onOpenChange={setUpdateDialogOpen}
              />

              <button
                onClick={() => setDeleteDialogOpen(true)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>

              <DeleteActivityDialog
                activity={activity}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progression totale</span>
                  <span>
                    {formatMinutes(activity.weeklyProgress)} / &nbsp;
                    {formatMinutes(activity.weeklyGoal)}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
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

              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Historique des sessions
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
                    size="sm"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Démarrer
                  </Button>
                </div>

                <SessionsTable activity={activity} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
