"use client";

import { Settings, Moon, Sun, Earth, ScrollText } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useChangeLocale,
  useCurrentLocale,
  useScopedI18n,
} from "../../locales/client";
import Link from "next/link";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export function SettingsMenu() {
  const t = useScopedI18n("nav");
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
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t("srOnly.theme")}</span>
          </Button>
        </DropdownMenuItem>

        {/* Language toggle button */}
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9"
            onClick={() => changeLocale(currentLocale === "fr" ? "en" : "fr")}
          >
            <Earth className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">{t("srOnly.language")}</span>
          </Button>
        </DropdownMenuItem>

        {/* Legal notice link */}
        <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted">
          <Link href={`/${currentLocale}/legal`}>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
            >
              <ScrollText className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">{t("legal")}</span>
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
