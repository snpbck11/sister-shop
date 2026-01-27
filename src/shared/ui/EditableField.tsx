import { Check, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/cn";
import { EditButton, IconButton } from "./Buttons";
import { Input } from "./Input";

interface IEditableFieldProps {
  value: string;
  onSave: (nextValue: string) => Promise<void>;
  placeholder?: string;
  textClassname?: string;
}

export function EditableField({ value, onSave, placeholder, textClassname }: IEditableFieldProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    const nextValue = inputValue.trim();

    if (nextValue === value) {
      setIsEdit(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSave(nextValue);
      setIsEdit(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Не удалось сохранить");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseEdit = () => {
    setError(null);
    setInputValue(value);
    setIsEdit(false);
  };

  if (!isEdit) {
    return (
      <div className={"flex items-center gap-2"}>
        <p className={cn("truncate", textClassname)}>{inputValue}</p>
        <EditButton onClick={() => setIsEdit(true)} />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="min-w-0 flex-1">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          error={error ? error : undefined}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              handleCloseEdit();
            }
          }}
          className="min-w-50"
        />
      </div>
      <div className="flex gap-1 items-center">
        <IconButton icon={Check} onClick={onSubmit} />
        <IconButton icon={X} onClick={handleCloseEdit} />
      </div>
    </div>
  );
}
