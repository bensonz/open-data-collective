"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ITextRouletteProps {
  textArray: string[];
  interval?: number;
}

const TextRoulette = ({ textArray, interval = 3000 }: ITextRouletteProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, interval);
    return () => clearInterval(timer);
  }, [textArray.length, interval]);

  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={textArray[index]}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", width: "100%" }}
        >
          {textArray[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextRoulette;
