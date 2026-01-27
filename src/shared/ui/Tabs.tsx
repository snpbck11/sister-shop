"use client";

import { cn } from "@/shared/lib/cn";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface ITab {
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ITabsProps {
  tabs: ITab[];
  defaultTab?: number;
  onChange?: (index: number) => void;
  className?: string;
  contentClassname?: string;
}

export function Tabs({
  tabs,
  defaultTab = 0,
  onChange,
  className,
  contentClassname,
}: ITabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index: number) => {
    if (tabs[index]?.disabled) return;
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div className={className}>
      <div className={"flex justify-center gap-6 border-b border-gray-200 dark:border-gray-400"}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            disabled={tab.disabled}
            className={cn(
              "px-1 py-3 relative",
              "cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase",
              activeTab === index ? "text-foreground" : "text-gray-900 hover:text-foreground",
            )}>
            {tab.label}

            {activeTab === index && (
              <motion.div
                layoutId={"tab-indicator"}
                className={"absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={contentClassname}>
        {tabs[activeTab]?.content}
      </motion.div>
    </div>
  );
}
