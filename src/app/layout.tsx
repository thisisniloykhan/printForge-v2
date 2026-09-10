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
            <header className="sticky top-0 z-10 w-full bg-primary">
              <Nav />
            </header>

            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
