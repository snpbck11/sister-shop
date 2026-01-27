import { cn } from "@/shared/lib/cn";
import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "./FieldError";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 transition-colors",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-white",
            className
          )}
          {...props}
        />
        <FieldError error={error} className="absolute -bottom-4 left-1"/>
      </div>
    );
  }
);

Input.displayName = "Input";
