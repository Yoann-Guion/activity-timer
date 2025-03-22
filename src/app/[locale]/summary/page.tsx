"use client";

import { useMemo } from "react";
import { useCurrentLocale, useScopedI18n } from "../../../../locales/client";
import { getWeekEndDate, getWeekStartDate } from "@/lib/utils";
import { PageTransition } from "@/components/animation/PageTransition";

export default function Summary() {
  const tCommon = useScopedI18n("common.emptyState");
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
    <PageTransition>
      <div className="container mx-auto max-w-4xl">
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

        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-4">
            {tCommon("noActivities")}
          </h2>
          <p className="text-muted-foreground">{tCommon("createFirst")}</p>
        </div>
      </div>
    </PageTransition>
  );
}
