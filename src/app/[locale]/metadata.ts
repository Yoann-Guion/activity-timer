import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string } | Promise<{ locale: string }>;
}): Promise<Metadata> {
  // Resolve the params if it's a promise
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Hardcoded metadata for the app
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
