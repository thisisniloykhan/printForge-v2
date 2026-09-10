"use client";
import {
  Albert_Sans,
  Montserrat_Alternates,
  Montserrat,
} from "next/font/google";

import "@/app/globals.css";
import { cn } from "@/app/lib/utils";
import NavLink from "@/app/components/NavLink";
import { Button } from "@/app/components/ui/button";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const albertSans = Albert_Sans({ subsets: ["latin"], display: "swap" });
const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates",
});

export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html
      lang="en"
      className={cn(
        albertSans.className,
        montserratAlternates.className,
        "font-sans",
        "dark",
        montserrat.variable,
      )}
    >
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-background px-4 text-center text-foreground">
          <h2 className="font-heading font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl">
            Something went wrong!
          </h2>

          <div className="flex flex-col items-center gap-3 xs:flex-row">
            <Button
              onClick={() => retry()}
              className="h-9 w-28 px-6 font-semibold hover:text-orange-accent border-2 border-foreground bg-background text-foreground hover:bg-foreground transition duration-200"
            >
              Try Again
            </Button>

            <NavLink
              href="/"
              className="inline-flex h-9 w-28 items-center justify-center whitespace-nowrap rounded-md px-6 py-2 text-sm font-semibold bg-background text-foreground border-2 border-foreground hover:bg-foreground hover:text-backgroundshadow-xs outline-none transition duration-200  focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              Return Home
            </NavLink>
          </div>
        </div>
      </body>
    </html>
  );
}
