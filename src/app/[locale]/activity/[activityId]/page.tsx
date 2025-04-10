import { PageTransition } from "@/components/animation/PageTransition";
import ActivityDetailsContainer from "@/components/containers/ActivityDetailsContainer";

export default function ActivityDetailsPage() {
  return (
    <PageTransition>
      <ActivityDetailsContainer />
    </PageTransition>
  );
}
