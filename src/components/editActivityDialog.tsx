"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActivityStore } from "@/lib/useActivityStore";
import { IActivity } from "@/@types/activity";
import { convertFromTotalMinutes, convertToTotalMinutes } from "@/lib/utils";
import { useScopedI18n } from "../../locales/client";

export function EditActivityDialog({
  activity,
  open,
  onOpenChange,
}: {
  activity: IActivity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const tCommon = useScopedI18n("common");
  const tEditActivity = useScopedI18n("pages.home.editActivity");
  const { updateActivity } = useActivityStore();

  // State for the inputs
  const [name, setName] = useState(activity.name);
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [color, setColor] = useState(activity.color);

  // Function for filling in fields with information about the activity to be modified
  useEffect(() => {
    if (open) {
      const { hours: hoursValue, minutes: minutesValue } =
        convertFromTotalMinutes(activity.weeklyGoal);

      setHours(hoursValue);
      setMinutes(minutesValue);
      setName(activity.name);
      setColor(activity.color);
    }
  }, [activity, open]);

  const handleSubmit = () => {
    // Convert hours and minutes into minutes only
    const weeklyGoal = convertToTotalMinutes(hours, minutes);

    // Update the activity
    updateActivity({
      ...activity,
      name,
      weeklyGoal,
      color,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tEditActivity("title")}</DialogTitle>
          <DialogDescription>{tEditActivity("description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {tEditActivity("name")}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">{tEditActivity("weeklyGoal")}</Label>
            <div className="col-span-3 flex gap-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="hours">{tCommon("time.hours")}</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="168"
                  placeholder="0"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="minutes">{tCommon("time.minutes")}</Label>
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="0"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">{tEditActivity("color")}</Label>
            <Input
              id="color"
              type="color"
              className="col-span-3 h-10 p-1"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tCommon("actions.cancel")}
          </Button>
          <Button onClick={handleSubmit}>{tCommon("actions.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
