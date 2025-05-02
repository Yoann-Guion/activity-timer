import ActivitiesOverviewSkeleton from "../components/ActivitiesOverviewSkeleton";
import SmallOverviewCardSkeleton from "../components/SmallOverviewCardSkeleton";

export default function OverviewContainerSkeleton() {
  return (
    <>
      <div className="space-y-6 mb-5">
        <ActivitiesOverviewSkeleton />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SmallOverviewCardSkeleton />
        <SmallOverviewCardSkeleton />
      </div>
    </>
  );
}
