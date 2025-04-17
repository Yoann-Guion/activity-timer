"use client";

import { useState } from "react";
import SummaryTitle from "../title/SummaryTitle";
import OverviewContainer from "./OverviewContainer";
import { getCurrentWeekKey } from "@/lib/utils/date";

export default function SummaryContainer() {
  // State to manage the selected week
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeekKey());

  return (
    <div className="container mx-auto max-w-4xl">
      <SummaryTitle
        selectedWeek={selectedWeek}
        setSelectedWeek={setSelectedWeek}
      />
      <OverviewContainer selectedWeek={selectedWeek} />
    </div>
  );
}
