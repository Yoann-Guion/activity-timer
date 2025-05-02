import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActivitiesOverviewSkeleton() {
  return (
    <Card className="dark:bg-gray-900 dark:border-gray-800 bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="border-gray-800">
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-80" />
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="space-y-2">
          {/* Generate 2 skeleton activities */}
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="border dark:border-gray-800 border-gray-200 rounded-2xl p-2.5 
                       dark:bg-gray-900 bg-white min-h-20"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Skeleton className="w-3 h-3 rounded-full mr-2" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
