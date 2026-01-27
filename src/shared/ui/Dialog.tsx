"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, RefObject, useLayoutEffect, useRef, useState } from "react";
import { CloseButton } from "./Buttons";


// переписать, не нравится мне такой
type AnchorPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom";

interface IDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  anchorRef: RefObject<HTMLElement | null>;
  anchor?: AnchorPosition;
  title?: string;
  className?: string;
  showCloseButton?: boolean;
}

const SPACING = 8;

export function Dialog({
  isOpen,
  onClose,
  children,
  anchorRef,
  anchor = "bottom-right",
  title,
  className,
  showCloseButton = true,
}: IDialogProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dialogRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current || !dialogRef.current) return;

    const updatePosition = () => {
      const anchorRect = anchorRef.current?.getBoundingClientRect();
      const dialogRect = dialogRef.current?.getBoundingClientRect();
      if (!anchorRect || !dialogRect) return;

      let top = 0;
      let left = 0;

      switch (anchor) {
        case "top-left":
          top = anchorRect.top - dialogRect.height - SPACING;
          left = anchorRect.right - dialogRect.width;
          break;
        case "top-center":
          top = anchorRect.top - dialogRect.height - SPACING;
          left = anchorRect.left + anchorRect.width / 2 - dialogRect.width / 2;
          break;
        case "top-right":
          top = anchorRect.top - dialogRect.height - SPACING;
          left = anchorRect.left;
          break;
        case "bottom-left":
          top = anchorRect.bottom + SPACING;
          left = anchorRect.right - dialogRect.width;
          break;
        case "bottom-center":
          top = anchorRect.bottom + SPACING;
          left = anchorRect.left + anchorRect.width / 2 - dialogRect.width / 2;
          break;
        case "bottom-right":
          top = anchorRect.bottom + SPACING;
          left = anchorRect.left;
          break;
        case "left-top":
          top = anchorRect.top;
          left = anchorRect.left - dialogRect.width - SPACING;
          break;
        case "left-center":
          top = anchorRect.top + anchorRect.height / 2 - dialogRect.height / 2;
          left = anchorRect.left - dialogRect.width - SPACING;
          break;
        case "left-bottom":
          top = anchorRect.bottom - dialogRect.height;
          left = anchorRect.left - dialogRect.width - SPACING;
          break;
        case "right-top":
          top = anchorRect.top;
          left = anchorRect.right + SPACING;
          break;
        case "right-center":
          top = anchorRect.top + anchorRect.height / 2 - dialogRect.height / 2;
          left = anchorRect.right + SPACING;
          break;
        case "right-bottom":
          top = anchorRect.bottom - dialogRect.height;
          left = anchorRect.right + SPACING;
          break;
      }

      setPosition({ top, left });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, anchorRef, anchor]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            className={`z-50 bg-white px-2 pb-5 pt-2 dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 ${className}`}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center mb-1">
              {title && (
                <h5 className="font-semibold text-xl pr-8 max-w-75 text-ellipsis">{title}</h5>
              )}
              {showCloseButton && <CloseButton onClick={onClose} buttonClassName="ml-auto z-10" />}
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
