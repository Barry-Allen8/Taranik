import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, cloneElement, forwardRef, ReactElement } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const classes = cn(
      "btn",
      {
        "btn-primary": variant === "primary",
        "btn-secondary": variant === "secondary",
        "btn-outline": variant === "outline",
        "border-slate-700 bg-slate-900/35 text-slate-200 hover:border-slate-500 hover:bg-slate-900/60": variant === "ghost",
        "px-4 py-2 text-xs": size === "sm",
        "px-6 py-3 text-sm": size === "md",
        "px-8 py-4 text-base": size === "lg",
      },
      className
    );

    if (asChild && children) {
      const child = children as ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(child.props.className, classes),
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
