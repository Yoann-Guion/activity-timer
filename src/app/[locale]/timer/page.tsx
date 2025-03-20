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

export default function Timer() {
  const tCommon = useScopedI18n("common");
  const tTimer = useScopedI18n("pages.timer");

  return (
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
              <label htmlFor="activity-select" className="text-sm font-medium">
                {tTimer("selectActivity")}
              </label>
              <Select>
                <SelectTrigger id="activity-select">
                  <SelectValue placeholder={tTimer("selectActivity")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">
                    {tTimer("noActivities")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-center py-8">
              <Clock className="mx-auto h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                {tTimer("chooseActivity")}
              </p>
            </div>
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
  );
}
