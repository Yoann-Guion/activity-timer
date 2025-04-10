import { PageTransition } from "@/components/animation/PageTransition";
import SummaryTitle from "@/components/title/SummaryTitle";
import OverviewContainer from "@/components/containers/OverviewContainer";

export default function SummaryPage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-4xl">
        <SummaryTitle />
        <OverviewContainer />
      </div>
    </PageTransition>
  );
}
