"use client";

import { cn } from "@/shared/lib/cn";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface IAccrodionProps {
  title?: ReactNode;
  children: React.ReactNode;
  accordClassName?: string;
  buttonClassName?: string;
}

export function Accordion({
  title,
  children,
  accordClassName,
  buttonClassName,
}: IAccrodionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("border-b border-2-foreground/10", accordClassName)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full cursor-pointer flex justify-between items-center text-left",
          buttonClassName,
        )}>
        {title && title}
        <ChevronDown
          className={cn("transition-transform duration-200 ease-out", open && "rotate-180")}
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="overflow-hidden">
        <div>{children}</div>
      </motion.div>
    </div>
  );
}
