import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity Timer App",
  description: "Suivez vos activités hebdomadaires et atteignez vos objectifs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
