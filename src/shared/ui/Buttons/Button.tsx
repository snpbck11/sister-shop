import { cn } from "@/shared/lib/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { Spinner } from "../Spinner";
import {
  commonButtonStyles,
  sizeStyles,
  TButtonSize,
  TButtonVariant,
  variantStyles,
} from "./shared/buttonStyles";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSize;
  href?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  isLoading = false,
  disabled,
  ...rest
}: IButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      className={cn(
        commonButtonStyles,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && "opacity-70 cursor-not-allowed",
        className
      )}>
      <div className="relative z-10 text-nowrap">
        {/* Текст остается в DOM для сохранения ширины, но становится невидимым */}
        <span className={cn(isLoading && "invisible")}>{children}</span>
        {/* Спиннер абсолютно позиционируется поверх текста */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner size="sm" />
          </div>
        )}
      </div>
    </button>
  );
}
