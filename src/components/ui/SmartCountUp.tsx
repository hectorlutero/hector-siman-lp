"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

interface SmartCountUpProps {
  text: string;
  isVisible: boolean;
}

export function SmartCountUp({ text, isVisible }: SmartCountUpProps) {
  // Split the text into an array of strings and numbers
  // This regex matches groups of digits, optionally containing dots or commas
  // e.g., "19.500", "358,000", "83", "99"
  const parts = text.split(/([\d.,]+)/);

  return (
    <>
      {parts.map((part, i) => {
        // If part is a number like "19.500" or "83"
        // And ensure it actually contains a digit
        if (/^[\d.,]+$/.test(part) && /\d/.test(part)) {
          return <AnimatedNumber key={i} text={part} isVisible={isVisible} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function AnimatedNumber({ text, isVisible }: { text: string; isVisible: boolean }) {
  // Parse the number by removing format characters to get raw value
  const cleanStr = text.replace(/[.,]/g, "");
  const target = parseInt(cleanStr, 10);

  // Detect original formatting
  const isPtBr = text.includes(".");
  const isEnUs = text.includes(",");
  const isFormatted = isPtBr || isEnUs;

  // Use framer-motion spring for smooth counting
  const spring = useSpring(0, { stiffness: 40, damping: 20 });

  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    if (!isFormatted) return rounded.toString();
    if (isPtBr) return rounded.toLocaleString('pt-BR');
    if (isEnUs) return rounded.toLocaleString('en-US');
    return rounded.toString();
  });

  useEffect(() => {
    if (isVisible) {
      spring.set(target);
    } else {
      spring.set(0); // Reset when not focused
    }
  }, [isVisible, target, spring]);

  return <motion.span>{display}</motion.span>;
}
