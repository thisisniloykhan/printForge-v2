import { PillProps } from "@/app/types";

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <span
      className={`inline-block bg-transparent border border-border rounded-full px-3 py-1 text-sm  ${className}`}
    >
      {children}
    </span>
  );
}
