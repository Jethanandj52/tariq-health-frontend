import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useTheme } from "./theme-provider";
import { useEffect } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    console.log("🌗 Current Theme:", theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative cursor-pointer focus:outline-none ring-0 shadow-none"
        >
          {/* ☀️ Sun visible in light mode */}
          <Sun className="  transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-9" />

          {/* 🌙 Moon visible in dark mode */}
          <Moon className="absolute   transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 " />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
