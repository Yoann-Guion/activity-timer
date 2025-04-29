import { PageTransition } from "@/components/animation/PageTransition";
import MainTitle from "@/components/title/MainTitle";
import ActivitiesList from "@/components/cards/ActivitiesList";
import { ActivityCardSkeleton } from "@/components/skeleton/ActivityCardSkeleton";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-4xl">
        <MainTitle />
        <ActivitiesList />
      </div>
    </PageTransition>
  );
}
