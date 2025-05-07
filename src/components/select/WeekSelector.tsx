"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { formatWeekRange, getCurrentWeekKey } from "@/lib/utils/date";
import { useCurrentLocale, useI18n, useScopedI18n } from "@locales/client";
import { useAvailableWeeks } from "@/hooks/useAvailableWeeks";
import { useAvailableWeeksForActivity } from "@/hooks/useAvailableWeeksForActivity";

interface WeekSelectorProps {
  selectedWeek: string;
  setSelectedWeek: (weekKey: string) => void;
}

export default function WeekSelector({
  selectedWeek,
  setSelectedWeek,
}: WeekSelectorProps) {
  const params = useParams();
  const currentLocale = useCurrentLocale();
  const t = useI18n();
  const tA11y = useScopedI18n("accessibility.weekSelector");

  // Memoize the key for the current week
  const currentWeekKey = useMemo(() => getCurrentWeekKey(), []);

  // Get the activityId from params
  const { activityId } = params as { activityId?: string };

  const weeksForActivity = useAvailableWeeksForActivity(activityId || "");
  const allAvailableWeeks = useAvailableWeeks();

  // Get a list of available weeks
  const weeks = useMemo(() => {
    return activityId ? weeksForActivity : allAvailableWeeks;
  }, [activityId, weeksForActivity, allAvailableWeeks]);

  // Formats the date according to the locale
  const selectedWeekText = useMemo(() => {
    return formatWeekRange(selectedWeek, currentLocale);
  }, [selectedWeek, currentLocale]);

  return (
    <Select
      value={selectedWeek}
      onValueChange={setSelectedWeek}
      aria-label={tA11y("weekSelector")}
      aria-describedby="week-status"
    >
      <SelectTrigger aria-label={tA11y("selectWeekButton")}>
        <SelectValue
          placeholder={t("pages.summary.inputPlaceholder")}
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
                  <span className="sr-only">({tA11y("currentWeekLabel")})</span>
                )}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
