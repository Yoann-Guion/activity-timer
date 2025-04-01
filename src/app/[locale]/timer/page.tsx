"use client";

import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScopedI18n } from "../../../../locales/client";
import { PageTransition } from "@/components/animation/PageTransition";
import { useActivityStore } from "@/lib/useActivityStore";
import { useState } from "react";
import { formatMinutes } from "@/lib/utils";

export default function Timer() {
  const tCommon = useScopedI18n("common");
  const tTimer = useScopedI18n("pages.timer");

  // State for the selected activity
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");

  const { activities } = useActivityStore();

  return (
    <PageTransition>
      <div className="container mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>{tTimer("title")}</CardTitle>
            <CardDescription>{tTimer("description")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Activity selection view */}
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
                          {activity.name}
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
                        {
                          activities.find((a) => a.id === selectedActivityId)
                            ?.name
                        }
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Objectif:{" "}
                        {formatMinutes(
                          activities.find((a) => a.id === selectedActivityId)
                            ?.weeklyGoal || 0
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Progression</p>
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
          </CardContent>
          <CardFooter className="flex justify-center">
            {/* Start button - disabled for now */}
            <Button size="lg" disabled>
              {tCommon("actions.start")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
}
