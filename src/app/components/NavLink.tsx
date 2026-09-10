import type { JSX } from "react";
import Link from "next/link";
import type { NavLinkProps } from "@/app/types";

export default function NavLink({
  href,
  children,
  isActive,
  className,
  ref,
  ...props
}: NavLinkProps): JSX.Element {
  return (
    <Link
      ref={ref}
      href={href}
      className={`transition-colors rounded-md hover:text-highlight ${isActive ? "text-highlight" : "text-foreground"} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
