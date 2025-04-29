import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function ActivityCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2.5 bg-muted" />

      <CardHeader className="pt-1 flex justify-between items-center">
        <Skeleton className="h-6 w-2/3 rounded-md" />

        <div className="flex items-end space-x-2">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>

            <Skeleton className="h-2 rounded-md" />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" disabled className="w-full justify-center">
          <Skeleton className="h-5 w-24" />
        </Button>
      </CardFooter>
    </Card>
  );
}
