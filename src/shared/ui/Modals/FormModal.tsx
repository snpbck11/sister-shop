import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { FormEvent, ReactNode } from "react";
import { Button } from "../Buttons";
import { LoadingLayout } from "../Layouts";
import { Modal } from "./Modal";

interface IFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitText?: string;
  submittingText?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  isSubmitting?: boolean;
  children: ReactNode;
  error?: string | null;
}

export function FormModal({
  isOpen,
  onClose,
  title,
  submitText = "Сохранить",
  submittingText = "Сохранение...",
  onSubmit,
  isSubmitting = false,
  children,
  error,
}: IFormModalProps) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    onSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-xl w-full p-4">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting} className="space-y-4">
            <LoadingLayout isLoading={isSubmitting} />
            {error && <ErrorMessage error={error} />}
            {children}
            <div className="flex gap-3 pt-2">
              <Button type="submit">{isSubmitting ? submittingText : submitText}</Button>
              <Button type="button" variant="secondary" onClick={onClose}>
                Отмена
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </Modal>
  );
}
