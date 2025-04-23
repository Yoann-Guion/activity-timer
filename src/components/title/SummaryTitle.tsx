"use client";

import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  const tA11y = useScopedI18n("accessibility.weekSelector");
  const currentLocale = useCurrentLocale();

  // Get a list of available weeks
  const weeks = useAvailableWeeks();

  // Memoize the key for the current week
  const currentWeekKey = useMemo(() => getCurrentWeekKey(), []);
  const isCurrentWeek = selectedWeek === currentWeekKey;

  const selectedWeekText = useMemo(() => {
    return formatWeekRange(selectedWeek, currentLocale);
  }, [selectedWeek, currentLocale]);

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

        <Select
          value={selectedWeek}
          onValueChange={setSelectedWeek}
          aria-label={tA11y("weekSelector")}
          aria-describedby="week-status"
        >
          <SelectTrigger aria-label={tA11y("selectWeekButton")}>
            <SelectValue
              placeholder={tSummary("inputPlaceholder")}
              aria-label={`${tA11y("selectedWeekLabel")}: ${selectedWeekText}`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{tA11y("availableWeeks")}</SelectLabel>
              {weeks.map((weekKey) => {
                const formattedWeek = formatWeekRange(weekKey, currentLocale);
                const isCurrent = weekKey === currentWeekKey;

                return (
                  <SelectItem
                    key={weekKey}
                    value={weekKey}
                    aria-label={
                      isCurrent
                        ? `${formattedWeek} (${tA11y("currentWeekLabel")})`
                        : formattedWeek
                    }
                    aria-current={isCurrent ? "date" : undefined}
                  >
                    {formattedWeek}
                    {isCurrent && (
                      <span className="sr-only">
                        ({tA11y("currentWeekLabel")})
                      </span>
                    )}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
