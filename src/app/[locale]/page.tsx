"use client";

import Link from "next/link";
import { Play, PlusCircle, Trash2, FilePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentLocale, useScopedI18n } from "../../../locales/client";
import { PageTransition } from "@/components/animation/PageTransition";
import { useActivityStore } from "@/lib/useActivityStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatMinutes } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { EditActivityDialog } from "@/components/dialog/editActivityDialog";
import { DeleteActivityDialog } from "@/components/dialog/deleteActivityDialog";

export default function Home() {
  const router = useRouter();
  const tCommon = useScopedI18n("common");
  const tHome = useScopedI18n("pages.home");
  const currentLocale = useCurrentLocale();

  // States for the update dialog and delete confirmation
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { activities, startTimer, activeTimer } = useActivityStore();

  return (
    <PageTransition>
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{tHome("title")}</h1>
          <Link href={`/${currentLocale}/activities/new`}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {tHome("newActivity")}
            </Button>
          </Link>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">
              {tCommon("emptyState.noActivities")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {tCommon("emptyState.createFirst")}
            </p>
            <Link href={`/${currentLocale}/activities/new`}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                {tHome("createFirst")}
              </Button>
            </Link>
          </div>
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
                    <Play className="mr-2 h-4 w-4" />
                    Démarrer
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
