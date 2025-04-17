"use client";

import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ValidatedActivity } from "@/lib/validation/activity/activity.types";
import { formatMinutes } from "@/lib/utils/time";
import { formatDate } from "@/lib/utils/date";
import { useCurrentLocale, useScopedI18n } from "@locales/client";

interface SessionsTableProps {
  activity: ValidatedActivity;
}

export function SessionsTable({ activity }: SessionsTableProps) {
  const currentLocale = useCurrentLocale();
  const tTable = useScopedI18n("pages.details.table");

  return (
    <div className="mt-6">
      <Table>
        <TableCaption>
          {tTable("caption")}
          {activity.name}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>{tTable("start")} </TableHead>
            <TableHead>{tTable("end")} </TableHead>
            <TableHead className="text-right">{tTable("duration")} </TableHead>
            <TableHead className="text-right">{tTable("progress")} </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activity.sessions.map((session) => {
            // Calculate the percentage of the session duration compared to the weekly goal
            const sessionPercentage =
              (session.duration / activity.weeklyGoal) * 100;

            return (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(session.startTime, currentLocale)}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(session.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(session.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatMinutes(session.duration)}
                </TableCell>
                <TableCell className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Progress value={sessionPercentage} className="h-2" />
                    <span className="text-xs w-12 text-right">
                      {sessionPercentage.toFixed(0)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
