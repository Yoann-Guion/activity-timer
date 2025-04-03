"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useActivityStore } from "@/lib/useActivityStore";
import { IActivity } from "@/@types/activity";
import { AlertTriangle } from "lucide-react";
import { useScopedI18n } from "../../../locales/client";

export function DeleteActivityDialog({
  activity,
  open,
  onOpenChange,
}: {
  activity: IActivity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const tActions = useScopedI18n("common.actions");
  const tDeleteActivity = useScopedI18n("pages.home.deleteActivity");
  const { deleteActivity } = useActivityStore();

  // Function to handle the deletion of the activity and close the dialog
  const handleDelete = () => {
    deleteActivity(activity.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            {tDeleteActivity("title")}
          </DialogTitle>
          <DialogDescription className="mt-2">
            {tDeleteActivity("description", { "activity.name": activity.name })}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {tActions("cancel")}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {tActions("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
