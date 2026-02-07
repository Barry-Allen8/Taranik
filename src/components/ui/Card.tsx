import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card",
        hover && "hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_24px_52px_rgba(2,6,23,0.52)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
