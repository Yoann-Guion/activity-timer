"use client";

import { useScopedI18n } from "../../../../locales/client";

export default function Summary() {
  const tCommon = useScopedI18n("common.emptyState");
  const tSummary = useScopedI18n("pages.summary");

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{tSummary("title")} </h1>
        <p className="text-muted-foreground">{tSummary("currentWeek")}</p>
      </div>

      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">
          {tCommon("noActivities")}
        </h2>
        <p className="text-muted-foreground">{tCommon("createFirst")}</p>
      </div>
    </div>
  );
}
