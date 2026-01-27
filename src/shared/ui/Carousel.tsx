"use client";

import { cn } from "@/shared/lib/cn";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ChevronButton } from "./Buttons";

interface ICarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemsToShow?: number;
  gap?: number;
}

export function Carousel<T>({
  items,
  className,
  itemsToShow = 1,
  gap = 16,
  renderItem,
}: ICarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const maxIndex = items.length - itemsToShow;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const itemWidth = container.offsetWidth / itemsToShow;
    const scrollPosition = index * (itemWidth + gap);

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const goToPrev = () => {
    const newIndex = Math.max(0, currentIndex - itemsToShow);
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + itemsToShow);
    scrollToIndex(newIndex);
  };

  if (items.length === 0) return null;

  return (
    <div ref={containerRef} className="relative group">
      <div
        ref={scrollRef}
        className={cn(
          "flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory",
          className,
        )}
        style={{ gap: `${gap}px` }}>
        {items.map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              style={{
                width: `calc((100% - ${gap * (itemsToShow - 1)}px) / ${itemsToShow})`,
                flexShrink: 0,
              }}
              className="snap-start relative">
              {renderItem(item, index)}
            </motion.div>
          );
        })}
      </div>

      {items.length > itemsToShow && (
        <>
          <ChevronButton
            direction="left"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              currentIndex === 0
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover:opacity-100",
            )}
          />
          <ChevronButton
            direction="right"
            onClick={goToNext}
            disabled={currentIndex === maxIndex}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              currentIndex === maxIndex
                ? "opacity-0 pointer-events-none"
                : "opacity-0 group-hover:opacity-100",
            )}
          />
        </>
      )}
    </div>
  );
}
