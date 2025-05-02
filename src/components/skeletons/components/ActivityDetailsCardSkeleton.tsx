import { Card, CardContent, CardHeader } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";
import { SessionsTableSkeleton } from "./SessionsTableSkeleton";

export function ActivityDetailsCardSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="relative overflow-hidden" role="region">
        <div
          className="absolute top-0 left-0 w-full h-2.5 bg-gray-300 dark:bg-gray-700"
          aria-hidden="true"
        />
        <CardHeader className="pt-1 flex justify-between items-center">
          <div className="flex gap-2 my-1">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-5 w-24 mt-1" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-2 w-full mt-1" />
              <div className="flex justify-between mt-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>

              <div className="mb-2">
                <Skeleton className="h-10 w-70 rounded-md" />
              </div>

              <div>
                <SessionsTableSkeleton />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
