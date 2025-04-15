"use client";

import { useMemo } from "react";
import { getWeekEndDate, getWeekStartDate } from "@/lib/utils/date";
import { useCurrentLocale, useScopedI18n } from "../../../locales/client";

export default function SummaryTitle() {
  const tSummary = useScopedI18n("pages.summary");
  const currentLocale = useCurrentLocale();

  // Calculate week start and end dates
  const weekStart = useMemo(() => getWeekStartDate(), []);
  const weekEnd = useMemo(() => getWeekEndDate(), []);

  /**
   * Format date to display in a user-friendly way
   * Example: "15 mars"
   */
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(currentLocale, {
      day: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{tSummary("title")} </h1>
      <p className="text-muted-foreground">
        {tSummary("currentWeek")}&nbsp;:&nbsp;
        {tSummary("dateRange", {
          start: formatDate(weekStart),
          end: formatDate(weekEnd),
        })}
      </p>
    </div>
  );
}
