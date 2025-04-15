"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, BarChart, Clock } from "lucide-react";
import { ThemeToggle } from "./theme/ThemeToggle";
import { SettingsMenu } from "./SettingsMenu";
import { cn } from "@/lib/utils/classname";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "../../locales/client";

export function Navbar() {
  const tNav = useScopedI18n("nav");
  const pathname = usePathname();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  // Extract the path without the locale prefix
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";

  // Navigation items configuration
  const navItems = [
    {
      name: tNav("home"),
      href: "/",
      icon: Home,
    },
    {
      name: tNav("add"),
      href: "/activity/new",
      icon: PlusCircle,
    },
    {
      name: tNav("timer"),
      href: "/timer",
      icon: Clock,
    },
    {
      name: tNav("summary"),
      href: "/summary",
      icon: BarChart,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-2 sm:fixed sm:top-0 sm:bottom-0 sm:right-auto sm:flex sm:flex-col sm:border-t-0 sm:border-r sm:h-screen sm:w-64">
      {/* App title - visible only on desktop */}
      <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-20 sm:border-b">
        <h1 className="text-xl font-bold">Activity Timer</h1>
      </div>

      {/* Navigation items */}
      <ul className="flex justify-around sm:flex-col sm:space-y-2 sm:mt-4">
        {navItems.map((item) => (
          <li key={item.href} className="w-full">
            <Link
              href={`/${currentLocale}${item.href}`}
              className={cn(
                "flex items-center justify-center sm:justify-start p-2 rounded-md transition-colors",
                // Highlight active item
                pathnameWithoutLocale === item.href ||
                  pathnameWithoutLocale.startsWith(`${item.href}/`)
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <item.icon className="h-5 w-5 sm:mr-2" />
              {/* Text label - hidden on mobile, visible on desktop */}
              <span className="hidden sm:inline-block">{item.name}</span>
            </Link>
          </li>
        ))}

        {/* Settings menu with language switcher and theme toggle - mobile */}
        <li className="sm:hidden w-full">
          <SettingsMenu />
        </li>
      </ul>

      {/* Language switcher and theme toggle - desktop */}
      <div className="hidden sm:flex sm:flex-col sm:items-center sm:mt-auto sm:mb-4 sm:border-t sm:pt-4">
        {/* Theme toggle */}
        <div className="mb-6">
          <ThemeToggle />
        </div>

        {/* Language switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => changeLocale("fr")}
            className={cn(
              "px-3 py-1 text-sm rounded transition-colors",
              currentLocale === "fr"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            FR
          </button>
          <button
            onClick={() => changeLocale("en")}
            className={cn(
              "px-3 py-1 text-sm rounded transition-colors",
              currentLocale === "en"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            EN
          </button>
        </div>
        <Link
          href={`/${currentLocale}/legal`}
          className={cn(
            "text-xs hover:underline",
            // Highlight active item
            pathnameWithoutLocale.startsWith("/legal")
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {tNav("legal")}
        </Link>
      </div>
    </nav>
  );
}
