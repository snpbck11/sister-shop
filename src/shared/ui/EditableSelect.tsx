"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { EditButton, IconButton } from "./Buttons";
import { ISelectOption, Select } from "./Controls/Select";

interface IEditableSelectProps<T> {
  value: number;
  displayValue: string;
  options: ISelectOption[];
  onSave: (nextValue: number) => Promise<T>;
  label?: string;
}

export function EditableSelect<T>({
  value,
  displayValue,
  options,
  onSave,
  label,
}: IEditableSelectProps<T>) {
  const [isEdit, setIsEdit] = useState(false);
  const [draft, setDraft] = useState<null | number>(value);
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
    const next = draft ?? value;

    if (next === value) {
      setIsEdit(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(next);
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
        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          {displayValue}
        </span>
        <EditButton onClick={startEdit} />
      </div>
    );
  }

  return (
    <div className="flex gap-2 min-w-0 items-center">
      <div className="min-w-50 flex-1">
        <Select
          id={label || "editable-select"}
          label={label}
          value={draft ?? value}
          options={options}
          onChange={(value) => setDraft(Number(value))}
          error={error ?? undefined}
          disabled={loading}
          loading={loading}
        />
      </div>
      <div className="flex gap-1 items-center pt-1">
        <IconButton icon={Check} onClick={submit} disabled={loading} />
        <IconButton icon={X} onClick={closeEdit} disabled={loading} />
      </div>
    </div>
  );
}
