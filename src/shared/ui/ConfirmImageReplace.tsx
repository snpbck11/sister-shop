"use client";

import { Edit, Loader } from "lucide-react";
import Image from "next/image";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { DEFAULT_MAX } from "../config/storage";
import { Button } from "./Buttons";
import { FieldError } from "./Controls/shared/FieldError";
import { Label } from "./Controls/shared/Label";
import { cn } from "../lib/cn";

type IConfirmImageReplaceProps = {
  label?: string;
  value: string;
  onCommitAction: (file: File) => Promise<void>;
  disabled?: boolean;
  maxSizeBytes?: number;
};

export function ConfirmImageReplace({
  label,
  value,
  onCommitAction,
  disabled,
  maxSizeBytes = DEFAULT_MAX,
}: IConfirmImageReplaceProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickFile = () => {
    if (disabled || isLoading) return;
    inputRef.current?.click();
  };

  const onPicked: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    if (file.size > maxSizeBytes) {
      setError(`Файл слишком большой. Максимум ${Math.floor(maxSizeBytes / 1024 / 1024)}MB`);
      e.target.value = "";
      return;
    }

    setError(null);
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);

    const preview = URL.createObjectURL(file);
    setPendingFile(file);
    setPendingPreview(preview);

    e.target.value = "";
  };

  const cancel = () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(null);
    setPendingPreview(null);
    setError(null);
  };

  const commit = async () => {
    if (!pendingFile) return;

    setIsLoading(true);
    try {
      await onCommitAction(pendingFile);
      cancel();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    };
  }, []);

  const showSrc = pendingPreview || value;

  return (
    <div className="flex flex-col gap-1">
      {label && <Label label={label} />}
      <div className="relative group w-fit" onClick={pickFile}>
        <div className="relative">
          <Image
            src={showSrc}
            alt={label || ""}
            width={320}
            height={320}
            className="object-cover rounded-md border border-admin-border w-80 h-80"
            unoptimized={!!pendingPreview}
          />
          <button
            className={cn(
              "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md",
              isLoading && "opacity-100",
            )}>
            <span className="text-white font-medium">
              {!isLoading ? (
                pendingPreview ? (
                  "Выбрать другой"
                ) : (
                  "Изменить"
                )
              ) : (
                <Loader className="w-4 h-4 animate-spin text-gray-400" />
              )}
            </span>
          </button>
        </div>
        <Edit className="absolute top-2 right-2 w-10 h-10 md:hidden" />
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPicked} />
      </div>
      {pendingPreview && (
        <div className="flex gap-2">
          <Button onClick={cancel} disabled={isLoading} variant="secondary" size="sm">
            Отмена
          </Button>
          <Button
            onClick={commit}
            disabled={isLoading}
            variant="primary"
            size="sm"
            isLoading={isLoading}>
            Применить
          </Button>
        </div>
      )}
      {error && <FieldError className="static" error={error} />}
    </div>
  );
}
