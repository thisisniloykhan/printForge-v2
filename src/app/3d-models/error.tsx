"use client";

import { useEffect } from "react";

import NavLink from "@/app/components/NavLink";
import { Button } from "@/app/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center gap-5 bg-background px-4 text-center text-foreground">
      <h2 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl">
        Something went wrong!
      </h2>

      <div className="flex flex-col items-center gap-3 xs:flex-row">
        <Button
          onClick={() => retry()}
          className="h-9 w-28 border-2 border-foreground bg-background px-6 font-semibold text-foreground transition duration-200 hover:bg-foreground hover:text-orange-accent"
        >
          Try Again
        </Button>

        <NavLink
          href="/"
          className="inline-flex h-9 w-28 items-center justify-center whitespace-nowrap rounded-md border-2 border-foreground bg-background px-6 py-2 text-sm font-semibold text-foreground shadow-xs outline-none transition duration-200 hover:bg-foreground hover:text-background focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          Return Home
        </NavLink>
      </div>
    </div>
  );
}
