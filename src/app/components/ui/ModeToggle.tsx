"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

import { Button } from "@/app/components/ui/button";
import { AnimatedSunMoonIcon } from "@/app/components/ui/morph-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="rounded bg-transparent shadow-[0_3px_6px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_3px_6px_-2px_rgba(255,255,255,0.12)] transition-all duration-200 hover:bg-accent/50 hover:text-highlight-secondary hover:scale-[1.03] active:translate-y-0.5"
          >
            {mounted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1], // Extended fluid curve matching app transitions
                }}
                className="flex items-center justify-center"
              >
                <AnimatedSunMoonIcon
                  isActive={isDark}
                  aria-hidden="true"
                  size={19}
                />
              </motion.div>
            ) : (
              <span className="inline-block w-4.75 h-4.75" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />

      <TooltipContent className="font-semibold bg-foreground text-background [&>svg]:fill-foreground">
        {mounted
          ? isDark
            ? "Switch to Light Mode"
            : "Switch to Dark Mode"
          : "Toggle theme"}
      </TooltipContent>
    </Tooltip>
  );
}
