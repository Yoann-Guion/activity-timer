"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, BarChart, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useI18n,
  useChangeLocale,
  useCurrentLocale,
} from "../../locales/client";

export function Navbar() {
  const t = useI18n();
  const pathname = usePathname();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  // Navigation items configuration
  const navItems = [
    {
      name: "Accueil",
      href: "/",
      icon: Home,
    },
    {
      name: "Ajouter",
      href: "/activities/new",
      icon: PlusCircle,
    },
    {
      name: "Chronomètre",
      href: "/timer",
      icon: Clock,
    },
    {
      name: "Résumé",
      href: "/summary",
      icon: BarChart,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-2 sm:relative sm:border-t-0 sm:border-r sm:h-screen sm:w-64">
      {/* App title - visible only on desktop */}
      <div className="hidden sm:flex sm:flex-col sm:items-center sm:justify-center sm:h-20 sm:border-b">
        <h1 className="text-xl font-bold">Activity Timer</h1>
      </div>

      {/* Navigation items */}
      <ul className="flex justify-around sm:flex-col sm:space-y-2 sm:mt-4">
        {navItems.map((item) => (
          <li key={item.href} className="w-full">
            <Link
              href={item.href}
              className={cn(
                "flex items-center justify-center sm:justify-start p-2 rounded-md transition-colors",
                // Highlight active item
                pathname.endsWith(item.href)
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
      </ul>
    </nav>
  );
}
