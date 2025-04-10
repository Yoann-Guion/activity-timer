import { PageTransition } from "@/components/animation/PageTransition";
import TimerCard from "@/components/cards/TimerCard";

export default function TimerPage() {
  return (
    <PageTransition>
      <TimerCard />
    </PageTransition>
  );
}
