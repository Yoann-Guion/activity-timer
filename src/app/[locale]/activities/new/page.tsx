"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScopedI18n } from "../../../../../locales/client";
import { PageTransition } from "@/components/animation/PageTransition";
import { useState } from "react";
import { useActivityStore } from "@/lib/useActivityStore";
import { v4 as uuidv4 } from "uuid";

export default function NewActivity() {
  const router = useRouter();
  const tCommon = useScopedI18n("common");
  const tNewActivity = useScopedI18n("pages.newActivity");

  // Activity store
  const { addActivity } = useActivityStore();

  // State for the inputs
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [color, setColor] = useState("#F76B15");

  // Function to handle form submission who adds a new activity
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert hours and minutes to total minutes
    const totalMinutes =
      (Number.parseInt(hours) || 0) * 60 + (Number.parseInt(minutes) || 0);

    if (name.trim() && totalMinutes > 0) {
      addActivity({
        id: uuidv4(),
        name: name.trim(),
        weeklyGoal: totalMinutes,
        weeklyProgress: 0,
        color,
        createdAt: new Date(),
      });
      console.log("Activity added:", {
        name: name,
        weeklyGoal: totalMinutes,
      });
      router.push("/");
    }

    // todo : rajouter un message si le temps est 0
  };

  return (
    <PageTransition>
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
                <Label htmlFor="color">
                  {tNewActivity("form.color.label")}{" "}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    className="grow w-12 h-10 p-1"
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
    </PageTransition>
  );
}
