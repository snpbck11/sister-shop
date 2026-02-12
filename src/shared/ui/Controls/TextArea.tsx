import { cn } from "@/shared/lib/cn";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { FieldError } from "./shared/FieldError";
import { Label } from "./shared/Label";
import { controlStyles } from "./shared/controlStyles";

export interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ label, error, required, className, id, ...props }, ref) => {
    return (
      <fieldset className="relative">
        {label && <Label label={label} htmlFor={id} required={required} />}
        <textarea ref={ref} id={id} className={cn(controlStyles(error), className)} {...props} />
        <FieldError error={error} />
      </fieldset>
    );
  },
);

TextArea.displayName = "TextArea";
