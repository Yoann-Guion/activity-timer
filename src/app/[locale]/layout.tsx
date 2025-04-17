import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { TransitionProvider } from "@/components/animation/TransitionProvider";
import { Navbar } from "@/components/Navbar";
import WeeklyResetManager from "@/components/activity/WeeklyResetManager";
import { I18nProviderClient } from "@locales/client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  weight: "400",
  style: "normal",
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  weight: "400",
  style: "normal",
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Activity Timer App",
  description: "Suivez vos activités hebdomadaires et atteignez vos objectifs",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <WeeklyResetManager />
        <I18nProviderClient locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen">
              <Navbar />
              <main className="flex-1 p-4 pb-20 sm:pb-4 sm:ml-64 w-full">
                <TransitionProvider>{children}</TransitionProvider>
              </main>
            </div>
          </ThemeProvider>
        </I18nProviderClient>
        <Toaster theme="system" position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
