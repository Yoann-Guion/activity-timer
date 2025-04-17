import { PageTransition } from "@/components/animation/PageTransition";
import MainTitle from "@/components/title/MainTitle";
import ActivitiesList from "@/components/cards/ActivitiesList";
import TestResetButton from "@/components/tests/TestResetButton";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-4xl">
        <MainTitle />
        <ActivitiesList />
        <TestResetButton />
      </div>
    </PageTransition>
  );
}
