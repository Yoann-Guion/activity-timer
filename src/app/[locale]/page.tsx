"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentLocale, useScopedI18n } from "../../../locales/client";

export default function Home() {
  const tCommon = useScopedI18n("common");
  const tHome = useScopedI18n("pages.home");
  const currentLocale = useCurrentLocale();

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{tHome("title")}</h1>
        <Link href={`/${currentLocale}/activities/new`}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {tHome("newActivity")}
          </Button>
        </Link>
      </div>

      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">
          {tCommon("emptyState.noActivities")}
        </h2>
        <p className="text-muted-foreground mb-6">
          {tCommon("emptyState.createFirst")}
        </p>
        <Link href={`/${currentLocale}/activities/new`}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {tHome("createFirst")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
