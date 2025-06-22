import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils"; 

export const LampContainer = ({
  children,
  className,
  isAnimating = true, // New prop to control animation
}: {
  children: React.ReactNode;
  className?: string;
  isAnimating?: boolean; // Animation control prop
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ width: "0rem" }}
          animate={isAnimating ? { width: "30rem" } : { width: "0rem" }}
          transition={{
            delay: isAnimating ? 0.3 : 0,
            duration: 0.8,
            ease: "circInOut",
            repeat: isAnimating ? Infinity : 0,
            repeatType: "reverse"
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[10rem] rounded-full bg-gradient-to-r from-blue-400 to-red-500 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          animate={isAnimating ? { width: "30rem" } : { width: "15rem" }}
          transition={{
            delay: isAnimating ? 0.3 : 0,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
        ></motion.div>
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950 "></div>
      </div>
      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};

