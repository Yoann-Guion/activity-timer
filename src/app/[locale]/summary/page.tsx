import { PageTransition } from "@/components/animation/PageTransition";
import SummaryContainer from "@/components/containers/SummaryContainer";

export default function SummaryPage() {
  return (
    <PageTransition>
      <SummaryContainer />
    </PageTransition>
  );
}
