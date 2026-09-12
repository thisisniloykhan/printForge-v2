"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type JSX, useEffect, useRef, useState } from "react";
import { Box, Info } from "lucide-react";

import { Button } from "./ui/button";
import { ModeToggle } from "./ui/ModeToggle";
import { AnimatedMenuIcon } from "@/app/components/ui/morph-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

import NavLink from "./NavLink";
import printForgeLogoIcon from "@/../public/printforge-logo-icon.svg";
import printForgeLogo from "@/../public/printforge-logo.svg";

const MOBILE_MENU_BREAKPOINT: number = 400;

export default function Nav(): JSX.Element {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleResize(): void {
      if (window.innerWidth >= MOBILE_MENU_BREAKPOINT) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="h-19 sm:h-23 relative flex items-center justify-between px-2 sm:px-4 md:px-6 py-4"
      // className="h-17.5 sm:h-21.5 relative flex items-center justify-between border-b border-border px-2 sm:px-4 md:px-6 py-4 shadow-sm"
    >
      {/* Logo */}
      <Tooltip>
        <TooltipTrigger
          render={
            <Link href="/">
              <div className="relative p-1 rounded transition-colors duration-200 hover:bg-accent/50 hover:text-accent-foreground hover:scale-[1.03] active:translate-y-0.5 shadow-[0_3px_6px_-2px_rgba(0,0,0,0.2)]  dark:shadow-[0_3px_6px_-2px_rgba(255,255,255,0.12)]">
                {/* Desktop Logo */}

                <Image
                  src={printForgeLogo}
                  alt="PrintForge Logo"
                  className="hidden h-auto w-50 sm:block dark:brightness-0 dark:invert"
                  loading="eager"
                />

                {/* Mobile Logo */}

                <Image
                  src={printForgeLogoIcon}
                  alt="PrintForge Logo"
                  className="block h-6 xs:h-auto w-10 sm:hidden dark:brightness-0 dark:invert"
                  loading="eager"
                />
              </div>
            </Link>
          }
        ></TooltipTrigger>
        <TooltipContent className="sm:hidden font-semibold">
          Home
        </TooltipContent>
      </Tooltip>

      {/* Right Side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-2 md:gap-4 font-semibold xs:flex">
          <li className="text-sm uppercase shadow-[0_3px_6px_-2px_rgba(0,0,0,0.2)]  dark:shadow-[0_3px_6px_-2px_rgba(255,255,255,0.12)] rounded p-1 transition-colors duration-200 hover:bg-accent/50 hover:text-foreground hover:scale-[1.03] active:translate-y-0.5 ">
            <NavLink
              href="/3d-models"
              className="hidden md:block "
              isActive={pathname.startsWith("/3d-models")}
            >
              3D Models
            </NavLink>
            <Tooltip>
              <TooltipTrigger
                render={
                  <NavLink
                    href="/3d-models"
                    className="hidden xs:block md:hidden"
                    aria-label="3D Models"
                    isActive={pathname.startsWith("/3d-models")}
                  >
                    <Box />
                  </NavLink>
                }
              ></TooltipTrigger>
              <TooltipContent sideOffset={9} className="font-semibold">
                3D Models
              </TooltipContent>
            </Tooltip>
          </li>

          <li className="text-sm uppercase shadow-[0_3px_6px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_3px_6px_-2px_rgba(255,255,255,0.12)] rounded p-1 transition-colors duration-200 hover:bg-accent/50 hover:text-accent-foreground hover:scale-[1.03] active:translate-y-0.5">
            <NavLink
              href="/about"
              isActive={pathname === "/about"}
              className="hidden md:block"
            >
              About
            </NavLink>
            <Tooltip>
              <TooltipTrigger
                render={
                  <NavLink
                    href="/about"
                    className="hidden xs:block md:hidden"
                    aria-label="About"
                    isActive={pathname === "/about"}
                  >
                    <Info />
                  </NavLink>
                }
              ></TooltipTrigger>
              <TooltipContent sideOffset={9} className="font-semibold">
                About
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="flex gap-2 items-center xs:hidden">
          <DropdownMenu
            open={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            modal={false}
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Toggle navigation menu"
                        className="rounded bg-transparent shadow-[0_3px_6px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_3px_6px_-2px_rgba(255,255,255,0.12)] transition-all duration-200 hover:bg-accent/50 hover:text-highlight-secondary hover:scale-[1.03] active:translate-y-0.5"
                      >
                        <AnimatedMenuIcon
                          isActive={isMenuOpen}
                          size={20}
                          aria-hidden="true"
                        />
                      </Button>
                    }
                  />
                }
              />
              <TooltipContent className="font-semibold">Menu</TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              anchor={navRef}
              align="end"
              side="bottom"
              sideOffset={4}
              aria-label="Mobile navigation menu"
              className="w-32 bg-primary"
            >
              <DropdownMenuItem
                className="border-b "
                render={
                  <NavLink
                    href="/3d-models"
                    className="w-full font-semibold uppercase hover:bg-foreground hover:text-background"
                    isActive={pathname.startsWith("/3d-models")}
                  >
                    3D Models
                  </NavLink>
                }
              />

              <DropdownMenuItem
                className="border-b"
                render={
                  <NavLink
                    href="/about"
                    className="w-full font-semibold uppercase hover:bg-foreground hover:text-background"
                    isActive={pathname === "/about"}
                  >
                    About
                  </NavLink>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </nav>
  );
}
