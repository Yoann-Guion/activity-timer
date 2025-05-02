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
} from "@locales/client";

export function Navbar() {
  const tNav = useScopedI18n("nav");
  const pathname = usePathname();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  // Extract the path without the locale prefix
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";

  // Function to check if the current item is active
  const isItemActive = (itemHref: string): boolean => {
    return (
      pathnameWithoutLocale === itemHref ||
      pathnameWithoutLocale.startsWith(`${itemHref}/`)
    );
  };

  // Navigation items configuration
  const navItems = [
    {
      name: tNav("home"),
      href: "/",
      icon: Home,
      ariaLabel: tNav("srOnly.home"),
    },
    {
      name: tNav("add"),
      href: "/activity/new",
      icon: PlusCircle,
      ariaLabel: tNav("srOnly.add"),
    },
    {
      name: tNav("timer"),
      href: "/timer",
      icon: Clock,
      ariaLabel: tNav("srOnly.timer"),
    },
    {
      name: tNav("summary"),
      href: "/summary",
      icon: BarChart,
      ariaLabel: tNav("srOnly.summary"),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-2 sm:fixed sm:top-0 sm:bottom-0 sm:right-auto sm:flex sm:flex-col sm:border-t-0 sm:border-r sm:h-screen sm:w-64"
      role="navigation"
      aria-label={tNav("srOnly.mainNavigation")}
    >
      {/* App title - visible only on desktop */}
      <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-20 sm:border-b">
        <h1 className="text-xl font-bold">Activity Timer</h1>
      </div>

      {/* Navigation items */}
      <ul
        className="flex justify-around sm:flex-col sm:space-y-2 sm:mt-4"
        role="menubar"
        aria-label={tNav("srOnly.navigationMenu")}
      >
        {navItems.map((item) => {
          const isActive = isItemActive(item.href);
          return (
            <li key={item.href} className="w-full" role="none">
              <Link
                href={`/${currentLocale}${item.href}`}
                className={cn(
                  "flex items-center justify-center sm:justify-start p-2 rounded-md transition-colors",
                  // Highlight active item
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
                role="menuitem"
                aria-current={isActive ? "page" : undefined}
                aria-label={item.ariaLabel}
              >
                <item.icon className="h-5 w-5 sm:mr-2" aria-hidden="true" />
                {/* Text label - hidden on mobile, visible on desktop */}
                <span className="hidden sm:inline-block">{item.name}</span>
                <span className="sr-only sm:hidden">{item.name}</span>
              </Link>
            </li>
          );
        })}

        {/* Settings menu with language switcher and theme toggle - mobile */}
        <li className="sm:hidden w-full">
          <SettingsMenu />
        </li>
      </ul>

      {/* Language switcher and theme toggle - desktop */}
      <div
        className="hidden sm:flex sm:flex-col sm:items-center sm:mt-auto sm:mb-4 sm:border-t sm:pt-4"
        aria-label={tNav("srOnly.preferencesSection")}
      >
        {/* Theme toggle */}
        <div className="mb-6">
          <ThemeToggle />
        </div>

        {/* Language switcher */}
        <div
          className="flex gap-2 mb-6"
          role="group"
          aria-label={tNav("srOnly.languageSelection")}
        >
          <button
            onClick={() => changeLocale("fr")}
            className={cn(
              "px-3 py-1 text-sm rounded transition-colors",
              currentLocale === "fr"
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
            aria-pressed={currentLocale === "fr"}
            aria-label={"Passer en français"}
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
            aria-pressed={currentLocale === "en"}
            aria-label={"Switch to English"}
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
          aria-label={tNav("srOnly.legalPageLink")}
          aria-current={
            pathnameWithoutLocale.startsWith("/legal") ? "page" : undefined
          }
        >
          {tNav("legal")}
        </Link>
      </div>
    </nav>
  );
}
