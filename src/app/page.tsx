import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Mes Activités</h1>
        <Link href="/activities/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle Activité
          </Button>
        </Link>
      </div>

      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">
          Aucune activité pour le moment
        </h2>
        <p className="text-muted-foreground mb-6">
          Commencez par créer une activité pour suivre votre temps
        </p>
        <Link href="/activities/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Créer ma première activité
          </Button>
        </Link>
      </div>
    </div>
  );
}
