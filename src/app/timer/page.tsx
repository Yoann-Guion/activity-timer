import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Timer() {
  return (
    <div className="container mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Chronomètre</CardTitle>
          <CardDescription>
            Suivez le temps passé sur vos activités
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Activity selection view */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="activity-select" className="text-sm font-medium">
                Choisir une activité
              </label>
              <Select>
                <SelectTrigger id="activity-select">
                  <SelectValue placeholder="Sélectionner une activité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">
                    Aucune activité disponible
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-center py-8">
              <Clock className="mx-auto h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Sélectionnez une activité et démarrez le chronomètre
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {/* Start button - disabled for now */}
          <Button size="lg" disabled>
            Démarrer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
