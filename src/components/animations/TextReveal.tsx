"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  blur?: boolean;
  /** Render immediately — no scroll-triggered or staggered reveal */
  immediate?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
  blur = true,
  immediate = false,
}: TextRevealProps) {
  if (immediate) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={cn("inline", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={delay + wordIndex * 0.05}
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                className="inline-block"
                variants={blur ? charVariants : undefined}
                initial={blur ? undefined : { opacity: 0, y: 20 }}
                whileInView={blur ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  blur
                    ? undefined
                    : { delay: delay + wordIndex * 0.05 + charIndex * 0.02 }
                }
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  if (immediate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
