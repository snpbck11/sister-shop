import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { CloseButton } from "../Buttons";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  children: ReactNode;
}

const DURATION = 0.2;

export function Modal({ isOpen, onClose, children, showCloseButton = true }: IModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 hide-overflow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-black/30 dark:bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: DURATION, ease: "easeOut" }}
            className="relative w-full max-w-xl rounded-lg bg-background shadow-xl"
          >
            {showCloseButton && (
              <CloseButton onClick={onClose} buttonClassName="absolute top-1 right-1" />
            )}

            <div className="p-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
