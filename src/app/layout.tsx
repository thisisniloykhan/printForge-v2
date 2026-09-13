import { Metadata } from "next";
import {
  Albert_Sans,
  Montserrat_Alternates,
  Montserrat,
} from "next/font/google";
import { ThemeProvider } from "@/app/components/theme-provider";
import { TooltipProvider } from "@/app/components/ui/tooltip";

import Nav from "@/app/components/Navbar";
import "./globals.css";
import { cn } from "@/app/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const albertSans = Albert_Sans({ subsets: ["latin"], display: "swap" });
const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat-alternates",
});

export const metadata: Metadata = {
  title: "PrintForge",
  description: "Explore and download 3D models",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        albertSans.className,
        montserratAlternates.className,
        "font-sans",
        "no-scrollbar",
        montserrat.variable,
      )}
    >
      <body className="min-h-dvh no-scrollbar flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TooltipProvider>
            {/* <header
              className="sticky top-0 z-10 w-full bg-card after:absolute after:inset-x-0 after:bottom-0 after:h-4 after:bg-linear-to-b after:from-transparent after:to-background"
              style={{ borderRadius: "0 0 50% 50% / 0 0 16px 16px" }}
              > */}

            {/* <header
              className="sticky top-0 z-11 w-full bg-card after:absolute after:inset-x-0 after:bottom-0 after:h-3 after:bg-linear-to-b after:from-transparent after:to-background"
              style={{
                clipPath: "url(#header-curve)",
                WebkitClipPath: "url(#header-curve)",
                }}
                >
                <Nav />
                <svg width="0" height="0" className="absolute">
                <defs>
                <clipPath id="header-curve" clipPathUnits="objectBoundingBox">
                <path
                d="
                M0,0 L1,0 L1,0.92
                C 0.9,0.92 0.75,1 0.5,1
                C 0.25,1 0.1,0.92 0,0.92
                Z
                "
                />
                </clipPath>
                </defs>
                </svg> */}
            <header className="sticky top-0 z-10 w-full">
              <Nav />
            </header>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
