import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useCurrentLocale, useScopedI18n } from "../../../locales/client";

export default function NoActivity() {
  const tCommon = useScopedI18n("common");
  const tHome = useScopedI18n("pages.home");
  const currentLocale = useCurrentLocale();

  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold mb-4">
        {tCommon("emptyState.noActivities")}
      </h2>
      <p className="text-muted-foreground mb-6">
        {tCommon("emptyState.createFirst")}
      </p>
      <Link href={`/${currentLocale}/activity/new`}>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {tHome("createFirst")}
        </Button>
      </Link>
    </div>
  );
}
