import { cn } from "@/shared/lib/cn";
import { forwardRef, InputHTMLAttributes } from "react";
import { controlStyles } from "./shared/controlStyles";
import { FieldError } from "./shared/FieldError";
import { InputLoader } from "./shared/InputLoader";
import { Label } from "./shared/Label";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  loading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, required, className, id, loading, type, ...props }, ref) => {
    const isNumber = type === "number";

    return (
      <fieldset className="relative">
        {label && <Label label={label} htmlFor={id} required={required} />}
        <input
          ref={ref}
          id={id}
          type={type}
          className={cn(controlStyles(error),'pr-6', isNumber && "no-number-arrows", className)}
          {...props}
        />
        {loading && <InputLoader />}
        <FieldError error={error} />
      </fieldset>
    );
  },
);

Input.displayName = "Input";
