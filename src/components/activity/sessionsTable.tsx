"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { IActivity } from "@/@types/activity";
import { formatDate, formatMinutes } from "@/lib/utils";
import { useCurrentLocale } from "../../../locales/client";

interface SessionsTableProps {
  activity: IActivity;
}

export function SessionsTable({ activity }: SessionsTableProps) {
  const currentLocale = useCurrentLocale();

  return (
    <div className="mt-6">
      <Table>
        <TableCaption>
          Historique des sessions pour l'activité {activity.name}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Début</TableHead>
            <TableHead>Fin</TableHead>
            <TableHead className="text-right">Durée</TableHead>
            <TableHead className="text-right">Progression</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activity.sessions.map((session) => {
            // Calculer le pourcentage que cette session représente par rapport à l'objectif
            const sessionPercentage =
              (session.duration / activity.weeklyGoal) * 100;

            return (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(session.startTime, currentLocale)}
                  </div>
                </TableCell>
                <TableCell>{session.startTime.toLocaleTimeString()}</TableCell>
                <TableCell>{session.endTime.toLocaleTimeString()}</TableCell>
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
