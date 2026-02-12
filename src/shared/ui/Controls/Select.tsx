"use client";

import { cn } from "@/shared/lib/cn";
import { ChevronDown } from "lucide-react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { controlStyles } from "./shared/controlStyles";
import { FieldError } from "./shared/FieldError";
import { InputLoader } from "./shared/InputLoader";
import { Label } from "./shared/Label";

export interface ISelectOption {
  label: string;
  value: string | number;
}

interface ISelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  options: ISelectOption[];
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  dropDownClassname?: string;
  searchable?: boolean;
  loading?: boolean;
}

export const Select = forwardRef<HTMLButtonElement, ISelectProps>(
  (
    {
      label,
      error,
      required,
      options,
      placeholder = "Выберите...",
      value,
      onChange,
      disabled,
      className,
      id,
      dropDownClassname,
      searchable = false,
      loading = false,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const rootRef = useRef<HTMLFieldSetElement | null>(null);

    const selected = useMemo(
      () => options.find((opt) => String(opt.value) === String(value)),
      [options, value],
    );

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return options;
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query]);

    const handleSelect = (opt: ISelectOption) => {
      onChange?.(opt.value);
      setIsOpen(false);
      setQuery("");
    };

    const toggleSelect = () => {
      if (!disabled) setIsOpen((prev) => !prev);
    };

    useEffect(() => {
      const onDoc = (e: MouseEvent) => {
        if (!rootRef.current) return;
        if (!rootRef.current.contains(e.target as Node)) setIsOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return (
      <fieldset className={cn("relative", className)} ref={rootRef}>
        {label && <Label label={label} htmlFor={id} required={required} />}
        <button
          ref={ref}
          type="button"
          id={id}
          disabled={disabled}
          onClick={toggleSelect}
          className={cn(
            controlStyles(error),
            "flex min-h-10.5 w-full items-center justify-between gap-2 px-3 text-left",
            disabled && "opacity-60 cursor-not-allowed",
          )}>
          <span className={cn(!selected && "text-foreground/50")}>
            {selected ? selected.label : placeholder}
          </span>
          {!loading && <ChevronDown className={cn("h-4 w-4 transition", isOpen && "rotate-180")} />}
        </button>
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-2 w-full bg-admin-background rounded-xl border p-2 shadow-lg",
              dropDownClassname,
            )}>
            {searchable && (
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                className={cn(
                  "mb-2 h-10 w-full rounded-lg border px-3 outline-none",
                  "bg-transparent",
                )}
              />
            )}
            <div className="max-h-64 overflow-auto rounded-lg">
              {filtered.length === 0 ? (
                <div className="p-3 text-sm text-foreground/60">Ничего не найдено</div>
              ) : (
                filtered.map((opt) => {
                  const isSelected = String(opt.value) === String(value);
                  return (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left",
                        "hover:bg-foreground/5",
                        isSelected && "bg-foreground/5",
                      )}>
                      <span className="text-sm">{opt.label}</span>
                      {isSelected && <span className="text-xs opacity-60">выбрано</span>}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
        {loading && <InputLoader />}
        <FieldError error={error} />
      </fieldset>
    );
  },
);

Select.displayName = "Select";
