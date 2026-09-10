"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/app/components/ui/button";
import { AnimatedSearchCloseIcon } from "@/app/components/ui/morph-icons";

interface ModelsSearchProps {
  query: string;
}

export default function ModelsSearch({ query }: ModelsSearchProps) {
  const router = useRouter();

  // Each change tells the action icon to play its animation once.
  const [searchTrigger, setSearchTrigger] = React.useState(0);

  const pendingUrlRef = React.useRef<string | null>(null);

  const handleAnimationComplete = () => {
    const url = pendingUrlRef.current;

    if (!url) {
      return;
    }

    pendingUrlRef.current = null;

    router.push(url);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("query")?.toString().trim() ?? "";

    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("query", searchQuery);
    }

    pendingUrlRef.current = params.toString()
      ? `/3d-models?${params.toString()}`
      : "/3d-models";

    setSearchTrigger((value) => value + 1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center gap-2 md:max-w-2xl"
    >
      <label htmlFor="query" className="sr-only">
        Search 3D models
      </label>

      <input
        id="query"
        type="search"
        name="query"
        placeholder="E.g. dragon"
        autoComplete="off"
        defaultValue={query}
        className="flex-1 min-w-0 h-12 px-5 text-sm placeholder-muted-foreground border border-border rounded-lg focus:border-border-2 focus:outline-none focus:ring-0 md:text-base shadow-[0_3px_6px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_3px_6px_-2px_rgba(255,255,255,0.12)] transition-all duration-200 hover:bg-accent/50 hover:text-highlight-secondary hover:scale-[1.03] active:translate-y-0.5"
      />

      <Button
        type="submit"
        variant="ghost"
        className="h-12 w-12 p-0 rounded-lg border border-border shrink-0 xs:w-auto xs:px-5 xs:gap-2 shadow-[0_3px_6px_-2px_rgba(0,0,0,0.2)] dark:shadow-[0_3px_6px_-2px_rgba(255,255,255,0.12)] transition-all duration-200 hover:bg-accent/50 hover:text-highlight-secondary hover:scale-[1.06] active:translate-y-0.5"
      >
        <AnimatedSearchCloseIcon
          trigger={searchTrigger}
          size={20}
          aria-hidden="true"
          onAnimationComplete={handleAnimationComplete}
        />

        <span className="hidden xs:inline">Search</span>
      </Button>
    </form>
  );
}
