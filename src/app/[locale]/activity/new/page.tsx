import { PageTransition } from "@/components/animation/PageTransition";
import NewActivityForm from "@/components/cards/NewActivityForm";

export default function NewActivityPage() {
  return (
    <PageTransition>
      <NewActivityForm />
    </PageTransition>
  );
}
