import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SmallOverviewCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-4">
          <Skeleton className="h-10 w-24 mx-auto" />
          <Skeleton className="h-4 w-36 mt-2 mx-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
