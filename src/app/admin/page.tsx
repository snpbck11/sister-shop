import { getCategories, getCollections, getProducts } from "@/shared/server/db";
import { DollarSign, Library, Package, ShoppingBag, Users } from "lucide-react";

export default async function AdminDashboard() {
  const [products, collections, categories] = await Promise.all([
    getProducts(),
    getCollections(),
    getCategories(),
  ]);

  const stats = [
    { label: "Всего товаров", value: products.length, icon: Package, color: "bg-blue-500" },
    { label: "Категорий", value: categories.length, icon: ShoppingBag, color: "bg-green-500" },
    { label: "Коллекций", value: collections.length, icon: Library, color: "bg-purple-500" },
    { label: "Заказов", value: "48", icon: Users, color: "bg-purple-500" },
    { label: "Выручка", value: "₽48,920", icon: DollarSign, color: "bg-yellow-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Панель управления (Пока просто заглушка)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Последние заказы</h2>
          <p className="text-gray-500">Здесь будет список последних заказов</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Популярные товары</h2>
          <p className="text-gray-500">Здесь будет список популярных товаров</p>
        </div>
      </div>
    </div>
  );
}
