import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewActivity() {
  return (
    <div className="container mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle Activité</CardTitle>
          <CardDescription>
            Créez une nouvelle activité avec un objectif de temps hebdomadaire
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Activity name input */}
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'activité</Label>
            <Input id="name" placeholder="Ex: Piano, Lecture, Sport..." />
          </div>

          {/* Weekly goal time inputs */}
          <div>
            <Label>Objectif hebdomadaire</Label>
            <div className="flex gap-2 mt-3">
              <div className="space-y-2 flex-1">
                <Label htmlFor="hours">Heures</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="168"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="minutes">Minutes</Label>
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Color picker */}
          <div className="space-y-2">
            <Label htmlFor="color">Couleur</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                defaultValue="#3b82f6"
                className="w-12 h-10 p-1"
              />
              <Input type="text" defaultValue="#3b82f6" className="flex-1" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Annuler</Button>
          </Link>
          <Button>Créer</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
