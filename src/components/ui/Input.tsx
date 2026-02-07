import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label ? (
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#6f6f6f]">
            {label}
          </label>
        ) : null}
        <input
          className={cn(
            "cyber-input",
            error && "border-red-500 text-red-300 focus:border-red-400 focus:shadow-[0_0_0_1px_rgba(248,113,113,0.55)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
