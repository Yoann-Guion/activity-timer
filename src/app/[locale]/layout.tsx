import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { I18nProviderClient } from "../../../locales/client";

const geistSans = Geist({
  weight: "400",
  style: "normal",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  weight: "400",
  style: "normal",
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      >
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
