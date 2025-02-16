"use client";

import { motion } from "framer-motion";

export const FlowingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main flowing paths */}
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
      >
        {/* Larger outer flow */}
        <motion.path
          d="M0,500 C200,300 300,200 500,200 C700,200 800,300 1000,500 C800,700 700,800 500,800 C300,800 200,700 0,500"
          className="stroke-white/10"
          fill="none"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            pathOffset: 1,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Middle flow */}
        <motion.path
          d="M200,500 C300,400 400,350 500,350 C600,350 700,400 800,500 C700,600 600,650 500,650 C400,650 300,600 200,500"
          className="stroke-white/20"
          fill="none"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            pathOffset: 1,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          }}
        />
        {/* Inner flow */}
        <motion.path
          d="M300,500 C375,425 425,400 500,400 C575,400 625,425 700,500 C625,575 575,600 500,600 C425,600 375,575 300,500"
          className="stroke-white/15"
          fill="none"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            pathOffset: 1,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />

        {/* Floating particles */}
        <motion.circle
          cx="500"
          cy="500"
          r="3"
          className="fill-white/20"
          initial={{ scale: 0, x: -50, y: -50 }}
          animate={{
            scale: [1, 2, 0],
            x: [0, 50, 100],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.circle
          cx="600"
          cy="400"
          r="2"
          className="fill-white/30"
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [1, 1.5, 0],
            x: [-50, 0, 50],
            y: [50, 0, -50],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </svg>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />

      {/* Animated mesh gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, white 0%, transparent 50%)",
          backgroundSize: "100% 100%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Additional floating elements */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};
