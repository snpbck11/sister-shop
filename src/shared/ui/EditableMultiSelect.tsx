"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { EditButton, IconButton } from "./Buttons";
import { MultiSelect } from "./Controls";
import { ISelectOption } from "./Controls/Select";

interface IEditableMultiSelectProps<T> {
  value: number[];
  displayValues: Array<{ id: number; name: string }>;
  options: ISelectOption[];
  onSave: (nextValue: number[]) => Promise<T>;
  label?: string;
  required?: boolean;
}

export function EditableMultiSelect<T>({
  value,
  displayValues,
  options,
  onSave,
  label,
  required = false,
}: IEditableMultiSelectProps<T>) {
  const [isEdit, setIsEdit] = useState(false);
  const [draft, setDraft] = useState<null | number[]>(value);
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
    const next = draft ?? [];

    if (required && next.length === 0) {
      setError("Поле обязательно для заполнения");
      return;
    }

    const same = next.length === value.length && next.every((id) => value.includes(id));

    if (same) {
      closeEdit();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(next);
      closeEdit();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Не удалось сохранить");
    } finally {
      setLoading(false);
    }
  };

  if (!isEdit) {
    return (
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex flex-wrap gap-2">
          {displayValues.length > 0 ? (
            displayValues.map((item) => (
              <span
                key={`disp-${item.id}-${item.name}`}
                className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded">
                {item.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">Не выбрано</span>
          )}
        </div>
        <EditButton onClick={startEdit} />
      </div>
    );
  }

  return (
    <div className="flex gap-2 min-w-0 items-start">
      <div className="min-w-50 max-w-100 flex-1">
        <MultiSelect
          id={label || "editable-multiselect"}
          label=""
          value={draft ?? value}
          options={options}
          onChange={(values) => setDraft(values.map(Number))}
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
