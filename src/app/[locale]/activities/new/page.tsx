"use client";

import Link from "next/link";
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

export default function NewActivity() {
  const tCommon = useScopedI18n("common");
  const tNewActivity = useScopedI18n("pages.newActivity");

  return (
    <div className="container mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>{tNewActivity("title")}</CardTitle>
          <CardDescription>{tNewActivity("description")} </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Activity name input */}
          <div className="space-y-2">
            <Label htmlFor="name">{tNewActivity("form.name.label")}</Label>
            <Input
              id="name"
              placeholder={tNewActivity("form.name.placeholder")}
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
                />
              </div>
            </div>
          </div>

          {/* Color picker */}
          <div className="space-y-2">
            <Label htmlFor="color">{tNewActivity("form.color.label")} </Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                defaultValue="#3b82f6"
                className="grow w-12 h-10 p-1"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">{tCommon("actions.cancel")}</Button>
          </Link>
          <Button>{tCommon("actions.create")}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
