"use client";

import { cn } from "@/shared/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { linkStyle } from "../lib/linkStyles";

interface IHeaderDropdownProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export function HeaderDropdown({ title, children, className }: IHeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <p className={cn(linkStyle(isOpen), "cursor-default")}>{title}</p>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("a")) {
                setIsOpen(false);
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute top-full bg-background border-b border-gray-200 dark:border-gray-700",
              className,
            )}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
