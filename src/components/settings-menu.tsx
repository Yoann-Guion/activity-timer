"use client";

import { Settings, Moon, Sun, Earth } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChangeLocale, useCurrentLocale } from "../../locales/client";

export function SettingsMenu() {
  const { setTheme, theme } = useTheme();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-muted w-full">
          <Settings className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="top"
        className="flex flex-col gap-2 p-2 min-w-[40px]"
      >
        {/* Theme toggle button */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Language toggle button */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-9 w-9"
          onClick={() => changeLocale(currentLocale === "fr" ? "en" : "fr")}
        >
          <Earth className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
