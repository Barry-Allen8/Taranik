import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label ? <label className="mb-2 block text-sm font-medium text-slate-300">{label}</label> : null}
      <input
        className={cn(
          "cyber-input",
          error && "border-red-500/70 text-red-100 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(248,113,113,0.2)]",
          className
        )}
        ref={ref}
        {...props}
      />
      {error ? <p className="mt-1.5 text-sm text-red-400">{error}</p> : null}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
