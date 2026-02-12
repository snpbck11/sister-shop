"use client";

import { useState } from "react";
import { Button } from "../Buttons";
import { Modal } from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "secondary" | "danger";
  onConfirm: () => Promise<unknown>;
  onClose: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  confirmVariant = "primary",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    try {
      setError(null);
      setLoading(true);
      await onConfirm();
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Произошла ошибка. Попробуйте ещё раз");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && <p className="mt-2 text-lg text-muted-foreground">{description}</p>}
        {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <div className="flex gap-3 pt-4 justify-end">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={handleClose}
            disabled={loading}>
            {cancelText}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={loading}
            isLoading={loading}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
