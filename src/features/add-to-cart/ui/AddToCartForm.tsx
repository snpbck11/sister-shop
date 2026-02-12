"use client";

import { IProductSize } from "@/entities/product-size";
import { useCartStore } from "@/features/cart";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui";
import { useRef, useState } from "react";

interface IAddToCartFormProps {
  productId: number;
  productSlug: string;
  title: string;
  image: string;
  sizes: IProductSize[];
}

export function AddToCartForm({
  productId,
  productSlug,
  title,
  image,
  sizes,
}: IAddToCartFormProps) {
  const { addItem } = useCartStore();
  const [price, setPrice] = useState(sizes[0].price);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSizeChange = (priceOption: IProductSize) => {
    setSelectedSize(priceOption);
    setPrice(priceOption.price);
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    addItem({
      id: productId,
      slug: productSlug,
      title,
      image,
      price: selectedSize.price,
      size: selectedSize.name,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-col gap-2 w-full max-w-115">
        <h2 className="text-xl font-bold hidden sm:inline">{title}</h2>
        <div className="text-3xl font-semibold">{price} ₽</div>
        <div className="flex flex-col">
          <div className="flex justify-between relative">
            <p className="font-medium mb-2">Выберите размер:</p>
            {/* <button
              ref={buttonRef}
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
              <Ruler className="w-4 h-4" />
              <p>Примеры размеров</p>
            </button> */}
          </div>
          <ul className={cn("grid grid-cols-1 gap-4", sizes.length > 1 && "grid-cols-2")}>
            {sizes.map((size) => (
              <div
                key={size.id}
                className={cn(
                  "w-full flex justify-between cursor-pointer py-2 px-2.5 ring-1 ring-gray-500 transition-all",
                  selectedSize.name === size.name &&
                    "ring-foreground ring-offset-2 ring-offset-foreground",
                )}
                onClick={() => handleSizeChange(size)}>
                <p className="uppercase">{size.name}</p>
                <p className="uppercase">{size.description}</p>
              </div>
            ))}
          </ul>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="mt-6"
          variant="secondary"
          size="lg">
          {isAdding ? "Добавлено" : "Добавить в корзину"}
        </Button>

        {/* пока повременим с этим, подумать нужно ли это */}
        {/* <Dialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          anchorRef={buttonRef}
          anchor="bottom-left"
          className="w-105">
          <div className="grid grid-cols-2 gap-4">
            {prices.map((priceItem) => (
              <button
                key={priceItem.size}
                onClick={() => {
                  handleSizeChange(priceItem);
                  setIsDialogOpen(false);
                }}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 cursor-pointer",
                  "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500",
                  selectedSize.size === priceItem.size && "border-black dark:border-white",
                )}>
                <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400 dark:text-gray-500">
                    {priceItem.size}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm text-white text-xs py-1.5 px-2 text-center">
                  <div className="font-semibold">{priceItem.size} см</div>
                </div>
              </button>
            ))}
          </div>
        </Dialog> */}
      </div>
    </div>
  );
}
