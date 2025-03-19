import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { I18nProviderClient } from "../../../locales/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Activity Timer App",
  description: "Suivez vos activités hebdomadaires et atteignez vos objectifs",
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col sm:flex-row min-h-screen">
              <Navbar />
              <main className="flex-1 p-4 pb-20 sm:pb-4">{children}</main>
            </div>
          </ThemeProvider>
        </I18nProviderClient>
      </body>
    </html>
  );
}
