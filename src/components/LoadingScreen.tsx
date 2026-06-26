import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import fwLogo from "@/assets/fw-logo.png";
import Aurora from "./Aurora";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Aurora intensity="soft" />

      <div className="relative flex flex-col items-center gap-8 text-center">
        {/* Logo with progress ring */}
        <motion.div
          className="relative h-24 w-24"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.img
            src={fwLogo}
            alt="FW Digital"
            className="absolute inset-0 m-auto h-14 w-14"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" strokeWidth="3" fill="none" className="stroke-border" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              stroke="hsl(var(--primary))"
              style={{ strokeDasharray: 283, strokeDashoffset: 283 - (283 * progress) / 100 }}
            />
          </svg>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
            FW<span className="text-gradient-brand">Digital</span>
          </h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Fábrica de Software
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="w-60">
          <div className="h-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-primary transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-xs text-muted-foreground">{Math.round(progress)}%</div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
