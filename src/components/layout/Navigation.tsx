"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-500",
          scrolled && "py-3"
        )}
      >
        <nav
          className={cn(
            "container-wide mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500",
            scrolled
              ? "glass-strong shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[2px] rounded-[6px] bg-background flex items-center justify-center">
                <span className="text-xs font-bold text-gradient-accent">B</span>
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">Brisavo</span>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors group",
                  isActive(link.href) ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-accent-blue transition-all duration-300",
                    isActive(link.href) ? "w-3/4" : "w-0 group-hover:w-3/4"
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="hidden xl:block">
            <MagneticButton href="/contact" variant="primary" className="!px-6 !py-2.5 !text-sm">
              Start a Project
            </MagneticButton>
          </div>

          <button
            className="xl:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-strong p-8 pt-24 flex flex-col gap-1 overflow-y-auto"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block text-xl font-medium py-3 border-b border-white/5 transition-colors",
                      isActive(link.href) ? "text-white" : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Start a Project
                </MagneticButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
