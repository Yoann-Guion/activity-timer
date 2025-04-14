"use client";

import { useRouter, usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
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
import { useScopedI18n } from "../../../locales/client";

export function DeleteActivityDialog({
  activity,
  open,
  onOpenChange,
}: {
  activity: ValidatedActivity;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const tActions = useScopedI18n("common.actions");
  const tDeleteActivity = useScopedI18n("pages.home.deleteActivity");
  const { deleteActivity } = useActivityStore();

  // Function to handle the deletion of the activity and close the dialog
  const handleDelete = () => {
    deleteActivity(activity.id);
    onOpenChange(false);

    // Redirect to the home page if the current path is not the home page
    if (pathname !== "/") {
      router.push("/");
    }
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
