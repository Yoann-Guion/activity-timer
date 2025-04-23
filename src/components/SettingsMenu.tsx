"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Settings, Moon, Sun, Earth, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "@locales/client";

export function SettingsMenu() {
  const t = useScopedI18n("nav");
  const { setTheme, theme } = useTheme();
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  // Accessibility labels
  const themeToggleText =
    theme === "dark" ? t("srOnly.switchToLight") : t("srOnly.switchToDark");
  const languageToggleText =
    currentLocale === "fr" ? "Switch to English" : "Passer au français";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-muted w-full"
          aria-label={t("srOnly.openSettings")}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        side="top"
        className="flex flex-col gap-2 p-2 min-w-[40px]"
        role="menu"
        aria-label={t("srOnly.settingsMenu")}
      >
        <DropdownMenuLabel className="sr-only">
          {t("srOnly.settingsOptions")}
        </DropdownMenuLabel>

        {/* Theme toggle button */}
        <DropdownMenuItem asChild className="p-0">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 border-black"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={themeToggleText}
            aria-pressed={theme === "dark"}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100  text-black dark:text-white transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-black dark:text-white transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{themeToggleText}</span>
          </Button>
        </DropdownMenuItem>

        {/* Language toggle button */}
        <DropdownMenuItem asChild className="p-0">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 border-black"
            onClick={() => changeLocale(currentLocale === "fr" ? "en" : "fr")}
            aria-label={languageToggleText}
          >
            <Earth className="h-[1.2rem] w-[1.2rem] text-black dark:text-white" />
            <span className="sr-only">{t("srOnly.languageSelection")}</span>
          </Button>
        </DropdownMenuItem>

        {/* Legal notice link */}
        <DropdownMenuItem asChild className="p-0 border-black">
          <Link href={`/${currentLocale}/legal`}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9 border-black"
              aria-label={t("legal")}
            >
              <ScrollText className="h-[1.2rem] w-[1.2rem] text-black dark:text-white" />
              <span className="sr-only">{t("legal")}</span>
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
