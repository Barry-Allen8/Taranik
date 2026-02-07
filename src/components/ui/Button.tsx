import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef, ReactElement, cloneElement } from "react";

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
        "bg-transparent hover:bg-[#232038] text-white": variant === "ghost",
        "px-4 py-2 text-sm": size === "sm",
        "px-6 py-3": size === "md",
        "px-8 py-4 text-lg": size === "lg",
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
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
