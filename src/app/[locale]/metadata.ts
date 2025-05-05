import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Résoudre les params si c'est une Promise
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Version hardcodée des métadonnées selon la locale
  if (locale === "fr") {
    return {
      title: "Trackivity",
      description:
        "Suivez vos activités hebdomadaires et atteignez vos objectifs",
    };
  } else {
    return {
      title: "Trackivity",
      description: "Track your weekly activities and reach your goals",
    };
  }
}
