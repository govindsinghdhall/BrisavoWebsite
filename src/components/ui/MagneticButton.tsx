"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string; 
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  href,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary:
      "bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan text-white hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]",
    secondary:
      "glass text-foreground hover:bg-surface-hover hover:border-glass-border",
    ghost: "text-foreground/70 hover:text-foreground hover:bg-surface",
  };

  const content = (
    <motion.button
      type={href ? undefined : type}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer",
        variants[variant],
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2 [&_svg]:shrink-0">
        {children}
      </span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-full bg-white/10 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (isExternal) {
      return (
        <a href={href} className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
