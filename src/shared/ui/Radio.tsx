"use client";

import { cn } from "@/shared/lib/cn";
import { InputHTMLAttributes } from "react";

interface IRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  containerClassName?: string;
  description?: string;
}

export function Radio({
  label,
  id,
  className,
  containerClassName,
  description,
  ...props
}: IRadioProps) {
  return (
    <label className={cn("flex flex-col gap-3 cursor-pointer group", containerClassName)}>
      <div className="flex items-center gap-3">
        <input
          type="radio"
          id={id}
          className={cn(
            "appearance-none peer w-5 h-5 border-2 border-foreground rounded-full transition-all",
            "checked:border-foreground",
            "relative",
            "checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2",
            "checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
            "checked:after:w-2.5 checked:after:h-2.5 checked:after:rounded-full",
            "checked:after:bg-foreground",
            "group-hover:border-backround/70",
            className,
          )}
          {...props}
        />
        <span className="group-hover:opacity-70 transition-opacity">{label}</span>
      </div>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </label>
  );
}
