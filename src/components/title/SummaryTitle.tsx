"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAvailableWeeks } from "@/hooks/useAvailableWeeks";
import { formatWeekRange, getCurrentWeekKey } from "@/lib/utils/date";
import { useCurrentLocale, useScopedI18n } from "@locales/client";

interface SummaryTitleProps {
  selectedWeek: string;
  setSelectedWeek: (weekKey: string) => void;
}

export default function SummaryTitle({
  selectedWeek,
  setSelectedWeek,
}: SummaryTitleProps) {
  const tSummary = useScopedI18n("pages.summary");
  const currentLocale = useCurrentLocale();

  // Get a list of available weeks
  const weeks = useAvailableWeeks();

  // Memoize the key for the current week
  const currentWeekKey = useMemo(() => getCurrentWeekKey(), []);
  const isCurrentWeek = selectedWeek === currentWeekKey;

  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{tSummary("title")} </h1>
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
        <p className="text-muted-foreground">
          {isCurrentWeek ? tSummary("currentWeek") : tSummary("selectedWeek")}
        </p>

        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger>
            <SelectValue placeholder={tSummary("inputPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {weeks.map((weekKey) => (
              <SelectItem key={weekKey} value={weekKey}>
                {formatWeekRange(weekKey, currentLocale)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
