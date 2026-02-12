"use client";

import { Button, DeleteButton, ErrorMessage, Input } from "@/shared/ui";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type { TCreateProductForm } from "../model/formSchema";

interface ISizesManagerProps {
  control: Control<TCreateProductForm>;
  register: UseFormRegister<TCreateProductForm>;
  errors?: FieldErrors<TCreateProductForm>;
  disabled?: boolean;
  lockEditing?: boolean;
}

export function SizesManager({
  control,
  register,
  errors,
  disabled = false,
  lockEditing = false,
}: ISizesManagerProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const addSize = () => {
    append({ name: "", description: "", price: 0 });
  };

  const inputsDisabled = disabled || lockEditing;
  const actionsDisabled = disabled;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Размеры и цены</h2>
        <Button type="button" variant="secondary" onClick={addSize} disabled={actionsDisabled}>
          Добавить размер
        </Button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-2 gap-4 items-start p-4 border border-admin-border rounded-lg">
            <Input
              label="Название"
              id={`sizes.${index}.name`}
              placeholder="S, M, L..."
              disabled={inputsDisabled}
              {...register(`sizes.${index}.name`)}
              error={errors?.sizes?.[index]?.name?.message}
            />

            <Input
              label="Описание"
              id={`sizes.${index}.description`}
              placeholder="Например: 35-36 см"
              disabled={inputsDisabled}
              {...register(`sizes.${index}.description`)}
              error={errors?.sizes?.[index]?.description?.message}
            />

            <Input
              label="Цена (₽)"
              id={`sizes.${index}.price`}
              type="number"
              placeholder="1500"
              disabled={inputsDisabled}
              {...register(`sizes.${index}.price`, { valueAsNumber: true })}
              error={errors?.sizes?.[index]?.price?.message}
            />

            {index !== 0 && (
              <div className="flex items-center h-full">
                <DeleteButton onClick={() => remove(index)} disabled={actionsDisabled} />
              </div>
            )}
          </div>
        ))}
      </div>

      {errors?.sizes?.message && <ErrorMessage error={String(errors.sizes.message)} />}
    </div>
  );
}
