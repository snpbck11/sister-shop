"use client";

import { cn } from "@/shared/lib/cn";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ISelectOption } from "./Select";
import { controlStyles } from "./shared/controlStyles";
import { FieldError } from "./shared/FieldError";
import { InputLoader } from "./shared/InputLoader";
import { Label } from "./shared/Label";

interface IMultiSelectProps {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string;
  options: ISelectOption[];
  value: Array<string | number>;
  onChange: (next: Array<string | number>) => void;
  placeholder?: string;
  className?: string;
  searchable?: boolean;
  disabled?: boolean;
  dropDownClassname?: string;
  loading?: boolean;
}

export function MultiSelect({
  id,
  label,
  required,
  error,
  options,
  value,
  onChange,
  placeholder = "Выберите...",
  className,
  searchable = true,
  disabled,
  dropDownClassname,
  loading = false,
}: IMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLFieldSetElement | null>(null);

  const valueSet = useMemo(() => new Set((value ?? []).map((v) => String(v))), [value]);

  const selected = useMemo(() => {
    const map = new Map(options.map((option) => [String(option.value), option]));

    const filtered = (value ?? [])
      .map((v) => map.get(String(v)))
      .filter(Boolean) as ISelectOption[];

    return filtered;
  }, [value, options]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return options;

    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const toggleOption = (opt: ISelectOption) => {
    const key = String(opt.value);
    if (valueSet.has(key)) {
      onChange((value ?? []).filter((v) => String(v) !== key));
    } else {
      onChange([...(value ?? []), opt.value]);
    }
  };

  const toggleSelect = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const removeOne = (v: string | number) => {
    onChange((value ?? []).filter((x) => String(x) !== String(v)));
  };

  const clearAll = () => onChange([]);

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
        type="button"
        id={id}
        disabled={disabled}
        onClick={toggleSelect}
        className={cn(
          controlStyles(error),
          "relative flex min-h-10.5 w-full items-center justify-between gap-2 px-3 text-left",
          disabled && "opacity-60 cursor-not-allowed",
        )}>
        <div className="flex flex-wrap gap-2">
          {selected.length === 0 ? (
            <span className="text-foreground/50">{placeholder}</span>
          ) : (
            selected.map((opt) => (
              <span
                key={String(opt.value)}
                className="flex items-center gap-1 rounded-full border px-1 py-px text-sm">
                {opt.label}
                <span
                  role="button"
                  tabIndex={0}
                  className="rounded-full p-0.5 hover:bg-foregroudn/10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeOne(opt.value);
                  }}>
                  <X className="h-3.5 w-3.5 bg-error rounded-full" />
                </span>
              </span>
            ))
          )}
        </div>

        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <span
              role="button"
              tabIndex={0}
              className="text-sm text-foreground/60 hover:text-foreground"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                clearAll();
              }}
              title="Очистить">
              Очистить
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition",
              isOpen && "rotate-180",
              loading && "text-transparent",
            )}
          />
        </div>
        {loading && <InputLoader />}
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
                const checked = valueSet.has(String(opt.value));
                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    onClick={() => toggleOption(opt)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left",
                      "hover:bg-foreground/5",
                    )}>
                    <div className="flex items-center gap-3">
                      <span className={cn("h-4 w-4 rounded border", checked && "bg-foreground")} />
                      <span className="text-sm">{opt.label}</span>
                    </div>

                    {checked && <span className="text-xs opacity-60">выбрано</span>}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      <FieldError error={error} />
    </fieldset>
  );
}
