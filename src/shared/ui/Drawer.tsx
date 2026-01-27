"use client";

import { cn } from "@/shared/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  headerContent?: ReactNode;
  children?: ReactNode;
  drawerClassname?: string;
  containerClassname?: string;
  anchor?: "left" | "right" | "top" | "bottom";
}

const DURATION = 0.3;

function getPanelVariants(anchor: DrawerProps["anchor"]) {
  switch (anchor) {
    case "right":
      return {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
      };
    case "top":
      return {
        initial: { y: "-100%" },
        animate: { y: 0 },
        exit: { y: "-100%" },
      };
    case "bottom":
      return {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
      };
    case "left":
    default:
      return {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      };
  }
}

export function Drawer({
  open,
  onClose,
  headerContent,
  children,
  drawerClassname,
  containerClassname,
  anchor = "left",
}: DrawerProps) {
  const panel = getPanelVariants(anchor);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "fixed hide-overflow inset-0 z-50 flex overflow-hidden h-screen",
            anchor === "left" && "justify-start",
            anchor === "right" && "justify-end",
            anchor === "top" && "flex-col items-start",
            anchor === "bottom" && "flex-col items-end",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            aria-label="закрыть drawer"
            className="absolute inset-0 bg-black/30 dark:bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION, ease: "easeOut" }}
          />

          <motion.div
            className={cn(
              "relative h-full shadow-2xl flex flex-col bg-background",
              (anchor === "left" || anchor === "right") && "h-full",
              (anchor === "top" || anchor === "bottom") && "w-full",
              drawerClassname,
            )}
            variants={panel}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: DURATION, ease: 'easeInOut' }}
          >
            {headerContent && <div className="shrink-0">{headerContent}</div>}
            <div className={cn("overflow-y-auto flex-1", containerClassname)}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
