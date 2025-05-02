"use client";

import { useState } from "react";
import SummaryTitle from "../title/SummaryTitle";
import OverviewContainer from "./OverviewContainer";
import { getCurrentWeekKey } from "@/lib/utils/date";
import { useActivityStore } from "@/lib/useActivityStore";
import OverviewContainerSkeleton from "../skeletons/containers/OverviewContainerSkeleton";

export default function SummaryContainer() {
  // State to manage the selected week
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekKey());
  const { isRehydrated } = useActivityStore();

  return (
    <div className="container mx-auto max-w-4xl">
      <SummaryTitle
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
      />
      {!isRehydrated ? (
        <OverviewContainerSkeleton />
      ) : (
        <OverviewContainer selectedWeek={selectedWeek} />
      )}
    </div>
  );
}
