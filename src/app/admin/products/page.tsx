import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminProductsPage() {
  // Здесь будет запрос к БД
  const products = [];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Товары</h1>
        <Link href="/admin/products/new">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Добавить товар
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 mb-4">Товары не найдены</p>
          <Link href="/admin/products/new">
            <Button variant="primary">Добавить первый товар</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left p-4">Товар</th>
                <th className="text-left p-4">Категория</th>
                <th className="text-left p-4">Цена</th>
                <th className="text-left p-4">Статус</th>
                <th className="text-right p-4">Действия</th>
              </tr>
            </thead>
            <tbody>
              {/* Тут будут товары */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
