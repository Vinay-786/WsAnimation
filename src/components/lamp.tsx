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
          initial={{ width: "0rem", opacity: 0.8, y: 0 }}
          animate={isAnimating ? {
            width: ["0rem", "30rem", "0rem"],
            opacity: [1, 1, 0],
            y: [0, -10, 0], // this animates translateY
          } : {
            width: [0],
            opacity: [0],
            y: [0], // this animates translateY
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[10rem] rounded-full bg-[linear-gradient(to_right,_#0f81e6,_#a45fcb,_#c04852)] blur-2xl"
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

