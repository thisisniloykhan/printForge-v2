"use client";
import type { JSX } from "react";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import NavLink from "./NavLink";
import { getAllCategories } from "../lib/categories";
import type { Category } from "../types";

export default function ModelsCategoriesNavbar(): JSX.Element {
  const categories: Category[] = getAllCategories();
  const pathname: string = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleWheel = (e: WheelEvent) => {
      if (nav.scrollWidth <= nav.clientWidth) return;

      e.preventDefault();
      nav.scrollLeft += e.deltaY;
    };

    nav.addEventListener("wheel", handleWheel, { passive: false });
    return () => nav.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <aside className="sticky top-17.5 sm:top-21.5 z-10 w-full bg-background border-b border-secondary md:fixed md:top-33 md:w-64 md:border-none">
      <div className="relative">
        <nav
          ref={navRef}
          className="w-full overflow-x-auto md:overflow-visible no-scrollbar"
        >
          <ul className="flex px-4 py-3 whitespace-nowrap md:flex-col md:p-0 md:space-x-0 md:space-y-3">
            <li className="px-4 py-2 text-sm uppercase font-semibold">
              <NavLink href="/3d-models" isActive={pathname === "/3d-models"}>
                All
              </NavLink>
            </li>

            {categories.map((item) => (
              <li
                className="px-4 py-2 text-sm uppercase font-semibold"
                key={item.slug}
              >
                <NavLink
                  href={`/3d-models/categories/${item.slug}`}
                  isActive={pathname === `/3d-models/categories/${item.slug}`}
                >
                  {item.displayName}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute top-0 right-0 w-8 h-full pointer-events-none bg-linear-to-l from-background to-transparent md:hidden" />
      </div>
    </aside>
  );
}
