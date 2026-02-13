"use client";

import {
  IProductWithRelations,
  IUpdateProductData,
  TProductUpdatebleFields,
} from "@/entities/product";
import { ApiResponse } from "@/shared/api/http/types";
import { deleteFile, uploadFiles } from "@/shared/api/storage";
import { updateFile } from "@/shared/api/storage/client";
import {
  ConfirmGalleryUpdate,
  ConfirmImageReplace,
  Drawer,
  EditableMultiSelect,
  EditableSelect,
  ISelectOption,
  Skeleton,
} from "@/shared/ui";
import { EditableField } from "@/shared/ui/EditableField";
import { ChevronRight } from "lucide-react";
import { DetailsField } from "./DetailsField";
import { SizesEditor } from "./SizesEditor";

interface IProductDetailsDrawerProps {
  open: boolean;
  onClose: () => void;
  product: IProductWithRelations | null;
  categories: ISelectOption[];
  collections: ISelectOption[];
  updateField: <K extends TProductUpdatebleFields>(
    id: number,
    key: K,
    nextValue: IUpdateProductData[K],
  ) => Promise<ApiResponse<IProductWithRelations>>;
}

export function ProductDetailsDrawer({
  open,
  onClose,
  product,
  categories,
  collections,
  updateField,
}: IProductDetailsDrawerProps) {
  const safeUpdate = async <K extends TProductUpdatebleFields>(
    key: K,
    nextValue: IUpdateProductData[K],
  ) => {
    if (!product) return;
    return await updateField(product.id, key, nextValue);
  };

  const onDeleteGalleryImage = async (url: string) => {
    const remove = await deleteFile(url);

    if (!remove) return;

    const updated = product?.gallery.filter((item) => item !== url);

    await safeUpdate("gallery", updated);
  };

  const onSaveImage = async (file: File, field: "hoverImage" | "image") => {
    if (!product) return;

    const oldUrls = product[field];

    const newUrls = await updateFile(file, oldUrls, "products", product.slug);

    await safeUpdate(field, newUrls);
  };

  const onSaveGalleryImage = async (files: File[]) => {
    if (!product) return;

    const newUrls = await uploadFiles(files, "products", product.slug);
    const updatedUrls = [...product.gallery, ...newUrls];

    await safeUpdate("gallery", updatedUrls);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      drawerClassname="w-full max-w-5xl"
      headerContent={
        <div className="bg-admin-background border-b border-admin-border flex items-center justify-between p-4">
          <ChevronRight
            className="w-8 h-8 cursor-pointer text-black dark:text-white"
            onClick={onClose}
          />
          <h1 className="text-3xl font-bold">Карточка товара</h1>
        </div>
      }>
      <div className="h-full overflow-auto bg-admin-sidebar-background p-6 space-y-8">
        {!product ? (
          <div className="space-y-4 ">
            <Skeleton className="h-8 w-1/3 " />
            <Skeleton className="h-24" />
            <Skeleton className="h-64" />
          </div>
        ) : (
          <>
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Основная информация</h2>
              <div className="space-y-3">
                <DetailsField title="Название">
                  <EditableField
                    value={product.title}
                    onSave={(value) => safeUpdate("title", value)}
                  />
                </DetailsField>
                <DetailsField title="Slug">
                  <code className="block p-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                    {product.slug}
                  </code>
                </DetailsField>
                <DetailsField title="Описание">
                  <EditableField
                    value={product.description || "-"}
                    onSave={(value) => safeUpdate("description", value)}
                  />
                </DetailsField>
                <DetailsField title="Категория">
                  <EditableSelect
                    value={product.categoryId}
                    displayValue={product.category.name}
                    options={categories}
                    onSave={(value) => safeUpdate("categoryId", value)}
                  />
                </DetailsField>
                <DetailsField title="Коллекции">
                  <EditableMultiSelect
                    value={product.collections.map((c) => c.id)}
                    displayValues={product.collections}
                    options={collections}
                    onSave={(value) => safeUpdate("collections", value)}
                  />
                </DetailsField>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Изображения</h2>
              <div className="flex flex-wrap gap-6">
                <ConfirmImageReplace
                  label="Основное изображение"
                  value={product.image}
                  onCommitAction={(file) => onSaveImage(file, "image")}
                />
                <ConfirmImageReplace
                  label="Изображение при наведении"
                  value={product.hoverImage}
                  onCommitAction={(file) => onSaveImage(file, "hoverImage")}
                />
              </div>
            </section>
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Галерея</h2>
              </div>
              <ConfirmGalleryUpdate
                value={product.gallery}
                onAddImagesAction={(files) => onSaveGalleryImage(files)}
                onRemoveImageAction={(url) => onDeleteGalleryImage(url)}
              />
            </section>
            <SizesEditor
              value={product.sizes}
              onChange={(nextValue) => safeUpdate("sizes", nextValue)}
            />
          </>
        )}
      </div>
    </Drawer>
  );
}
