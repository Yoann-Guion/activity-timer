"use client";

export default function Summary() {
  // Simple placeholder page without functionality

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Résumé Hebdomadaire</h1>
        <p className="text-muted-foreground">Semaine en cours</p>
      </div>

      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">
          Aucune activité pour le moment
        </h2>
        <p className="text-muted-foreground">
          Créez des activités pour voir votre résumé hebdomadaire
        </p>
      </div>
    </div>
  );
}
