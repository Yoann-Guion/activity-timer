"use client";

import { useMemo } from "react";
import { getCurrentWeekKey } from "@/lib/utils/date";
import { useScopedI18n } from "@locales/client";
import WeekSelector from "../select/WeekSelector";

interface SummaryTitleProps {
  selectedWeek: string;
  setSelectedWeek: (weekKey: string) => void;
}

export default function SummaryTitle({
  selectedWeek,
  setSelectedWeek,
}: SummaryTitleProps) {
  const tSummary = useScopedI18n("pages.summary");

  // Memoize the key for the current week
  const currentWeekKey = useMemo(() => getCurrentWeekKey(), []);
  const isCurrentWeek = selectedWeek === currentWeekKey;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{tSummary("title")} </h1>
      <div
        className="flex flex-col items-start gap-2 sm:flex-row sm:items-center"
        role="region"
        aria-labelledby="summary-title"
      >
        <p className="text-muted-foreground" id="week-status">
          {isCurrentWeek ? tSummary("currentWeek") : tSummary("selectedWeek")}
        </p>

        <WeekSelector
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
        />
      </div>
    </div>
  );
}
