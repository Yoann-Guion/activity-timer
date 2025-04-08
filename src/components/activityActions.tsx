import { Ellipsis, Info, FilePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IActivity } from "@/@types/activity";
import { EditActivityDialog } from "./dialog/editActivityDialog";
import { DeleteActivityDialog } from "./dialog/deleteActivityDialog";
import { useCurrentLocale } from "../../locales/client";

interface ActivityActionsProps {
  activity: IActivity;
  compact?: boolean; // Indicates if the component should be in compact mode
}

export function ActivityActions({
  activity,
  compact = false,
}: ActivityActionsProps) {
  const pathname = usePathname();
  const currentLocale = useCurrentLocale();

  // States for the update dialog and delete confirmation
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Check if the current page is the activity detail page
  const isDetailPage = pathname.includes(`/activity/${activity.id}`);

  // Render details link (only if we're not already on the details page)
  const renderDetailsLink = () => {
    if (isDetailPage) return null;

    return compact ? (
      <DropdownMenuItem asChild>
        <Link
          href={`/${currentLocale}/activity/${activity.id}`}
          className="flex items-center"
        >
          <Info className="mr-2 h-4 w-4" />
          <span>Détails</span>
        </Link>
      </DropdownMenuItem>
    ) : (
      <Link
        href={`/${currentLocale}/activity/${activity.id}`}
        className="text-gray-400 hover:text-blue-500 transition-colors"
      >
        <Info className="h-5 w-5" />
      </Link>
    );
  };

  //  Compact version with dropdown menu
  if (compact) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="right">
            {renderDetailsLink()}
            <DropdownMenuItem onClick={() => setUpdateDialogOpen(true)}>
              <FilePen className="mr-2 h-4 w-4" />
              <span>Modifier</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteDialogOpen(true)}
              className="text-red-500 focus:text-red-500"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Supprimer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dialog */}
        <EditActivityDialog
          activity={activity}
          open={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        />
        <DeleteActivityDialog
          activity={activity}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      </>
    );
  }

  // Default version with buttons
  return (
    <div className="flex items-end space-x-2">
      {renderDetailsLink()}

      <button
        onClick={() => setUpdateDialogOpen(true)}
        className="text-gray-400 hover:text-green-500 transition-colors"
      >
        <FilePen className="h-5 w-5" />
      </button>

      <button
        onClick={() => setDeleteDialogOpen(true)}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      {/* Dialog */}
      <EditActivityDialog
        activity={activity}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />
      <DeleteActivityDialog
        activity={activity}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
}
