"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";
import { EditButton, IconButton } from "./Buttons";
import { Input } from "./Controls/Input";

interface IEditableFieldProps<T> {
  value: string;
  onSave: (nextValue: string) => Promise<T>;
  placeholder?: string;
  textClassname?: string;
}

export function EditableField<T>({ value, onSave, placeholder, textClassname }: IEditableFieldProps<T>) {
  const [isEdit, setIsEdit] = useState(false);
  const [draft, setDraft] = useState<null | string>(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = () => {
    setError(null);
    setDraft(value);
    setIsEdit(true);
  };

  const closeEdit = () => {
    setError(null);
    setDraft(null);
    setIsEdit(false);
  };

  const submit = async () => {
    const nextValue = draft?.trim() ?? value.trim();

    if (nextValue === value) {
      setIsEdit(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(nextValue);

      setIsEdit(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Не удалось сохранить");
    } finally {
      setLoading(false);
    }
  };

  if (!isEdit) {
    return (
      <div className="flex items-center gap-2 min-w-0">
        <p className={cn("truncate", textClassname)}>{value}</p>
        <EditButton onClick={startEdit} />
      </div>
    );
  }

  return (
    <div className="flex gap-2 min-w-0">
      <div className="min-w-0 flex-1">
        <Input
          value={draft ?? value}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          loading={loading}
          disabled={loading}
          error={error ?? undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              closeEdit();
            }
          }}
          className="min-w-50"
        />
      </div>
      <div className="flex gap-1 items-center">
        <IconButton icon={Check} onClick={submit} disabled={loading} />
        <IconButton icon={X} onClick={closeEdit} disabled={loading} />
      </div>
    </div>
  );
}
