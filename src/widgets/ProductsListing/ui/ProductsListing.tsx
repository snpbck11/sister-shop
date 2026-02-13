"use client";

import type { IStorefrontProductCard, IStorefrontProductsPage } from "@/entities/product";
import { ProductCard } from "@/entities/product";
import type { IProductType } from "@/entities/product-type";
import { ApiResponse } from "@/shared/api/http/types";
import { cn } from "@/shared/lib/cn";
import { Button, Drawer, Radio } from "@/shared/ui";
import { motion } from "framer-motion";
import { ChevronRight, Grid3X3, LayoutGrid, SlidersHorizontal, Square } from "lucide-react";
import { useMemo, useState } from "react";
import { iconClass } from "../lib/iconClass";

type TFilterType = "all" | number;

interface IProductsListingProps {
  title: string;
  description?: string;
  initial: IStorefrontProductsPage;
  types: IProductType[];
  loadMore: (cursor: string) => Promise<ApiResponse<IStorefrontProductsPage>>;
}

export function ProductsListing({
  title,
  description,
  initial,
  types,
  loadMore,
}: IProductsListingProps) {
  const [gridMode, setGridMode] = useState<"compact" | "wide">("wide");
  const [filter, setFilter] = useState<TFilterType>("all");
  const [tempFilter, setTempFilter] = useState<TFilterType>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [items, setItems] = useState<IStorefrontProductCard[]>(initial.items);
  const [nextCursor, setNextCursor] = useState<string | null>(initial.nextCursor);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((p) => p.typeId === filter);
  }, [items, filter]);

  const total = initial.total;
  const progress = total === 0 ? 0 : (items.length / total) * 100;

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTempFilter(filter);
  };

  const handleLoadMore = async () => {
    if (!nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const page = await loadMore(nextCursor);

      if (!page.success) throw new Error("Ошибка при загрузке товаров");

      const { data } = page;

      setItems((prev) => {
        const seen = new Set(prev.map((x) => x.id));
        const merged = [...prev];
        for (const x of data.items) if (!seen.has(x.id)) merged.push(x);
        return merged;
      });

      setNextCursor(data.nextCursor);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="p-2 pb-10 sm:p-5">
      <h2 className="text-sm text-center uppercase tracking-widest mb-2">{title}</h2>
      {description && <p className="mb-4 text-center tracking-widest">{description}</p>}

      {items.length === 0 && (
        <p className="text-center text-gray-500 mt-12">В этой коллекции пока нет товаров</p>
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <button onClick={() => setGridMode("compact")} className="cursor-pointer">
              <Square size={24} className={cn("sm:hidden", iconClass(gridMode === "compact"))} />
              <LayoutGrid
                size={24}
                className={cn("hidden sm:block", iconClass(gridMode === "compact"))}
              />
            </button>
            <button onClick={() => setGridMode("wide")} className="cursor-pointer">
              <LayoutGrid size={24} className={cn("sm:hidden", iconClass(gridMode === "wide"))} />
              <Grid3X3
                size={24}
                className={cn("hidden sm:block", iconClass(gridMode === "wide"))}
              />
            </button>
          </div>

          <button
            onClick={() => {
              setTempFilter(filter);
              setIsDrawerOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer">
            <SlidersHorizontal size={18} />
            <span className="text-sm uppercase tracking-widest">Фильтр</span>
          </button>
        </div>

        <motion.div
          layout
          variants={{
            animate: { transition: { staggerChildren: 0.04 } },
          }}
          animate="animate"
          className={cn(
            "grid gap-2 sm:gap-6 md:gap-8 w-full",
            gridMode === "compact" && "sm:grid-cols-2",
            gridMode === "wide" && "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4",
          )}>
          {filteredItems.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && items.length > 0 && (
          <p className="text-center text-gray-500 mt-12">Товары не найдены</p>
        )}

        {items.length > 0 && (
          <div className="mt-12 mx-auto space-y-4 max-w-50">
            <div className="space-y-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center block">
                Показано {items.length} из {total}
              </span>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {nextCursor && (
              <Button onClick={handleLoadMore} disabled={isLoadingMore} className="w-full">
                {isLoadingMore ? "Загрузка..." : "Показать ещё"}
              </Button>
            )}
          </div>
        )}

        <Drawer
          open={isDrawerOpen}
          onClose={handleCloseDrawer}
          drawerClassname="w-full max-w-md"
          anchor="right"
          headerContent={
            <div className="border-b border-gray-500 flex items-center justify-between p-4">
              <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                <ChevronRight
                  className="w-8 h-8 cursor-pointer text-foreground"
                  onClick={handleCloseDrawer}
                />
              </motion.div>
              <h3 className="text-sm font-semibold uppercase tracking-widest">Фильтры</h3>
            </div>
          }>
          <div className="p-6 flex flex-col h-full">
            <div className="flex-1">
              <div className="flex flex-col gap-3">
                <Radio
                  id="filter-all"
                  name="type"
                  value="all"
                  label="Все товары"
                  checked={tempFilter === "all"}
                  onChange={(e) => setTempFilter(e.target.value as TFilterType)}
                />
                {types.map((type) => (
                  <Radio
                    key={type.id}
                    id={`filter-${type.id}`}
                    name="type"
                    value={type.id}
                    label={type.name}
                    checked={tempFilter === type.id}
                    onChange={(e) => setTempFilter(Number(e.target.value) as TFilterType)}
                  />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}>
              <Button
                onClick={() => {
                  setFilter(tempFilter);
                  setIsDrawerOpen(false);
                }}
                className="w-full">
                Применить
              </Button>
            </motion.div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
