"use client";

import { ProductCard } from "@/entities/product";
import { IProduct } from "@/entities/product/model/types";
import { cn } from "@/shared/lib/cn";
import { Button, Drawer, Radio } from "@/shared/ui";
import { motion } from "framer-motion";
import { ChevronRight, Grid3X3, LayoutGrid, SlidersHorizontal, Square } from "lucide-react";
import { useMemo, useState } from "react";

interface IProductsGridProps {
  products: IProduct[];
}

type FilterType = "all" | "bracers" | "chokers";

const iconClass = (isActive: boolean) =>
  cn(
    "transition-colors duration-300",
    isActive ? "text-black dark:text-white" : "text-gray-400 dark:text-gray-600",
  );

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export function ProductsGrid({ products }: IProductsGridProps) {
  const [gridMode, setGridMode] = useState<"compact" | "wide">("wide");
  const [filter, setFilter] = useState<FilterType>("all");
  const [tempFilter, setTempFilter] = useState<FilterType>("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(8);

  const filteredItems = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((item) => item.collections.includes(filter));
  }, [products, filter]);

  const displayedItems = useMemo(
    () => filteredItems.slice(0, itemsToShow),
    [filteredItems, itemsToShow],
  );

  const hasMore = itemsToShow < filteredItems.length;
  const progress = filteredItems.length === 0 ? 0 : (filteredItems.length / products.length) * 100;

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 8);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTempFilter(filter);
  };

  return (
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
            <Grid3X3 size={24} className={cn("hidden sm:block", iconClass(gridMode === "wide"))} />
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
        variants={containerVariants}
        animate="animate"
        className={cn(
          "grid gap-2 sm:gap-6 md:gap-8 w-full",
          gridMode === "compact" && "sm:grid-cols-2",
          gridMode === "wide" && "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4",
        )}>
        {displayedItems.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}>
            <ProductCard
              key={product.id}
              slug={product.slug}
              image={product.image}
              hoverImage={product.hoverImage}
              title={product.title}
              cost={product.price}
              alt={product.title}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-12">Товары не найдены</p>
      )}

      {filteredItems.length > 0 && (
        <div className="mt-12 mx-auto space-y-4 max-w-50">
          <div className="space-y-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center block">
              Показано {displayedItems.length} из {products.length}
            </span>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          {hasMore && <Button>Показать ещё</Button>}
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
                className="w-8 h-8 cursor-pointer text-black dark:text-white"
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
                name="category"
                value="all"
                label="Все товары"
                checked={tempFilter === "all"}
                onChange={(e) => setTempFilter(e.target.value as FilterType)}
              />
              <Radio
                id="filter-chokers"
                name="category"
                value="chokers"
                label="Чокеры"
                checked={tempFilter === "chokers"}
                onChange={(e) => setTempFilter(e.target.value as FilterType)}
              />
              <Radio
                id="filter-bracers"
                name="category"
                value="bracers"
                label="Браслеты"
                checked={tempFilter === "bracers"}
                onChange={(e) => setTempFilter(e.target.value as FilterType)}
              />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            <Button
              onClick={() => {
                setFilter(tempFilter);
                setItemsToShow(8);
                setIsDrawerOpen(false);
              }}
              className="w-full">
              Применить
            </Button>
          </motion.div>
        </div>
      </Drawer>
    </div>
  );
}
