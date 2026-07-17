"use client";

import { useState, type MouseEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowRight, Globe2 } from "lucide-react";

const ParticleScene = dynamic(
  () => import("@/components/three/Particles").then((m) => m.Particles),
  { ssr: false }
);

export function Hero() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
    setPointer({ x, y });
  };

  return (
    <section className="relative min-h-screen overflow-visible bg-background mesh-gradient noise-overlay">
      <div className="absolute inset-0 z-0">
        {/* Mobile & tablet: full-bleed wallpaper with vertical scrim */}
        <div className="absolute inset-x-0 bottom-0 top-16 lg:hidden">
          <Image
            src="/wallpapers/hero-day.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center dark:hidden"
          />
          <Image
            src="/wallpapers/hero-night.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-center dark:block"
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/40 to-background" />
        </div>

        {/* Desktop: mascot anchored to the right half, fading out toward the text */}
        <div className="absolute bottom-0 right-0 top-24 hidden w-[54%] lg:block mask-[linear-gradient(to_right,transparent,black_22%)]">
          <Image
            src="/wallpapers/hero-day.png"
            alt=""
            fill
            priority
            sizes="55vw"
            className="object-cover object-center dark:hidden"
          />
          <Image
            src="/wallpapers/hero-night.png"
            alt=""
            fill
            priority
            sizes="55vw"
            className="hidden object-cover object-center dark:block"
          />
        </div>
        <div className="absolute inset-0 hidden bg-linear-to-r from-background via-background/15 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-32 bg-linear-to-t from-background to-transparent lg:block" />
      </div>

      <ParticleScene className="absolute inset-0 z-0 opacity-40" />

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.16),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.12),transparent_35%)]" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan/10 blur-[140px]" />
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full bg-accent-blue/20 blur-[90px] animate-float" />
        <div className="absolute bottom-[10%] right-[8%] h-56 w-56 rounded-full bg-accent-violet/20 blur-[110px] animate-float" style={{ animationDelay: "-3.5s" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_55%,transparent_100%)] opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setPointer({ x: 0, y: 0 })}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1280px] items-center justify-center px-6 py-24 sm:px-8 lg:justify-start lg:px-12"
      >
        <motion.div
          animate={{ x: pointer.x * 0.45, y: pointer.y * 0.45 }}
          transition={{ type: "spring", stiffness: 100, damping: 18, mass: 0.2 }}
          className="flex w-full flex-col items-center text-center lg:max-w-[520px] lg:items-start lg:text-left xl:max-w-[600px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="glass mb-8 inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-5"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-accent-blue"
            >
              <Globe2 className="h-3.5 w-3.5" />
            </motion.div>
            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/75 sm:text-xs">
              🇨🇦 Canada × 🇮🇳 India · Global Technology Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="mb-6 max-w-5xl px-4 py-4 sm:px-6 md:px-8 lg:px-0 text-[1.6rem] font-black leading-[1.2] tracking-[-0.04em] text-foreground sm:text-[2rem] md:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.8rem]"
          >
            <span className="block">Building the Future of</span>
            <span className="mt-2 block bg-[length:200%_100%] text-gradient-accent sm:mt-3">
              Digital Infrastructure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mb-8 max-w-[700px] text-base leading-8 text-muted sm:text-lg"
          >
            Home of our flagship Real Estate Property Management CRM — plus AI, Cloud, SaaS, and enterprise systems that help ambitious businesses scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            <MagneticButton
              href="/products#real-estate-crm"
              variant="primary"
              className="!px-8 !py-3.5 !text-sm sm:!px-10 sm:!py-4"
            >
              Explore Real Estate CRM
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="/contact"
              variant="secondary"
              className="!px-8 !py-3.5 !text-sm sm:!px-10 sm:!py-4"
            >
              Request a Demo
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 bg-white/10 p-1 backdrop-blur-sm">
          <div className="h-2.5 w-1 rounded-full bg-foreground/50" />
        </div>
      </motion.div>
    </section>
  );
}
