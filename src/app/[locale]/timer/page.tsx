"use client";

import { useEffect, useState } from "react";
import { Clock, Pause, Play, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageTransition } from "@/components/animation/PageTransition";
import { useActivityStore } from "@/lib/useActivityStore";
import { formatMinutes, formatTime } from "@/lib/utils";
import { useScopedI18n } from "../../../../locales/client";

export default function Timer() {
  const tCommon = useScopedI18n("common");
  const tTimer = useScopedI18n("pages.timer");

  const {
    activities,
    startTimer,
    activeTimer,
    pauseTimer,
    resumeTimer,
    pauseStartTime,
    totalPausedTime,
    stopTimer,
  } = useActivityStore();
  // State for the selected activity
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  // State for the elapsed time
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Link the selected activity to the active timer
  const activeActivity = activeTimer
    ? activities.find((a) => a.id === activeTimer.activityId)
    : null;

  // Effect to update the elapsed time every second
  useEffect(() => {
    if (!activeTimer) {
      setElapsedTime(0);
      return;
    }

    // If the timer is paused, do not update the elapsed time
    if (pauseStartTime !== null) return;

    // Calculate the elapsed time in seconds
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const startTime = new Date(activeTimer.startTime).getTime();

      // Calculer le temps écoulé en soustrayant le temps total de pause
      const elapsed = Math.floor((now - startTime - totalPausedTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTimer, pauseStartTime, totalPausedTime]);

  // Function to handle the pause/resume button
  const togglePause = () => {
    if (pauseStartTime === null) {
      pauseTimer();
    } else {
      resumeTimer();
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{tTimer("title")}</CardTitle>
            <CardDescription>{tTimer("description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeTimer ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: activeActivity?.color }}
                    />

                    <span>{activeActivity?.name}</span>
                  </div>
                </h2>
                <div className="text-5xl font-mono font-bold my-8">
                  {formatTime(elapsedTime)}
                </div>
                <p className="text-muted-foreground">
                  {tTimer("sessionStarted")}&nbsp;
                  {new Date(activeTimer.startTime).toLocaleTimeString()}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="activity-select"
                    className="text-sm font-medium"
                  >
                    {tTimer("selectActivity")}
                  </label>

                  <Select
                    value={selectedActivityId}
                    onValueChange={setSelectedActivityId}
                  >
                    <SelectTrigger id="activity-select">
                      <SelectValue placeholder={tTimer("selectActivity")} />
                    </SelectTrigger>
                    <SelectContent>
                      {activities.length > 0 ? (
                        activities.map((activity) => (
                          <SelectItem key={activity.id} value={activity.id}>
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: activity.color }}
                              />

                              <span>{activity.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="placeholder">
                          {tTimer("noActivities")}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {selectedActivityId && (
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{
                                backgroundColor: activities.find(
                                  (a) => a.id === selectedActivityId
                                )?.color,
                              }}
                            />
                            <span>
                              {
                                activities.find(
                                  (a) => a.id === selectedActivityId
                                )?.name
                              }
                            </span>
                          </div>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Objectif :{" "}
                          {formatMinutes(
                            activities.find((a) => a.id === selectedActivityId)
                              ?.weeklyGoal || 0
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{tTimer("progress")}</p>
                        <p className="font-medium">
                          {formatMinutes(
                            activities.find((a) => a.id === selectedActivityId)
                              ?.weeklyProgress || 0
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!selectedActivityId && (
                  <div className="text-center py-8">
                    <Clock className="mx-auto h-16 w-16 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">
                      {tTimer("chooseActivity")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center gap-4">
            {activeTimer ? (
              <>
                <Button variant="outline" size="lg" onClick={togglePause}>
                  {pauseStartTime !== null ? (
                    <>
                      <Play className="mr-2 h-4 w-4" />{" "}
                      {tCommon("actions.resume")}
                    </>
                  ) : (
                    <>
                      <Pause className="mr-2 h-4 w-4" />{" "}
                      {tCommon("actions.pause")}
                    </>
                  )}
                </Button>
                <Button variant="destructive" size="lg" onClick={stopTimer}>
                  <Square className="mr-2 h-4 w-4" />
                  {tCommon("actions.stop")}
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                onClick={() =>
                  selectedActivityId && startTimer(selectedActivityId)
                }
                disabled={!selectedActivityId}
              >
                <Play className="mr-2 h-4 w-4" />
                {tCommon("actions.start")}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
}
