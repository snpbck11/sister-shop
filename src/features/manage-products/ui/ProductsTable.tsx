"use client";

import { ICategory } from "@/entities/category";
import { ICollection } from "@/entities/collection";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  IAdminProductsPage,
  IProductWithRelations,
  IUpdateProductData,
  patchProduct,
  TCreateProductInput,
  TProductUpdatebleFields,
} from "@/entities/product";
import { IProductType } from "@/entities/product-type";
import { ApiResponse } from "@/shared/api/http/types";
import { AdminPageLayout, Button, ConfirmModal, Table } from "@/shared/ui";
import { useMemo, useState } from "react";
import { tableHead } from "../lib/tableHead";
import AddProductDrawer from "./AddProductDrawer";
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";
import { ProductsTableRow } from "./ProductsTableRow";

interface IProductsTableProps {
  initialPage: IAdminProductsPage;
  collections: ICollection[];
  categories: ICategory[];
  types: IProductType[];
}

export function ProductsTable({
  initialPage,
  categories,
  collections,
  types,
}: IProductsTableProps) {
  const [pageData, setPageData] = useState<IAdminProductsPage>(initialPage);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [productToDelete, setProductToDelete] = useState<IProductWithRelations | null>(null);
  const [isAddProductDrawerOpen, setIsAddProductDrawerOpen] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const products = pageData.items;

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId) || null,
    [products, selectedProductId],
  );

  const categoriesOptions = categories.map((c) => ({ value: c.id, label: c.name }));
  const collectionsOptions = collections.map((c) => ({ value: c.id, label: c.name }));
  const typesOptions = types.map((t) => ({ value: t.id, label: t.name }));

  const handleOpenDrawer = () => setIsAddProductDrawerOpen(true);

  const loadPage = async (nextPage: number) => {
    if (isLoadingPage) return;
    if (nextPage < 1 || nextPage > pageData.meta.pages) return;

    setIsLoadingPage(true);
    const res = await getAdminProducts({ page: nextPage, limit: pageData.meta.limit });

    if (res.success) {
      setPageData(res.data);
      setSelectedProductId(null);
    }

    setIsLoadingPage(false);
  };

  const addProduct = async (data: TCreateProductInput) => {
    const res = await createProduct(data);

    if (!res.success) throw new Error(res.error);

    await loadPage(1);

    setPageData((prev) => ({
      ...prev,
      items: [res.data, ...prev.items],
    }));

    return { success: res.success, data: res.data };
  };

  const updateField = async <K extends TProductUpdatebleFields>(
    id: number,
    key: K,
    nextValue: IUpdateProductData[K],
  ): Promise<ApiResponse<IProductWithRelations>> => {
    const res = await patchProduct(id, { [key]: nextValue });

    if (!res.success) throw new Error(res.error);

    setPageData((prev) => ({
      ...prev,
      items: prev.items.map((p) => (p.id === id ? { ...p, ...res.data } : p)),
    }));

    return { success: true, data: res.data };
  };

  const onConfirmDelete = async () => {
    if (!productToDelete) return;

    const res = await deleteProduct(productToDelete.id);

    if (!res.success) throw new Error(res.error);

    const isLastOnPage = pageData.items.length === 1;
    const nextPage = isLastOnPage ? Math.max(pageData.meta.page - 1, 1) : pageData.meta.page;

    await loadPage(nextPage);
    setProductToDelete(null);
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
        <Table
          tableHead={tableHead}
          pagination={{
            page: pageData.meta.page,
            pages: pageData.meta.pages,
            onChange: loadPage,
          }}
          isLoading={isLoadingPage}>
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
