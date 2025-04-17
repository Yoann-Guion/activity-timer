"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActivityStore } from "@/lib/useActivityStore";
import { convertToTotalMinutes } from "@/lib/utils/time";
import { buildValidatedActivity } from "@/lib/validation/activity/activity.validators";
import { useScopedI18n } from "@locales/client";

export default function NewActivityForm() {
  const router = useRouter();
  const tCommon = useScopedI18n("common");
  const tNewActivity = useScopedI18n("pages.newActivity");

  // Activity store
  const { addActivity } = useActivityStore();

  // State for the inputs
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [color, setColor] = useState("#0090FF");

  // Function to handle form submission who adds a new activity
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert hours and minutes into minutes only
    const totalMinutes = convertToTotalMinutes(hours, minutes);

    // Display a toast if the total minutes is 0
    if (totalMinutes === 0) {
      toast.error(tNewActivity("form.timeMissing.title"), {
        description: tNewActivity("form.timeMissing.description"),
      });
      return;
    }

    // Create the object to validate
    const rawInput = {
      name,
      weeklyGoal: totalMinutes,
      color,
    };

    // Validate the input with Zod
    const newActivity = buildValidatedActivity(rawInput);

    if (!newActivity) {
      toast.error(tNewActivity("form.validationError.title"), {
        description: tNewActivity("form.validationError.description"),
      });
      return;
    }

    // Add the activity to the store and redirect to the home page
    addActivity(newActivity);
    router.push("/");
  };

  return (
    <div className="container mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>{tNewActivity("title")}</CardTitle>
          <CardDescription>{tNewActivity("description")} </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Activity name input */}
            <div className="space-y-2">
              <Label htmlFor="name">{tNewActivity("form.name.label")}</Label>
              <Input
                id="name"
                placeholder={tNewActivity("form.name.placeholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Weekly goal time inputs */}
            <div>
              <Label>{tNewActivity("form.weeklyGoal.label")}</Label>
              <div className="flex gap-2 mt-3">
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

            {/* Color picker */}
            <div className="space-y-2">
              <Label htmlFor="color">{tNewActivity("form.color.label")}</Label>
              <div className="flex gap-2 pb-2">
                <Input
                  id="color"
                  type="color"
                  className="grow w-full h-10 p-1"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/">
              <Button variant="outline">{tCommon("actions.cancel")}</Button>
            </Link>
            <Button type="submit">{tCommon("actions.create")}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
