"use client";

import { ICategory } from "@/entities/category";
import { ICollection } from "@/entities/collection";
import { IProductWithRelations, TCreateProductInput, TProductUpdatebleFields } from "@/entities/product";
import { IProductType } from "@/entities/product-type";
import { createProduct, deleteProduct, patchProduct } from "@/entities/product/api/client";
import { IUpdateProductData } from "@/entities/product/model/types";
import { ApiResponse } from "@/shared/api/http/types";
import { AdminPageLayout, Button, ConfirmModal, Table } from "@/shared/ui";
import { useMemo, useState } from "react";
import { tableHead } from "../lib/tableHead";
import AddProductDrawer from "./AddProductDrawer";
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";
import { ProductsTableRow } from "./ProductsTableRow";

interface IProductsTableProps {
  initialProducts: IProductWithRelations[];
  collections: ICollection[];
  categories: ICategory[];
  types: IProductType[];
}

export function ProductsTable({
  initialProducts,
  categories,
  collections,
  types,
}: IProductsTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<IProductWithRelations | null>(null);
  const [isAddProductDrawerOpen, setIsAddProductDrawerOpen] = useState(false);

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId],
  );

  const addProduct = async (data: TCreateProductInput) => {
    const res = await createProduct(data);

    if (!res.success) return { success: res.success, error: res.error };

    setProducts((prev) => [res.data, ...prev]);

    return { success: res.success, data: res.data };
  };

  const updateField = async <K extends TProductUpdatebleFields>(
    id: number,
    key: K,
    nextValue: IUpdateProductData[K],
  ): Promise<ApiResponse<IProductWithRelations>> => {
    const res = await patchProduct(id, { [key]: nextValue });

    if (!res.success) {
      return { success: res.success, error: res.error };
    }

    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...res.data } : p)));

    return { success: res.success, data: res.data };
  };

  const onConfirmDelete = async () => {
    if (!productToDelete) return;

    const { id } = productToDelete;

    const res = await deleteProduct(id);

    if (!res.success) {
      throw new Error(res.error);
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const categoriesOptions = categories.map((c) => ({ value: c.id, label: c.name }));
  const collectionsOptions = collections.map((c) => ({ value: c.id, label: c.name }));
  const typesOptions = types.map((t) => ({ value: t.id, label: t.name }));

  const handleOpenDrawer = () => {
    setIsAddProductDrawerOpen(true);
  };

  return (
    <AdminPageLayout
      title="Товары"
      addButtonCLick={handleOpenDrawer}
      addButtonText="Добавить товар">
      {products.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border border-admin-border">
          <p className="text-gray-500 mb-4">Товары не найдены</p>
          <Button variant="primary" onClick={handleOpenDrawer}>
            Добавить первый товар
          </Button>
        </div>
      ) : (
        <Table tableHead={tableHead}>
          {products.map((product) => (
            <ProductsTableRow
              key={product.id}
              product={product}
              onDelete={() => setProductToDelete(product)}
              onClick={() => setSelectedProductId(product.id)}
              updateField={updateField}
            />
          ))}
        </Table>
      )}
      <AddProductDrawer
        open={isAddProductDrawerOpen}
        onCreate={addProduct}
        onClose={() => setIsAddProductDrawerOpen(false)}
        collections={collectionsOptions}
        categories={categoriesOptions}
        types={typesOptions}
      />
      <ProductDetailsDrawer
        open={!!selectedProduct}
        onClose={() => setSelectedProductId(null)}
        product={selectedProduct}
        categories={categoriesOptions}
        collections={collectionsOptions}
        updateField={updateField}
      />
      <ConfirmModal
        isOpen={!!productToDelete}
        confirmVariant="danger"
        title={"Удаление товара"}
        description={`Действительно удалить товар "${productToDelete?.title}"?`}
        onConfirm={onConfirmDelete}
        onClose={() => setProductToDelete(null)}
      />
    </AdminPageLayout>
  );
}
