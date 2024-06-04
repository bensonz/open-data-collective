"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ISprintModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  className?: string;
  children: React.ReactNode;
}
export const SpringModal = ({
  isOpen,
  setIsOpen,
  className,
  children,
}: ISprintModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-lg cursor-default overflow-hidden rounded-lg  shadow-xl",
              className
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
