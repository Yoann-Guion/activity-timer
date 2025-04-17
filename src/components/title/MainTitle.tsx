"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useCurrentLocale, useScopedI18n } from "@locales/client";

export default function MainTitle() {
  const tHome = useScopedI18n("pages.home");
  const currentLocale = useCurrentLocale();

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{tHome("title")}</h1>
      <Link href={`/${currentLocale}/activity/new`}>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {tHome("newActivity")}
        </Button>
      </Link>
    </div>
  );
}
