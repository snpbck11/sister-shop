"use client";

import { cn } from "@/shared/lib/cn";
import { ChevronButton } from "@/shared/ui";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface IProductGalleryProps {
  images: string[];
  title: string;
}

const clampIndex = (i: number, len: number) => {
  return ((i % len) + len) % len;
};

const slideVariants = {
  enter: (d: number) => ({ x: `${d * 105}%` }),
  center: { x: "0%" },
  exit: (d: number) => ({ x: `${d * -105}%` }),
};

export function ProductGallery({ images, title }: IProductGalleryProps) {
  const [inlineIndex, setInlineIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMobileZoom, setIsMobileZoom] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const draggedRef = useRef(false);
  const len = images.length;
  const panControls = useAnimationControls();

  const toggleZoom = useCallback(async () => {
    if (isZoomed) {
      await panControls.start({ x: 0, y: 0, transition: { duration: 0.2, ease: "easeOut" } });
    }
    setIsZoomed((v) => !v);
  }, [isZoomed, panControls]);

  const goTo = (nextIndex: number, currentIndex: number, set: (v: number) => void) => {
    const ni = clampIndex(nextIndex, len);
    setDirection(ni > currentIndex ? 1 : -1);
    set(ni);

    if (isFullscreen) {
      setIsZoomed(false);
      setIsDragging(false);
      panControls.set({ x: 0, y: 0 });
    }
  };

  const nextInline = () => goTo(inlineIndex + 1, inlineIndex, setInlineIndex);
  const prevInline = () => goTo(inlineIndex - 1, inlineIndex, setInlineIndex);

  const nextModal = () => goTo(modalIndex + 1, modalIndex, setModalIndex);
  const prevModal = () => goTo(modalIndex - 1, modalIndex, setModalIndex);

  const onImageTap = () => {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }

    if (isMobileZoom) return;
    toggleZoom();
  };

  const openFullscreen = () => {
    setModalIndex(inlineIndex);
    setIsFullscreen(true);
  };

  const openMobileZoom = () => {
    setModalIndex(inlineIndex);
    setIsFullscreen(true);
    setIsMobileZoom(true);
    setIsZoomed(true);
  };

  const closeGallery = useCallback(() => {
    setIsFullscreen(false);
    setIsMobileZoom(false);
    setIsZoomed(false);
    setIsDragging(false);
    panControls.set({ x: 0, y: 0 });
  }, [panControls]);

  const onSlideDragEnd = (
    _: unknown,
    info: { offset: { x: number } },
    next: () => void,
    prev: () => void,
  ) => {
    const dx = info.offset.x;
    if (Math.abs(dx) < 60) return;
    if (dx < 0) next();
    else prev();
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) {
          toggleZoom();
        } else {
          closeGallery();
        }
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isFullscreen, isZoomed, isMobileZoom, toggleZoom, closeGallery]);

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-6">
        <h2 className="text-xl text-foreground sm:hidden text-center mt-3">{title}</h2>
        <div className="flex items-center justify-center">
          {len > 1 && (
            <motion.button
              type="button"
              onClick={prevInline}
              whileHover={{ x: -3, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer z-20 shrink-0 hidden lg:inline-block"
              aria-label="Предыдущее">
              <ChevronLeft className="w-12 h-12 text-black dark:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
            </motion.button>
          )}

          <div className="flex flex-col gap-4 w-full lg:max-w-137.5">
            <div className="relative aspect-square overflow-hidden">
              {len > 1 && (
                <>
                  <ChevronButton
                    onClick={prevInline}
                    className={
                      "absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-block lg:hidden"
                    }
                    direction="left"
                  />
                  <ChevronButton
                    onClick={nextInline}
                    className={
                      "absolute right-2 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-block lg:hidden"
                    }
                    direction="right"
                  />
                </>
              )}

              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={inlineIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(e, info) => {
                    onSlideDragEnd(e, info, nextInline, prevInline);
                  }}>
                  <Image
                    src={images[inlineIndex]}
                    alt={`${title} - изображение ${inlineIndex + 1}`}
                    fill
                    className="object-cover"
                    priority={inlineIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={openFullscreen}
                className="hidden md:block absolute inset-0 cursor-zoom-in"
                aria-label="Открыть галерею"
              />

              <button
                type="button"
                onClick={openMobileZoom}
                className="md:hidden absolute top-3 right-3 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors flex items-center justify-center z-10"
                aria-label="Открыть с зумом">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {len > 1 && (
            <motion.button
              type="button"
              onClick={nextInline}
              whileHover={{ x: 3, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer z-20 shrink-0 hidden lg:inline-block"
              aria-label="Следующее">
              <ChevronRight className="w-12 h-12 text-black dark:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
            </motion.button>
          )}
        </div>

        {len > 1 && (
          <div className="flex gap-2 overflow-x-auto sm:flex-wrap justify-center">
            {images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => goTo(i, inlineIndex, setInlineIndex)}
                className={cn(
                  "relative shrink-0 w-12.5 h-12.5 sm:w-17 sm:h-17 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                  "border-transparent hover:border-gray-300 dark:hover:border-gray-700",
                  i === inlineIndex && "border-black dark:border-white",
                )}
                aria-label={`Перейти к изображению ${i + 1}`}>
                <Image
                  src={img}
                  alt={`${title} - миниатюра ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* модалка */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hide-overflow fixed inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
            onClick={closeGallery}>
            <div
              className={cn(
                "relative w-full h-full overflow-hidden",
                !isZoomed && "cursor-zoom-in",
                isZoomed && !isDragging && "cursor-grab",
                isZoomed && isDragging && "cursor-grabbing",
              )}
              onClick={(e) => {
                e.stopPropagation();
                onImageTap();
              }}
              style={{ touchAction: "none" }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={modalIndex}
                  custom={direction}
                  initial={{ x: direction * 105 + "%" }}
                  animate={{ x: 0 }}
                  exit={{ x: direction * -105 + "%" }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                  drag={isZoomed ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragStart={() => {
                    draggedRef.current = true;
                  }}
                  onDragEnd={(e, info) => {
                    if (isZoomed) return;
                    onSlideDragEnd(e, info, nextModal, prevModal);
                  }}>
                  <motion.div
                    className="relative w-full h-full"
                    animate={panControls}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag={isZoomed}
                    dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                    dragElastic={0.06}
                    onDragStart={() => {
                      draggedRef.current = true;
                      setIsDragging(true);
                    }}
                    onDragEnd={() => {
                      setTimeout(() => {
                        draggedRef.current = false;
                        setIsDragging(false);
                      }, 0);
                    }}>
                    <Image
                      src={images[modalIndex]}
                      alt={`${title} - изображение ${modalIndex + 1}`}
                      fill
                      draggable={false}
                      className={cn("select-none", "object-contain", isZoomed && "scale-150")}
                    />
                    {/* хуета из жопы а не зум, переделать, пока оставлю так */}
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="flex items-center gap-4">
                  {len > 1 && (
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevModal();
                      }}
                      whileHover={{ x: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-foreground shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow cursor-pointer"
                      aria-label="Предыдущее">
                      <ChevronLeft className="w-6 h-6 text-background" />
                    </motion.button>
                  )}

                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeGallery();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-foreground shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow cursor-pointer"
                    aria-label="Закрыть">
                    <X className="w-8 h-8 text-background" />
                  </motion.button>

                  {len > 1 && (
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextModal();
                      }}
                      whileHover={{ x: 4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full bg-foreground shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow cursor-pointer"
                      aria-label="Следующее">
                      <ChevronRight className="w-6 h-6 text-background" />
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
