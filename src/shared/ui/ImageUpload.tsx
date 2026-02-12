"use client";

import { cn } from "@/shared/lib/cn";
import { DeleteButton, ErrorMessage } from "@/shared/ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { DEFAULT_MAX } from "../config/storage";
import { FieldError } from "./Controls/shared/FieldError";
import { Label } from "./Controls/shared/Label";

type FileWithPreview = File & { preview: string };

interface ImageUploadProps {
  label?: string;
  onChange: (files: File[]) => void;
  multiple?: boolean;
  error?: string;
  maxSizeBytes?: number;
  accept?: Record<string, string[]>;
  required?: boolean;
}

export function ImageUpload({
  label,
  onChange,
  multiple = false,
  error,
  maxSizeBytes = DEFAULT_MAX,
  accept = {
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
    "image/webp": [".webp"],
  },
  required = false,
}: ImageUploadProps) {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = async (droppedFiles: File[]) => {
    if (!droppedFiles.length) return;
    setUploadError(null);

    for (const f of droppedFiles) {
      if (f.size > maxSizeBytes) {
        setUploadError(
          `Файл ${f.name} слишком большой. Максимум ${Math.floor(maxSizeBytes / 1024 / 1024)}MB`,
        );
        return;
      }
    }

    const filesWithPreview: FileWithPreview[] = droppedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    const newFiles = multiple ? [...files, ...filesWithPreview] : [filesWithPreview[0]!];
    setFiles(newFiles);
    onChange(newFiles);
  };

  const onDropRejected = (rejections: FileRejection[]) => {
    const r = rejections[0];
    if (!r) return;

    const errs = r.errors;
    if (errs.some((e) => e.code === "file-too-large")) {
      setUploadError(
        `Файл ${r.file.name} слишком большой. Максимум ${Math.floor(maxSizeBytes / 1024 / 1024)}MB`,
      );
      return;
    }
    if (errs.some((e) => e.code === "file-invalid-type")) {
      setUploadError(`Недопустимый формат файла ${r.file.name}. Разрешены: JPG, PNG, WebP`);
      return;
    }
    setUploadError(errs[0]?.message || "Файл отклонен");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    maxSize: DEFAULT_MAX,
    multiple,
  });

  const removeFile = (idx: number) => {
    setUploadError(null);
    const newFiles = files.filter((_, i) => i !== idx);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const showDropzone = multiple || files.length === 0;

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="space-y-2">
      {label && <Label label={label} required={required} />}
      {showDropzone && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
            isDragActive && "border-blue-500 bg-blue-50 dark:bg-blue-950",
            (error || uploadError) && "border-red-500",
          )}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-500 text-sm">Отпускайте файлы сюда...</p>
          ) : (
            <p className="text-gray-500 text-sm">
              Нажмите или перетащите {multiple ? "изображения" : "изображение"}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            До {Math.floor(maxSizeBytes / 1024 / 1024)}MB • JPG/PNG/WebP
          </p>
        </div>
      )}
      {files.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {files.map((file, index) => (
            <div key={file.name} className="relative group">
              {!multiple ? (
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <Image
                    src={file.preview}
                    alt={`Превью ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover rounded-md border border-admin-border w-50 h-50"
                    unoptimized
                  />
                </div>
              ) : (
                <Image
                  src={file.preview}
                  alt={`Превью ${index + 1}`}
                  width={120}
                  height={120}
                  className="object-cover rounded-md border border-admin-border w-30 h-30"
                  unoptimized
                />
              )}
              <DeleteButton
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 hidden group-hover:block"
              />
            </div>
          ))}
        </div>
      )}
      {error && <FieldError className="static" error={error} />}
      {uploadError && <ErrorMessage error={uploadError} />}
    </div>
  );
}
